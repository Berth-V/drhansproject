<?php
// Envía un correo HTML (con versión de texto y adjuntos) con mail() de Hostinger.

defined('INSURANCE_API') || exit;

// Quita saltos de línea para que nadie pueda inyectar encabezados
function mail_header_text(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

// $attachments: [['path' => ..., 'name' => ..., 'mime' => ...], ...]
function send_mail(string $to, string $from, string $fromName, string $subject, string $html, string $text, array $attachments = []): bool
{
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
    return mail($to, $subject, $body, implode("\r\n", $headers), '-f' . $from);
}
