<?php
// Crea la solicitud del paso 1 de /seguros. Es la única forma de crear un lead: las reglas de Firestore
// no dejan que el navegador lo haga, así que un bot tiene que pasar el captcha (Turnstile) y estos filtros.
// POST JSON: { name, whatsapp, insurer, insurerOther, policy, diagnosis, consent, site, website, turnstileToken }
// Encabezado: Authorization: Bearer <ID token de Firebase del paciente (sesión anónima)>

define('INSURANCE_API', true);
require __DIR__ . '/_lib/bootstrap.php';
require __DIR__ . '/_lib/notify.php';
require __DIR__ . '/_lib/service-account.php';
require __DIR__ . '/_lib/turnstile.php';

const TURNSTILE_ACTION = 'insurance-lead';

function text_field(array $input, string $key, int $min, int $max): ?string
{
    $value = trim((string) ($input[$key] ?? ''));
    $length = mb_strlen($value);
    return $length >= $min && $length <= $max ? $value : null;
}

// 10 dígitos (MX), 52 + 10 dígitos, o 1 + 10 dígitos (EE. UU.): igual que el formulario
function whatsapp_digits(mixed $value): ?string
{
    $digits = preg_replace('/\D/', '', (string) $value);
    $valid = strlen($digits) === 10
        || (strlen($digits) === 12 && str_starts_with($digits, '52'))
        || (strlen($digits) === 11 && str_starts_with($digits, '1'));
    return $valid ? $digits : null;
}

require_method('POST');
$config = load_config();
check_origin($config);
$user = require_user($config);

if (rate_limited($config, 'lead-ip:' . client_ip(), 5, 3600)
    || rate_limited($config, 'lead-uid:' . $user['sub'], 3, 3600)) {
    json_response(429, ['error' => 'rate_limited']);
}

$input = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($input) || ($input['website'] ?? '') !== '') {
    json_response(400, ['error' => 'bad_request']); // honeypot lleno: es un bot
}

if (!verify_turnstile($config, (string) ($input['turnstileToken'] ?? ''), TURNSTILE_ACTION)) {
    json_response(403, ['error' => 'captcha']);
}

$insurer = text_field($input, 'insurer', 1, 60);
$lead = [
    'name' => text_field($input, 'name', 3, 120),
    'whatsapp' => whatsapp_digits($input['whatsapp'] ?? ''),
    'insurer' => $insurer,
    'insurerOther' => $insurer === 'other' ? text_field($input, 'insurerOther', 1, 80) : '',
    'policy' => text_field($input, 'policy', 1, 60),
    'diagnosis' => text_field($input, 'diagnosis', 1, 300),
    'site' => in_array($input['site'] ?? '', ['mx', 'us'], true) ? $input['site'] : null,
];
if (in_array(null, $lead, true) || ($input['consent'] ?? false) !== true) {
    json_response(400, ['error' => 'invalid']);
}

$now = gmdate('Y-m-d\TH:i:s\Z');
$fields = array_map(fn ($value) => ['stringValue' => $value], $lead) + [
    'consent' => ['booleanValue' => true],
    'consentAt' => ['timestampValue' => $now],
    'status' => ['stringValue' => 'incomplete'],
    'files' => ['arrayValue' => new stdClass()],
    'ownerUid' => ['stringValue' => $user['sub']],
    'createdAt' => ['timestampValue' => $now],
];

$document = firestore_create($config, 'insuranceLeads', $fields);
if (!$document) {
    json_response(500, ['error' => 'storage']);
}

$leadId = basename($document['name']);
notify_doctor($config, $leadId, $document, 'lead');
json_response(201, ['leadId' => $leadId]);
