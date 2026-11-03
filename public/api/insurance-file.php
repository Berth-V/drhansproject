<?php
// Entrega un documento de /seguros. Solo para el doctor (su UID, con correo y contraseña).
// GET ?leadId=<id>&id=<summary-xxxx.pdf>
// Encabezado: Authorization: Bearer <ID token de Firebase del doctor>

define('INSURANCE_API', true);
require __DIR__ . '/_lib/bootstrap.php';

const CONTENT_TYPES = [
    'pdf' => 'application/pdf',
    'jpg' => 'image/jpeg',
    'png' => 'image/png',
    'heic' => 'image/heic',
    'heif' => 'image/heif',
];

require_method('GET');
$config = load_config();
check_origin($config);
$user = require_user($config);

if (!is_doctor($user, $config)) {
    json_response(403, ['error' => 'forbidden']);
}
if (rate_limited($config, 'download-uid:' . $user['sub'], 300, 3600)) {
    json_response(429, ['error' => 'rate_limited']);
}

$leadId = $_GET['leadId'] ?? '';
$fileId = $_GET['id'] ?? '';
if (!is_lead_id($leadId) || !is_string($fileId)
    || !preg_match('/^(summary|policy|study)-[a-f0-9]{16}\.(pdf|jpg|png|heic|heif)$/', $fileId, $match)) {
    json_response(400, ['error' => 'bad_request']);
}

$path = $config['storage_dir'] . '/' . $leadId . '/' . $fileId;
if (!is_file($path)) {
    json_response(404, ['error' => 'not_found']);
}

header('Content-Type: ' . CONTENT_TYPES[$match[2]]);
header('Content-Length: ' . filesize($path));
header('Content-Disposition: attachment; filename="' . $fileId . '"');
header('Cache-Control: private, no-store');
readfile($path);
