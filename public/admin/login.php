<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';

startAdminSession();

if (isLoggedIn()) {
    header('Location: /admin/index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

    if (tooManyLoginAttempts($ip)) {
        $error = 'Troppi tentativi di accesso falliti. Riprova tra qualche minuto.';
    } else {
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';

        $pdo = getDbOrDie();
        $stmt = $pdo->prepare('SELECT id, password_hash FROM admin_users WHERE username = ?');
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_user_id'] = $user['id'];
            $_SESSION['admin_username'] = $username;
            header('Location: /admin/index.php');
            exit;
        }

        recordLoginAttempt($ip);
        $error = 'Credenziali non valide.';
    }
}
?>
<!doctype html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Accedi — Pannello ENVIRIA</title>
  <link rel="stylesheet" href="/admin/style.css" />
</head>
<body>
  <div class="admin-login">
    <div class="admin-login__card">
      <h1>Pannello di gestione ENVIRIA</h1>
      <?php if ($error): ?><p style="color:#b3261e;"><?= htmlspecialchars($error) ?></p><?php endif; ?>
      <form method="post" class="admin-form">
        <label>Nome utente
          <input type="text" name="username" required autofocus />
        </label>
        <label>Password
          <input type="password" name="password" required />
        </label>
        <button type="submit" class="admin-btn">Accedi</button>
      </form>
    </div>
  </div>
</body>
</html>
