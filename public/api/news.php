<?php
declare(strict_types=1);

require_once __DIR__ . '/../admin/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=60');

try {
    $pdo = getDb();
    $rows = $pdo->query('SELECT * FROM news ORDER BY news_date DESC')->fetchAll();

    $news = array_map(function ($row) {
        return [
            'date' => $row['news_date'],
            'title' => $row['title'],
            'subtitle' => $row['subtitle'],
            'excerpt' => $row['excerpt'],
            'body' => array_values(array_filter(array_map('rtrim', explode("\n", $row['body'])), fn ($line) => $line !== '')),
            'image' => $row['image_path'],
            'imageAlt' => $row['image_alt'],
            'gallery' => $row['gallery_json'] ? json_decode($row['gallery_json']) : null,
            'links' => $row['links_json'] ? json_decode($row['links_json']) : null,
        ];
    }, $rows);

    echo json_encode($news, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    http_response_code(503);
    echo json_encode(['error' => 'Database non configurato.']);
}
