<?php
declare(strict_types=1);

require_once __DIR__ . '/../admin/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=60');

try {
    $pdo = getDb();
    $categories = $pdo->query('SELECT * FROM partner_categories ORDER BY sort_order')->fetchAll();

    $result = array_map(function ($cat) use ($pdo) {
        $stmt = $pdo->prepare('SELECT name, logo_path, url FROM partners WHERE category_id = ? ORDER BY sort_order');
        $stmt->execute([$cat['id']]);
        $partners = array_map(function ($p) {
            return ['name' => $p['name'], 'logo' => $p['logo_path'], 'url' => $p['url']];
        }, $stmt->fetchAll());

        return ['title' => $cat['title'], 'partners' => $partners];
    }, $categories);

    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    http_response_code(503);
    echo json_encode(['error' => 'Database non configurato.']);
}
