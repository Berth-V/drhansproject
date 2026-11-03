<?php
// Ejemplo de la configuración de /api (subida de documentos de /seguros).
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

    // Sitios que pueden usar la API. Los de localhost son solo para probar con pnpm run dev:
    // quitarlos al publicar.
    'allowed_origins' => [
        'https://hansruiztrauma.com.mx',
        'https://www.hansruiztrauma.com.mx',
        'https://hansruiztrauma.com',
        'https://www.hansruiztrauma.com',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
    ],
];
