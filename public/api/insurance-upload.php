<?php
// Recibe un documento del paso 2 de /seguros y lo guarda fuera de public_html.
// POST multipart: leadId, type (summary | policy | study), file
// Encabezado: Authorization: Bearer <ID token de Firebase del paciente>

define('INSURANCE_API', true);
require __DIR__ . '/_lib/bootstrap.php';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const DOCUMENT_TYPES = ['summary', 'policy', 'study'];
const MIME_EXTENSIONS = [
    'application/pdf' => 'pdf',
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/heic' => 'heic',
    'image/heif' => 'heif',
];

// Algunas versiones de libmagic no reconocen HEIC: se revisa la firma del archivo
function heic_signature(string $path): bool
{
    $head = (string) file_get_contents($path, false, null, 0, 12);
    return substr($head, 4, 4) === 'ftyp'
        && in_array(substr($head, 8, 4), ['heic', 'heix', 'heim', 'heis', 'hevc', 'mif1', 'msf1'], true);
}

// Vuelve a dibujar una foto JPG o PNG en un archivo nuevo: se pierde cualquier contenido escondido
// y los datos EXIF (como la ubicación GPS del celular). Devuelve false si no es una imagen real.
function reencode_image(string $path, string $mime): bool
{
    $image = @imagecreatefromstring((string) file_get_contents($path));
    if (!$image) {
        return false;
    }

    // Sin EXIF la foto perdería su orientación: se gira antes de guardarla
    if ($mime === 'image/jpeg' && function_exists('exif_read_data')) {
        $angle = [3 => 180, 6 => -90, 8 => 90][@exif_read_data($path)['Orientation'] ?? 1] ?? 0;
        if ($angle) {
            $image = imagerotate($image, $angle, 0);
        }
    }

    $saved = $mime === 'image/png' ? imagepng($image, $path, 6) : imagejpeg($image, $path, 88);
    imagedestroy($image);
    return $saved;
}

require_method('POST');
$config = load_config();
check_origin($config);
$user = require_user($config);

if (rate_limited($config, 'upload-ip:' . client_ip(), 40, 3600)
    || rate_limited($config, 'upload-uid:' . $user['sub'], 15, 3600)) {
    json_response(429, ['error' => 'rate_limited']);
}

$leadId = $_POST['leadId'] ?? '';
$type = $_POST['type'] ?? '';
$file = $_FILES['file'] ?? null;
if (!is_lead_id($leadId) || !in_array($type, DOCUMENT_TYPES, true) || !is_array($file) || !is_int($file['error'] ?? null)) {
    json_response(400, ['error' => 'bad_request']);
}

// Solo el dueño del lead puede subirle documentos
$lead = fetch_own_lead($config, $leadId, $user['token']);
if (($lead['fields']['ownerUid']['stringValue'] ?? null) !== $user['sub']) {
    json_response(403, ['error' => 'forbidden']);
}

if ($file['error'] === UPLOAD_ERR_INI_SIZE || $file['error'] === UPLOAD_ERR_FORM_SIZE) {
    json_response(413, ['error' => 'file_size']);
}
if ($file['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'])) {
    json_response(400, ['error' => 'upload_failed']);
}
if ($file['size'] <= 0 || $file['size'] > MAX_FILE_SIZE) {
    json_response(413, ['error' => 'file_size']);
}

// El tipo se decide por el contenido del archivo, nunca por el nombre que manda el navegador
$mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
if (!isset(MIME_EXTENSIONS[$mime]) && heic_signature($file['tmp_name'])) {
    $mime = 'image/heic';
}
$extension = MIME_EXTENSIONS[$mime] ?? null;
if (!$extension) {
    json_response(415, ['error' => 'file_type']);
}

// Los PDF y HEIC no se pueden re-dibujar en este servidor: llegan tal cual (ya revisados por contenido)
$cleaned = false;
if (in_array($mime, ['image/jpeg', 'image/png'], true) && function_exists('imagecreatefromstring')) {
    if (!reencode_image($file['tmp_name'], $mime)) {
        json_response(415, ['error' => 'file_type']);
    }
    $cleaned = true;
    clearstatcache(true, $file['tmp_name']);
}

$leadDir = $config['storage_dir'] . '/' . $leadId;
if (!is_dir($leadDir) && !mkdir($leadDir, 0700, true)) {
    json_response(500, ['error' => 'storage']);
}

// Un archivo por tipo: si el paciente lo vuelve a subir, reemplaza al anterior
foreach (glob("$leadDir/$type-*") ?: [] as $previous) {
    unlink($previous);
}

$fileId = $type . '-' . bin2hex(random_bytes(8)) . '.' . $extension;
if (!move_uploaded_file($file['tmp_name'], "$leadDir/$fileId")) {
    json_response(500, ['error' => 'storage']);
}
chmod("$leadDir/$fileId", 0600);

// El nombre original solo se guarda como texto para el panel
$originalName = preg_replace('/[\x00-\x1F\x7F]/u', '', (string) $file['name']);
json_response(201, [
    'file' => [
        'type' => $type,
        'id' => $fileId,
        'name' => mb_substr($originalName, 0, 120),
        'size' => filesize("$leadDir/$fileId"),
        'mime' => $mime,
        'cleaned' => $cleaned,
    ],
]);
