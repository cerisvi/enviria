<?php
declare(strict_types=1);

require_once __DIR__ . '/../admin/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=60');

try {
    $pdo = getDb();
    $rows = $pdo->query('SELECT title, avviso_date, body, link FROM avvisi_personale ORDER BY avviso_date DESC')->fetchAll();

    $avvisi = array_map(function ($row) {
        return [
            'title' => $row['title'],
            'date' => $row['avviso_date'],
            'body' => $row['body'],
            'link' => $row['link'],
        ];
    }, $rows);

    echo json_encode($avvisi, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    http_response_code(503);
    echo json_encode(['error' => 'Database non configurato.']);
}
