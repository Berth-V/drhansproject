<?php
// Configuración y utilidades comunes de los endpoints de /api.

defined('INSURANCE_API') || exit;

require __DIR__ . '/firebase-token.php';

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('Referrer-Policy: no-referrer');

// config.php vive fuera de public_html, al lado: domains/<dominio>/private/config.php
// (ejemplo en server/config.example.php del repo)
function load_config(): array
{
    $path = dirname(__DIR__, 3) . '/private/config.php';
    $config = is_file($path) ? require $path : null;
    if (!is_array($config)) {
        json_response(500, ['error' => 'server_config']);
    }
    return $config;
}

function json_response(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

function require_method(string $method): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== $method) {
        header("Allow: $method");
        json_response(405, ['error' => 'method_not_allowed']);
    }
}

// Los navegadores mandan Origin: solo se aceptan los dominios del sitio (y localhost mientras se prueba)
function check_origin(array $config): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '' && !in_array($origin, $config['allowed_origins'], true)) {
        json_response(403, ['error' => 'forbidden_origin']);
    }
    if ($origin !== '') {
        header("Access-Control-Allow-Origin: $origin");
        header('Vary: Origin');
    }
}

function bearer_token(): string
{
    // Algunos servidores solo pasan el encabezado como REDIRECT_HTTP_AUTHORIZATION (ver api/.htaccess)
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    return preg_match('/^Bearer\s+([A-Za-z0-9_\-.]+)$/', $header, $match) ? $match[1] : '';
}

function require_user(array $config): array
{
    $token = bearer_token();
    $user = $token !== '' ? verify_firebase_token($token, $config['project_id'], $config['cache_dir']) : null;
    if (!$user) {
        json_response(401, ['error' => 'unauthorized']);
    }
    $user['token'] = $token;
    return $user;
}

function is_doctor(array $user, array $config): bool
{
    return $user['sub'] === $config['doctor_uid']
        && ($user['firebase']['sign_in_provider'] ?? '') !== 'anonymous';
}

function is_lead_id(mixed $value): bool
{
    return is_string($value) && preg_match('/^[A-Za-z0-9]{20}$/', $value) === 1;
}

function client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

// Límite de peticiones por clave (IP o usuario) en una ventana de tiempo, guardado en archivos
function rate_limited(array $config, string $key, int $max, int $window): bool
{
    $dir = $config['cache_dir'] . '/rate-limit';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
        return false;
    }
    $handle = fopen($dir . '/' . hash('sha256', $key), 'c+');
    if (!$handle) {
        return false;
    }

    flock($handle, LOCK_EX);
    $now = time();
    $hits = json_decode(stream_get_contents($handle) ?: '[]', true) ?: [];
    $hits = array_values(array_filter($hits, fn ($time) => is_int($time) && $time > $now - $window));
    $limited = count($hits) >= $max;
    if (!$limited) {
        $hits[] = $now;
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode($hits));
    }
    flock($handle, LOCK_UN);
    fclose($handle);
    return $limited;
}

// Lee el lead con el token del propio paciente: las reglas de Firestore solo se lo dejan ver a su dueño
function fetch_own_lead(array $config, string $leadId, string $token): ?array
{
    $url = sprintf(
        'https://firestore.googleapis.com/v1/projects/%s/databases/(default)/documents/insuranceLeads/%s',
        rawurlencode($config['project_id']),
        rawurlencode($leadId)
    );
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ["Authorization: Bearer $token"],
    ]);
    $response = curl_exec($ch);
    if ($response === false || curl_getinfo($ch, CURLINFO_HTTP_CODE) !== 200) {
        return null;
    }
    $lead = json_decode($response, true);
    return is_array($lead) ? $lead : null;
}
