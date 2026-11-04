<?php
// Webhook de Bunzy: el doctor revisa y aprueba los artículos en Bunzy, y al publicarlos llegan aquí.
// article.published / article.updated → crea o actualiza el post (publicado) en Firestore, id "bunzy-<slug>".
// article.unpublished → lo oculta (published: false); no se borra.
// Firma: X-Bunzy-Signature = "sha256=" + HMAC-SHA256 del cuerpo sin procesar, con 'bunzy_secret' de config.php.
// Bunzy espera un 2xx en menos de 10 s y no reintenta: el correo al doctor se manda después de responder.

define('INSURANCE_API', true);
require __DIR__ . '/_lib/bootstrap.php';
require __DIR__ . '/_lib/mailer.php';
require __DIR__ . '/_lib/service-account.php';

const POSTS = 'posts';
const SITE_URL = 'https://hansruiztrauma.com.mx';

// Palabras (sin acentos) que ligan un artículo a la página de un procedimiento (relatedPart).
// El orden importa: gana la primera que aparezca, así que lo más específico va antes.
const PART_KEYWORDS = [
    'wrist' => ['tunel carpiano', 'muneca', 'munecas'],
    'foot' => ['dedo del pie', 'dedos del pie', 'fascitis plantar', 'juanete', 'juanetes', 'pie', 'pies', 'talon', 'espolon calcaneo'],
    'ankle' => ['tobillo', 'tobillos', 'tendon de aquiles'],
    'knee' => ['rodilla', 'rodillas', 'menisco', 'meniscos', 'ligamento cruzado', 'rotula'],
    'hip' => ['cadera', 'caderas'],
    'shoulder' => ['hombro', 'hombros', 'manguito rotador'],
    'elbow' => ['codo', 'codos', 'epicondilitis', 'codo de tenista'],
    'hand' => ['mano', 'manos', 'dedo', 'dedos', 'dedo en gatillo'],
    'clavicle' => ['clavicula'],
    'femur' => ['femur'],
    'humerus' => ['humero'],
    'forearm' => ['antebrazo', 'radio y cubito'],
    'tibiaFibula' => ['tibia', 'perone'],
    'cervicalSpine' => ['cervical', 'cervicales', 'cuello'],
    'thoracicSpine' => ['dorsal', 'toracica', 'espalda alta'],
    'lumbarSpine' => ['lumbar', 'lumbares', 'lumbalgia', 'ciatica', 'ciatico', 'hernia discal', 'espalda baja'],
];

// Para el correo al doctor
const PART_NAMES = [
    'wrist' => 'Muñeca', 'foot' => 'Pie', 'ankle' => 'Tobillo', 'knee' => 'Rodilla', 'hip' => 'Cadera',
    'shoulder' => 'Hombro', 'elbow' => 'Codo', 'hand' => 'Mano', 'clavicle' => 'Clavícula', 'femur' => 'Fémur',
    'humerus' => 'Húmero', 'forearm' => 'Antebrazo', 'tibiaFibula' => 'Tibia y peroné',
    'cervicalSpine' => 'Columna cervical', 'thoracicSpine' => 'Columna torácica', 'lumbarSpine' => 'Columna lumbar',
];

// Minúsculas y sin acentos, para comparar palabras (sin iconv: en Linux depende del locale y deja "?")
function plain_text(string $value): string
{
    return strtr(mb_strtolower($value), [
        'á' => 'a', 'à' => 'a', 'ä' => 'a', 'â' => 'a', 'é' => 'e', 'è' => 'e', 'ë' => 'e', 'ê' => 'e',
        'í' => 'i', 'ì' => 'i', 'ï' => 'i', 'î' => 'i', 'ó' => 'o', 'ò' => 'o', 'ö' => 'o', 'ô' => 'o',
        'ú' => 'u', 'ù' => 'u', 'ü' => 'u', 'û' => 'u', 'ñ' => 'n', 'ç' => 'c',
    ]);
}

// Parte del cuerpo del artículo: primero por sus etiquetas de Bunzy y, si no, por el título. '' = artículo general
function detect_part(array $article): string
{
    $tags = implode(' | ', array_map('strval', (array) ($article['tags'] ?? [])));
    foreach ([$tags, (string) ($article['title'] ?? '')] as $source) {
        $text = plain_text($source);
        foreach (PART_KEYWORDS as $part => $words) {
            foreach ($words as $word) {
                if (preg_match('/\b' . preg_quote($word, '/') . '\b/', $text)) {
                    return $part;
                }
            }
        }
    }
    return '';
}

// Anota en private/cache/bunzy.log lo que no se pudo guardar (Bunzy no reintenta)
function log_bunzy(array $config, string $message): void
{
    $line = gmdate('c') . " $message\n";
    @file_put_contents($config['cache_dir'] . '/bunzy.log', $line, FILE_APPEND | LOCK_EX);
}

// Mismo formato que los slugs del panel: minúsculas, números y guiones
function clean_slug(string $value): string
{
    return trim(preg_replace('/[^a-z0-9]+/', '-', plain_text($value)), '-');
}

