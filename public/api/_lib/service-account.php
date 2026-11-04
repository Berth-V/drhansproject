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

function firestore_documents_url(array $config, string $path = ''): string
{
    return sprintf(
        'https://firestore.googleapis.com/v1/projects/%s/databases/(default)/documents%s',
        rawurlencode($config['project_id']),
        $path
    );
}

// Petición a la API REST de Firestore con la cuenta de servicio. Devuelve [código HTTP, respuesta decodificada]
function firestore_request(array $config, string $method, string $url, ?array $body = null): array
{
    $token = service_access_token($config);
    if (!$token) {
        return [0, null];
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 5,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => ["Authorization: Bearer $token", 'Content-Type: application/json'],
    ]);
    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    }
    $response = curl_exec($ch);
    $status = $response === false ? 0 : curl_getinfo($ch, CURLINFO_HTTP_CODE);
    return [$status, $response === false ? null : json_decode($response, true)];
}

// Lee un documento. Devuelve el documento (formato REST), false si no existe, o null si falló la petición
function firestore_get(array $config, string $collection, string $docId): array|false|null
{
    [$status, $document] = firestore_request(
        $config,
        'GET',
        firestore_documents_url($config, '/' . rawurlencode($collection) . '/' . rawurlencode($docId))
    );
    if ($status === 404) {
        return false;
    }
    return $status === 200 && is_array($document) ? $document : null;
}

// Crea o actualiza un documento con id propio. Solo toca los campos de $fields: los demás se conservan
function firestore_upsert(array $config, string $collection, string $docId, array $fields): bool
{
    $mask = implode('&', array_map(
        fn ($field) => 'updateMask.fieldPaths=' . rawurlencode($field),
        array_keys($fields)
    ));
    [$status] = firestore_request(
        $config,
        'PATCH',
        firestore_documents_url($config, '/' . rawurlencode($collection) . '/' . rawurlencode($docId)) . "?$mask",
        ['fields' => $fields]
    );
    return $status === 200;
}

// Ids de los documentos de una colección cuyo campo es igual a un texto. null si falló la petición
function firestore_ids_where(array $config, string $collection, string $field, string $value): ?array
{
    [$status, $results] = firestore_request($config, 'POST', firestore_documents_url($config, ':runQuery'), [
        'structuredQuery' => [
            'from' => [['collectionId' => $collection]],
            'where' => ['fieldFilter' => [
                'field' => ['fieldPath' => $field],
                'op' => 'EQUAL',
                'value' => ['stringValue' => $value],
            ]],
            'limit' => 5,
        ],
    ]);
    if ($status !== 200 || !is_array($results)) {
        return null;
    }
    $ids = [];
    foreach ($results as $result) {
        if (isset($result['document']['name'])) {
            $ids[] = basename($result['document']['name']);
        }
    }
    return $ids;
}
