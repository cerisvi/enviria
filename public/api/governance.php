<?php
declare(strict_types=1);

require_once __DIR__ . '/../admin/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=60');

try {
    $pdo = getDb();
    $rows = $pdo->query('SELECT slug, role, name, photo_path, bio, cv_path FROM governance_members ORDER BY sort_order')->fetchAll();

    $members = array_map(function ($row) {
        return [
            'slug' => $row['slug'],
            'role' => $row['role'],
            'name' => $row['name'],
            'photo' => $row['photo_path'],
            'bio' => $row['bio'],
            'cv' => $row['cv_path'],
        ];
    }, $rows);

    echo json_encode($members, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    http_response_code(503);
    echo json_encode(['error' => 'Database non configurato.']);
}