// El título ya lo pinta BlogPost: se quita el <h1> del inicio. También se quita lo que pueda ejecutar código.
function clean_html(string $html): string
{
    $html = preg_replace('/^\s*<h1\b[^>]*>.*?<\/h1>/is', '', $html);
    $html = preg_replace('/<(script|style|iframe|object|embed|form)\b[^>]*>.*?<\/\1>/is', '', $html);
    $html = preg_replace('/<(script|style|iframe|object|embed|form|input|button)\b[^>]*\/?>/i', '', $html);
    $html = preg_replace('/\s+on[a-z]+\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)/i', '', $html);
    return preg_replace('/(href|src)\s*=\s*(["\']?)\s*javascript:[^"\'\s>]*\2/i', '$1="#"', $html);
}

// Puntos clave y preguntas frecuentes de Bunzy, al final del contenido
function extra_sections(array $article): string
{
    $html = '';
    $takeaways = array_filter(array_map('strval', (array) ($article['keyTakeaways'] ?? [])), 'strlen');
    if ($takeaways) {
        $html .= '<h2>Puntos clave</h2><ul>';
        foreach ($takeaways as $takeaway) {
            $html .= '<li>' . htmlspecialchars($takeaway) . '</li>';
        }
        $html .= '</ul>';
    }
    $faq = array_filter((array) ($article['faq'] ?? []), fn ($item) => !empty($item['question']) && !empty($item['answer']));
    if ($faq) {
        $html .= '<h2>Preguntas frecuentes</h2>';
        foreach ($faq as $item) {
            $html .= '<h3>' . htmlspecialchars((string) $item['question']) . '</h3><p>'
                . htmlspecialchars((string) $item['answer']) . '</p>';
        }
    }
    return $html;
}

// Sube la portada de Bunzy a Cloudinary (igual que el panel, sin firma). Si falla, se queda la de Bunzy.
function cloudinary_image(array $config, string $imageUrl): string
{
    if (empty($config['cloudinary_cloud_name']) || empty($config['cloudinary_upload_preset'])) {
        return $imageUrl;
    }
    $ch = curl_init('https://api.cloudinary.com/v1_1/' . rawurlencode($config['cloudinary_cloud_name']) . '/image/upload');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 5,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => ['file' => $imageUrl, 'upload_preset' => $config['cloudinary_upload_preset']],
    ]);
    $response = curl_exec($ch);
    $result = $response === false ? null : json_decode($response, true);
    if (empty($result['secure_url'])) {
        log_bunzy($config, "cloudinary falló con $imageUrl: " . substr((string) $response, 0, 200));
        return $imageUrl;
    }
    return $result['secure_url'];
}

// Responde a Bunzy ya y sigue trabajando (LiteSpeed en Hostinger, o PHP-FPM)
function respond_and_continue(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    if (function_exists('litespeed_finish_request')) {
        litespeed_finish_request();
    } elseif (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
    } else {
        flush();
    }
}

function notify_new_post(array $config, string $docId, string $title, string $slug, string $part): void
{
    $postUrl = SITE_URL . "/blog/$slug";
    $editUrl = SITE_URL . "/admin/edit/$docId";
    $subject = "Se publicó en tu blog: $title";
    $partNote = $part !== ''
        ? 'También aparece en la página de ' . PART_NAMES[$part] . ': ' . SITE_URL . "/procedures/$part"
        : 'Quedó como artículo general: no se detectó una parte del cuerpo en sus etiquetas ni en el título.';
    $html = '<div style="font-family:Arial,sans-serif;font-size:15px;color:#0b1d3a">'
        . '<h2 style="margin:0 0 12px">' . htmlspecialchars($subject) . '</h2>'
        . '<p>El artículo que aprobaste en Bunzy ya está en el blog.</p>'
        . '<p><a href="' . htmlspecialchars($postUrl) . '" style="display:inline-block;padding:10px 18px;background:#075985;'
        . 'color:#fff;text-decoration:none;border-radius:6px;font-weight:bold">Ver el artículo</a></p>'
        . '<p>' . htmlspecialchars($partNote) . '</p>'
        . '<p style="color:#5b6b7b;font-size:13px">Si hace falta cambiarla, se ajusta en el panel: '
        . '<a href="' . htmlspecialchars($editUrl) . '">' . htmlspecialchars($editUrl) . '</a></p>'
        . '</div>';
    $text = "$subject\n\nEl artículo que aprobaste en Bunzy ya está en el blog:\n$postUrl\n\n$partNote\n\n"
        . "Si hace falta cambiarla, se ajusta en el panel:\n$editUrl\n";
    if (!send_mail($config, $config['notify_to'], 'Avisos Dr. Hans Ruiz', $subject, $html, $text)) {
        log_bunzy($config, "no se pudo avisar por correo de $docId");
    }
}

require_method('POST');
$config = load_config();
if (empty($config['bunzy_secret'])) {
    json_response(503, ['error' => 'not_configured']);
}

