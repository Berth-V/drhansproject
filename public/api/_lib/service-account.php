<?php
// Escribe en Firestore con la cuenta de servicio de Firebase (sin pasar por las reglas): así los leads
// solo los crea este servidor, después de comprobar el captcha. La llave JSON vive en private/
// (config: service_account_file) y el token de acceso se guarda en caché casi una hora.

defined('INSURANCE_API') || exit;

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const FIRESTORE_SCOPE = 'https://www.googleapis.com/auth/datastore';

function base64url_encode(string $data): string
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function service_access_token(array $config): ?string
{
    $cacheFile = $config['cache_dir'] . '/service-token.json';
    if (is_file($cacheFile)) {
        $cached = json_decode((string) file_get_contents($cacheFile), true);
        if (is_array($cached) && ($cached['expires'] ?? 0) > time() + 60) {
            return $cached['token'];
        }
    }

    $account = json_decode((string) @file_get_contents($config['service_account_file']), true);
    if (!is_array($account) || empty($account['client_email']) || empty($account['private_key'])) {
        return null;
    }

    // JWT firmado con la llave privada → token de acceso de Google (flujo de cuenta de servicio)
    $now = time();
    $header = base64url_encode(json_encode(['alg' => 'RS256', 'typ' => 'JWT']));
    $claims = base64url_encode(json_encode([
        'iss' => $account['client_email'],
        'scope' => FIRESTORE_SCOPE,
        'aud' => GOOGLE_TOKEN_URL,
        'iat' => $now,
        'exp' => $now + 3600,
    ]));
    if (!openssl_sign("$header.$claims", $signature, $account['private_key'], OPENSSL_ALGO_SHA256)) {
        return null;
    }

    $ch = curl_init(GOOGLE_TOKEN_URL);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion' => "$header.$claims." . base64url_encode($signature),
        ]),
    ]);
    $result = json_decode((string) curl_exec($ch), true);
    $token = $result['access_token'] ?? null;
    if (!is_string($token)) {
        return null;
    }

    @file_put_contents($cacheFile, json_encode(['token' => $token, 'expires' => $now + (int) ($result['expires_in'] ?? 3600)]), LOCK_EX);
    @chmod($cacheFile, 0600);
    return $token;
}

// Crea un documento con id automático y devuelve el documento creado (formato REST), o null
function firestore_create(array $config, string $collection, array $fields): ?array
{
    $token = service_access_token($config);
    if (!$token) {
        return null;
    }

    $url = sprintf(
        'https://firestore.googleapis.com/v1/projects/%s/databases/(default)/documents/%s',
        rawurlencode($config['project_id']),
        rawurlencode($collection)
    );
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ["Authorization: Bearer $token", 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode(['fields' => $fields]),
    ]);
    $response = curl_exec($ch);
    if ($response === false || curl_getinfo($ch, CURLINFO_HTTP_CODE) !== 200) {
        return null;
    }
    $document = json_decode($response, true);
    return is_array($document) ? $document : null;
}
