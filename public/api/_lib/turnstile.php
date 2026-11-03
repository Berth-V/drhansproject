<?php
// Captcha de Cloudflare Turnstile: comprueba con Cloudflare que el token lo generó una persona en el sitio.
// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

defined('INSURANCE_API') || exit;

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function verify_turnstile(array $config, string $token, string $expectedAction): bool
{
    if ($token === '' || strlen($token) > 2048) {
        return false;
    }

    $ch = curl_init(TURNSTILE_VERIFY_URL);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => $config['turnstile_secret'],
            'response' => $token,
            'remoteip' => client_ip(),
        ]),
    ]);
    $result = json_decode((string) curl_exec($ch), true);

    return ($result['success'] ?? false) === true && ($result['action'] ?? '') === $expectedAction;
}