// La firma se calcula sobre el cuerpo tal cual llegó, antes de decodificarlo
$raw = (string) file_get_contents('php://input');
$expected = 'sha256=' . hash_hmac('sha256', $raw, $config['bunzy_secret']);
if (!hash_equals($expected, (string) ($_SERVER['HTTP_X_BUNZY_SIGNATURE'] ?? ''))) {
    json_response(401, ['error' => 'bad_signature']);
}

$payload = json_decode($raw, true);
$article = $payload['data']['article'] ?? null;
$event = (string) ($payload['event_type'] ?? '');
if (!is_array($payload) || !is_array($article)) {
    json_response(400, ['error' => 'bad_request']);
}

// El botón Probar de Bunzy: no se guarda nada
if (($payload['test'] ?? false) === true) {
    json_response(200, ['ok' => true, 'test' => true]);
}

$slug = clean_slug((string) ($article['slug'] ?? ''));
if ($slug === '') {
    log_bunzy($config, "$event sin slug válido: " . ($article['slug'] ?? ''));
    json_response(400, ['error' => 'invalid_slug']);
}
$docId = "bunzy-$slug";

if (!in_array($event, ['article.published', 'article.updated', 'article.unpublished'], true)) {
    json_response(200, ['ok' => true, 'ignored' => $event]);
}

$existing = firestore_get($config, POSTS, $docId);
if ($existing === null) {
    log_bunzy($config, "$event $docId: no se pudo leer Firestore");
    json_response(502, ['error' => 'storage']);
}

if ($event === 'article.unpublished') {
    if ($existing && !firestore_upsert($config, POSTS, $docId, ['published' => ['booleanValue' => false]])) {
        log_bunzy($config, "$event $docId: no se pudo ocultar");
        json_response(502, ['error' => 'storage']);
    }
    json_response(200, ['ok' => true, 'id' => $docId]);
}

// Un artículo escrito a mano en el panel ya puede tener este slug: no se pisa
$sameSlug = firestore_ids_where($config, POSTS, 'slug', $slug);
if ($sameSlug === null) {
    log_bunzy($config, "$event $docId: no se pudo revisar el slug");
    json_response(502, ['error' => 'storage']);
}
if (array_diff($sameSlug, [$docId])) {
    log_bunzy($config, "$event $docId: el slug ya lo usa otro artículo (" . implode(', ', $sameSlug) . ')');
    json_response(409, ['error' => 'slug_taken']);
}

$title = trim((string) ($article['title'] ?? ''));
$content = clean_html((string) ($article['html'] ?? '')) . extra_sections($article);
if ($title === '' || trim(strip_tags($content)) === '') {
    log_bunzy($config, "$event $docId: sin título o sin contenido");
    json_response(400, ['error' => 'invalid_article']);
}

$fields = [
    'title' => ['stringValue' => mb_substr($title, 0, 200)],
    'slug' => ['stringValue' => $slug],
    'content' => ['stringValue' => $content],
    'published' => ['booleanValue' => true],
    'source' => ['stringValue' => 'bunzy'],
    'bunzyUpdatedAt' => ['stringValue' => (string) ($article['updatedAt'] ?? $payload['timestamp'] ?? '')],
];

// La portada solo se vuelve a subir si cambió en Bunzy
$thumbnail = (string) ($article['thumbnailUrl'] ?? $article['seo']['ogImage'] ?? '');
$previousThumbnail = $existing['fields']['bunzyThumbnailUrl']['stringValue'] ?? '';
if (str_starts_with($thumbnail, 'https://') && ($thumbnail !== $previousThumbnail || empty($existing['fields']['imageUrl']['stringValue']))) {
    $fields['imageUrl'] = ['stringValue' => cloudinary_image($config, $thumbnail)];
    $fields['bunzyThumbnailUrl'] = ['stringValue' => $thumbnail];
}

// Solo al crearlo: la categoría y la parte del cuerpo las puede ajustar el doctor en el panel y no se pisan
$part = '';
if (!$existing) {
    $tag = trim((string) (($article['tags'] ?? [])[0] ?? ''));
    $publishedAt = strtotime((string) ($article['publishedAt'] ?? '')) ?: time();
    $fields += [
        'category' => ['stringValue' => $tag !== '' ? mb_strtoupper(mb_substr($tag, 0, 1)) . mb_substr($tag, 1) : 'General'],
        'videoUrl' => ['stringValue' => ''],
        'publishedAt' => ['timestampValue' => gmdate('Y-m-d\TH:i:s\Z', $publishedAt)],
    ];
    // Los artículos generales no llevan relatedPart
    $part = detect_part($article);
    if ($part !== '') {
        $fields['relatedPart'] = ['stringValue' => $part];
    }
}

if (!firestore_upsert($config, POSTS, $docId, $fields)) {
    log_bunzy($config, "$event $docId: no se pudo guardar");
    json_response(502, ['error' => 'storage']);
}

respond_and_continue(200, ['ok' => true, 'id' => $docId]);
if (!$existing) {
    notify_new_post($config, $docId, $title, $slug, $part);
}
