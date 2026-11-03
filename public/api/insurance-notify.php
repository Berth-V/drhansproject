<?php
// Le manda al doctor un correo con los datos de una solicitud de /seguros y, si ya los hay, sus documentos.
// POST JSON: { leadId, event: "lead" | "documents" }
// Encabezado: Authorization: Bearer <ID token de Firebase del paciente>
// Los datos salen del lead en Firestore y los archivos de private/, nunca de lo que mande el navegador.

define('INSURANCE_API', true);
require __DIR__ . '/_lib/bootstrap.php';
require __DIR__ . '/_lib/mailer.php';

// Correos por lead: uno al crearlo y hasta tres cuando sube documentos (puede subirlos en partes)
const NOTIFY_LIMITS = ['lead' => 1, 'documents' => 3];
// Gmail acepta 25 MB por correo y los adjuntos crecen ~33% en base64
const MAX_ATTACHMENTS_SIZE = 18 * 1024 * 1024;

const DOCUMENT_NAMES = [
    'summary' => ['Resumen médico', 'resumen-medico'],
    'policy' => ['Póliza o carátula', 'poliza'],
    'study' => ['Reporte del estudio', 'estudio'],
];
const ATTACHMENT_TYPES = [
    'pdf' => 'application/pdf',
    'jpg' => 'image/jpeg',
    'png' => 'image/png',
    'heic' => 'image/heic',
    'heif' => 'image/heif',
];

function lead_text(array $lead, string $field): string
{
    return (string) ($lead['fields'][$field]['stringValue'] ?? '');
}

function whatsapp_link(string $digits): string
{
    // 10 dígitos = número de México sin lada de país
    return 'https://wa.me/' . (strlen($digits) === 10 ? "52$digits" : $digits);
}

// Cuántas veces se ha mandado este aviso; si no llega al límite, lo cuenta
function claim_notification(array $config, string $leadId, string $event): bool
{
    $dir = $config['cache_dir'] . '/notified';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
        return false;
    }
    $handle = fopen("$dir/$leadId-$event", 'c+');
    if (!$handle) {
        return false;
    }
    flock($handle, LOCK_EX);
    $count = (int) stream_get_contents($handle);
    $allowed = $count < NOTIFY_LIMITS[$event];
    if ($allowed) {
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, (string) ($count + 1));
    }
    flock($handle, LOCK_UN);
    fclose($handle);
    return $allowed;
}

require_method('POST');
$config = load_config();
check_origin($config);
$user = require_user($config);

if (rate_limited($config, 'notify-uid:' . $user['sub'], 6, 3600)) {
    json_response(429, ['error' => 'rate_limited']);
}

$input = json_decode((string) file_get_contents('php://input'), true);
$leadId = $input['leadId'] ?? '';
$event = $input['event'] ?? '';
if (!is_lead_id($leadId) || !isset(NOTIFY_LIMITS[$event])) {
    json_response(400, ['error' => 'bad_request']);
}

$lead = fetch_own_lead($config, $leadId, $user['token']);
if (lead_text($lead ?? [], 'ownerUid') !== $user['sub']) {
    json_response(403, ['error' => 'forbidden']);
}

// Documentos que de verdad están en el servidor
$documents = [];
foreach (DOCUMENT_NAMES as $type => [$label, $fileName]) {
    $path = (glob($config['storage_dir'] . "/$leadId/$type-*") ?: [])[0] ?? null;
    if ($path) {
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        $documents[] = ['label' => $label, 'path' => $path, 'name' => "$fileName.$extension", 'mime' => ATTACHMENT_TYPES[$extension] ?? 'application/octet-stream'];
    }
}
if ($event === 'documents' && !$documents) {
    json_response(400, ['error' => 'no_documents']);
}
if (!claim_notification($config, $leadId, $event)) {
    json_response(200, ['sent' => false]); // ya se avisó: no se le llena el correo al doctor
}

$name = lead_text($lead, 'name');
$whatsapp = lead_text($lead, 'whatsapp');
$insurer = lead_text($lead, 'insurer') === 'other' ? lead_text($lead, 'insurerOther') : lead_text($lead, 'insurer');
$created = new DateTime($lead['fields']['createdAt']['timestampValue'] ?? 'now');
$created->setTimezone(new DateTimeZone('America/Tijuana'));

$rows = [
    'Paciente' => $name,
    'WhatsApp' => $whatsapp,
    'Aseguradora' => $insurer,
    'Póliza o certificado' => lead_text($lead, 'policy'),
    'Diagnóstico' => lead_text($lead, 'diagnosis'),
    'Sitio' => lead_text($lead, 'site') === 'us' ? 'hansruiztrauma.com (inglés)' : 'hansruiztrauma.com.mx (español)',
    'Fecha de la solicitud' => $created->format('d/m/Y H:i'),
];

$attachmentsSize = array_sum(array_map(fn ($document) => filesize($document['path']), $documents));
$attach = $event === 'documents' && $attachmentsSize <= MAX_ATTACHMENTS_SIZE;
$documentLabels = array_column($documents, 'label');

$missing = array_diff(array_column(DOCUMENT_NAMES, 0), $documentLabels);
// El nombre al final evita que Gmail junte en un solo hilo las solicitudes de distintos pacientes
$subject = 'Solicitud de Seguro Página Web: Documentos ' . ($missing ? 'Incompletos' : 'Completos') . " – $name";

if ($event === 'lead') {
    $documentsNote = $documentLabels
        ? 'Ya envió: ' . implode(', ', $documentLabels) . '. Te llegarán en otro correo.'
        : 'Todavía no envía documentos.';
} else {
    $documentsNote = ($attach ? 'Adjuntos: ' : 'Recibidos (pesan demasiado para adjuntarlos, están en el servidor): ')
        . implode(', ', $documentLabels) . '.'
        . ($missing ? ' Falta: ' . implode(', ', $missing) . '.' : ' Están completos.');
}

$html = '<div style="font-family:Arial,sans-serif;font-size:15px;color:#0b1d3a">'
    . '<h2 style="margin:0 0 12px">' . htmlspecialchars($subject) . '</h2>'
    . '<table cellpadding="6" style="border-collapse:collapse">';
foreach ($rows as $label => $value) {
    $html .= '<tr><td style="color:#5b6b7b">' . htmlspecialchars($label) . '</td><td><strong>'
        . htmlspecialchars($value) . '</strong></td></tr>';
}
$html .= '</table>'
    . '<p><a href="' . htmlspecialchars(whatsapp_link($whatsapp)) . '" style="display:inline-block;padding:10px 18px;'
    . 'background:#25d366;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold">Escribirle por WhatsApp</a></p>'
    . '<p>' . htmlspecialchars($documentsNote) . '</p>'
    . '<p style="color:#5b6b7b;font-size:12px">Datos personales sensibles: no reenvíes este correo.</p>'
    . '</div>';

$text = $subject . "\n\n";
foreach ($rows as $label => $value) {
    $text .= "$label: $value\n";
}
$text .= "\nWhatsApp: " . whatsapp_link($whatsapp) . "\n\n$documentsNote\n\nDatos personales sensibles: no reenvíes este correo.\n";

$sent = send_mail(
    $config['notify_to'],
    $config['notify_from'],
    'Avisos Dr. Hans Ruiz',
    $subject,
    $html,
    $text,
    $attach ? $documents : []
);
json_response($sent ? 200 : 500, ['sent' => $sent]);
