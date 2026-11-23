<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

function startAdminSession(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params([
            'lifetime' => 0,
            'path' => '/admin/',
            'secure' => !empty($_SERVER['HTTPS']),
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
        session_start();
    }
}

function isLoggedIn(): bool
{
    startAdminSession();
    return !empty($_SESSION['admin_user_id']);
}

function requireLogin(): void
{
    if (!isLoggedIn()) {
        header('Location: /admin/login.php');
        exit;
    }
}

function csrfToken(): string
{
    startAdminSession();
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function requireValidCsrf(): void
{
    startAdminSession();
    $token = $_POST['csrf_token'] ?? '';
    if (!is_string($token) || !hash_equals($_SESSION['csrf_token'] ?? '', $token)) {
        http_response_code(403);
        die('Richiesta non valida (token di sicurezza scaduto). Ricarica la pagina e riprova.');
    }
}

// Blocco semplice dopo troppi tentativi di login falliti dallo stesso IP,
// per rallentare eventuali attacchi a forza bruta.
function tooManyLoginAttempts(string $ip): bool
{
    $pdo = getDbOrDie();
    $stmt = $pdo->prepare(
        'SELECT COUNT(*) FROM login_attempts WHERE ip_address = ? AND attempted_at > (NOW() - INTERVAL 15 MINUTE)'
    );
    $stmt->execute([$ip]);
    return (int) $stmt->fetchColumn() >= 8;
}

function recordLoginAttempt(string $ip): void
{
    $pdo = getDbOrDie();
    $stmt = $pdo->prepare('INSERT INTO login_attempts (ip_address) VALUES (?)');
    $stmt->execute([$ip]);
}
