<?php
// Valida un ID token de Firebase (RS256) sin librerías: llaves públicas de Google + openssl.
// Reglas de validación: https://firebase.google.com/docs/auth/admin/verify-id-tokens

defined('INSURANCE_API') || exit;

const GOOGLE_CERTS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
const TOKEN_LEEWAY = 60; // segundos de tolerancia en los relojes

function base64url_decode(string $data): string|false
{
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    return base64_decode(strtr($data, '-_', '+/'), true);
}

// Las llaves de Google cambian cada pocas horas: se guardan en caché el tiempo que indica max-age
function google_certs(string $cacheDir): array
{
    $cacheFile = $cacheDir . '/google-certs.json';
    if (is_file($cacheFile)) {
        $cached = json_decode((string) file_get_contents($cacheFile), true);
        if (is_array($cached) && ($cached['expires'] ?? 0) > time()) {
            return $cached['certs'];
        }
    }

    $ch = curl_init(GOOGLE_CERTS_URL);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $response = curl_exec($ch);
    if ($response === false || curl_getinfo($ch, CURLINFO_HTTP_CODE) !== 200) {
        return [];
    }

    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $certs = json_decode(substr($response, $headerSize), true);
    if (!is_array($certs)) {
        return [];
    }

    $maxAge = preg_match('/max-age=(\d+)/i', substr($response, 0, $headerSize), $match) ? (int) $match[1] : 3600;
    @file_put_contents($cacheFile, json_encode(['expires' => time() + $maxAge, 'certs' => $certs]), LOCK_EX);
    return $certs;
}

// Devuelve el contenido del token si es válido para este proyecto, o null
function verify_firebase_token(string $token, string $projectId, string $cacheDir): ?array
{
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return null;
    }
    [$header64, $payload64, $signature64] = $parts;

    $header = json_decode((string) base64url_decode($header64), true);
    $payload = json_decode((string) base64url_decode($payload64), true);
    $signature = base64url_decode($signature64);
    if (!is_array($header) || !is_array($payload) || $signature === false) {
        return null;
    }
    if (($header['alg'] ?? '') !== 'RS256' || !is_string($header['kid'] ?? null)) {
        return null;
    }

    $cert = google_certs($cacheDir)[$header['kid']] ?? null;
    $key = $cert ? openssl_pkey_get_public($cert) : false;
    if (!$key || openssl_verify("$header64.$payload64", $signature, $key, OPENSSL_ALGO_SHA256) !== 1) {
        return null;
    }

    $now = time();
    $valid = ($payload['aud'] ?? '') === $projectId
        && ($payload['iss'] ?? '') === "https://securetoken.google.com/$projectId"
        && is_int($payload['exp'] ?? null) && $payload['exp'] > $now - TOKEN_LEEWAY
        && is_int($payload['iat'] ?? null) && $payload['iat'] <= $now + TOKEN_LEEWAY
        && is_int($payload['auth_time'] ?? null) && $payload['auth_time'] <= $now + TOKEN_LEEWAY
        && is_string($payload['sub'] ?? null) && $payload['sub'] !== '' && strlen($payload['sub']) <= 128;

    return $valid ? $payload : null;
}
