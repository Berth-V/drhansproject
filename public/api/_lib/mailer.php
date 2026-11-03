<?php
// Envía un correo HTML (con versión de texto y adjuntos) desde notify_from.
// Con 'smtp_password' en config.php sale por el SMTP de Hostinger con la cuenta de avisos: va firmado con el
// DKIM del dominio (Gmail ya no dice "a través de main-hosting.eu" y el DMARC puede ser estricto).
// Sin contraseña, usa mail() del servidor web.

defined('INSURANCE_API') || exit;

const SMTP_HOST = 'smtp.hostinger.com';
const SMTP_PORT = 465;

// Quita saltos de línea para que nadie pueda inyectar encabezados
function mail_header_text(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

// Conversación SMTP mínima por SSL: cada comando debe recibir el código esperado
function smtp_send(array $config, string $to, string $message): bool
{
    $socket = @stream_socket_client('ssl://' . SMTP_HOST . ':' . SMTP_PORT, $errno, $error, 15);
    if (!$socket) {
        log_mail_error($config, "conexión a " . SMTP_HOST . ':' . SMTP_PORT, "$errno $error");
        return false;
    }
    stream_set_timeout($socket, 20);

    $step = 'saludo';
    $lastResponse = '';
    $expect = function (int $code) use ($socket, &$lastResponse): bool {
        $lastResponse = '';
        while (($line = fgets($socket, 1024)) !== false) {
            $lastResponse .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break; // última línea de la respuesta
            }
        }
        return (int) substr($lastResponse, 0, 3) === $code;
    };
    // $label es lo que se anota si falla: nunca el comando, que puede llevar la contraseña
    $send = function (string $label, string $command, int $code) use ($socket, $expect, &$step): bool {
        $step = $label;
        fwrite($socket, "$command\r\n");
        return $expect($code);
    };

    $from = $config['notify_from'];
    $sent = $expect(220)
        && $send('EHLO', 'EHLO ' . substr(strrchr($from, '@'), 1), 250)
        && $send('AUTH LOGIN', 'AUTH LOGIN', 334)
        && $send('usuario', base64_encode($from), 334)
        && $send('contraseña', base64_encode($config['smtp_password']), 235)
        && $send('MAIL FROM', "MAIL FROM:<$from>", 250)
        && $send('RCPT TO', "RCPT TO:<$to>", 250)
        && $send('DATA', 'DATA', 354)
        && $send('mensaje', preg_replace('/^\./m', '..', $message) . "\r\n.", 250); // un punto solo al inicio cerraría el mensaje

    if (!$sent) {
        log_mail_error($config, $step, $lastResponse);
    }
    fwrite($socket, "QUIT\r\n");
    fclose($socket);
    return $sent;
}

// Anota en private/cache/mail-errors.log en qué paso falló el envío y qué respondió el servidor de correo
function log_mail_error(array $config, string $step, string $response): void
{
    $line = date('Y-m-d H:i:s') . " | falló en: $step | respuesta: " . trim(preg_replace('/\s+/', ' ', $response)) . "\n";
    @file_put_contents($config['cache_dir'] . '/mail-errors.log', $line, FILE_APPEND | LOCK_EX);
}

// $attachments: [['path' => ..., 'name' => ..., 'mime' => ...], ...]
function send_mail(array $config, string $to, string $fromName, string $subject, string $html, string $text, array $attachments = []): bool
{
    $from = $config['notify_from'];
    $boundaryMixed = 'mixed-' . bin2hex(random_bytes(12));
    $boundaryAlt = 'alt-' . bin2hex(random_bytes(12));

    $headers = [
        'MIME-Version: 1.0',
        'From: ' . mb_encode_mimeheader(mail_header_text($fromName), 'UTF-8') . " <$from>",
        "Content-Type: multipart/mixed; boundary=\"$boundaryMixed\"",
    ];

    $body = "--$boundaryMixed\r\n"
        . "Content-Type: multipart/alternative; boundary=\"$boundaryAlt\"\r\n\r\n"
        . "--$boundaryAlt\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($text))
        . "--$boundaryAlt\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html))
        . "--$boundaryAlt--\r\n";

    foreach ($attachments as $attachment) {
        $content = file_get_contents($attachment['path']);
        if ($content === false) {
            continue;
        }
        $name = mail_header_text($attachment['name']);
        $body .= "--$boundaryMixed\r\n"
            . "Content-Type: {$attachment['mime']}; name=\"$name\"\r\n"
            . "Content-Transfer-Encoding: base64\r\n"
            . "Content-Disposition: attachment; filename=\"$name\"\r\n\r\n"
            . chunk_split(base64_encode($content));
    }
    $body .= "--$boundaryMixed--\r\n";

    $subject = mb_encode_mimeheader(mail_header_text($subject), 'UTF-8');

    if (!empty($config['smtp_password'])) {
        $domain = substr(strrchr($from, '@'), 1);
        $message = implode("\r\n", [
            'Date: ' . date(DATE_RFC2822),
            'Message-ID: <' . bin2hex(random_bytes(16)) . "@$domain>",
            "To: <$to>",
            "Subject: $subject",
            ...$headers,
        ]) . "\r\n\r\n" . $body;
        return smtp_send($config, $to, $message);
    }

    $sent = mail($to, $subject, $body, implode("\r\n", $headers), '-f' . $from);
    if (!$sent) {
        log_mail_error($config, 'mail()', (string) (error_get_last()['message'] ?? ''));
    }
    return $sent;
}
