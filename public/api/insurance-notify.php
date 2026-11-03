<?php
// Le manda al doctor el correo con los documentos de una solicitud de /seguros (el de la solicitud nueva
// lo manda insurance-lead.php al crearla).
// POST JSON: { leadId, event: "documents" }
// Encabezado: Authorization: Bearer <ID token de Firebase del paciente>

define('INSURANCE_API', true);
require __DIR__ . '/_lib/bootstrap.php';
require __DIR__ . '/_lib/notify.php';

require_method('POST');
$config = load_config();
check_origin($config);
$user = require_user($config);

if (rate_limited($config, 'notify-uid:' . $user['sub'], 6, 3600)) {
    json_response(429, ['error' => 'rate_limited']);
}

$input = json_decode((string) file_get_contents('php://input'), true);
$leadId = $input['leadId'] ?? '';
if (!is_lead_id($leadId) || ($input['event'] ?? '') !== 'documents') {
    json_response(400, ['error' => 'bad_request']);
}

$lead = fetch_own_lead($config, $leadId, $user['token']);
if (lead_text($lead ?? [], 'ownerUid') !== $user['sub']) {
    json_response(403, ['error' => 'forbidden']);
}

$result = notify_doctor($config, $leadId, $lead, 'documents');
if ($result === 'no_documents') {
    json_response(400, ['error' => 'no_documents']);
}
json_response($result === 'failed' ? 500 : 200, ['sent' => $result === 'sent']);
