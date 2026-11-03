<?php
// Ejemplo de la configuración de /api (documentos y avisos de /seguros).
// En Hostinger va en domains/hansruiztrauma.com.mx/private/config.php, FUERA de public_html.
// En domains/hansruiztrauma.com/private/config.php basta con:
//   <?php return require '/home/u964128144/domains/hansruiztrauma.com.mx/private/config.php';

return [
    'project_id' => 'blog-dr-hans',

    // UID del doctor en Firebase Auth: el único que descarga documentos
    'doctor_uid' => '6oFU4Ob4ntXg11Y5wp6X6PAiW9w1',

    // Carpetas privadas (permisos 700)
    'storage_dir' => '/home/u964128144/domains/hansruiztrauma.com.mx/private/insurance-docs',
    'cache_dir' => '/home/u964128144/domains/hansruiztrauma.com.mx/private/cache',

    // Avisos por correo de cada solicitud (con datos y documentos): solo al correo del doctor
    'notify_to' => 'traumatologiahans@gmail.com',
    'notify_from' => 'avisos@hansruiztrauma.com.mx',
    // Contraseña del buzón avisos@ en Hostinger: los correos salen por SMTP firmados con el DKIM del dominio
    'smtp_password' => 'PEGAR_AQUI_LA_CONTRASEÑA_DE_AVISOS',

    // Captcha de Cloudflare Turnstile del paso 1 (clave secreta; la del sitio va en VITE_TURNSTILE_SITEKEY)
    'turnstile_secret' => 'PEGAR_AQUI_LA_CLAVE_SECRETA_DE_TURNSTILE',

    // Llave JSON de la cuenta de servicio de Firebase: con ella este servidor crea los leads
    'service_account_file' => '/home/u964128144/domains/hansruiztrauma.com.mx/private/firebase-service-account.json',

    // Sitios que pueden usar la API. En local, el proxy de Vite ya manda el Origin del sitio.
    'allowed_origins' => [
        'https://hansruiztrauma.com.mx',
        'https://www.hansruiztrauma.com.mx',
        'https://hansruiztrauma.com',
        'https://www.hansruiztrauma.com',
    ],
];
