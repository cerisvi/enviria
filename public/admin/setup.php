<?php
declare(strict_types=1);

// Pagina da usare UNA SOLA VOLTA per creare il primo utente amministratore,
// subito dopo aver importato schema.sql nel database. Una volta creato un
// utente, questa pagina si disattiva automaticamente da sola (per sicurezza
// puoi comunque eliminare il file public/admin/setup.php dopo l'uso).

require_once __DIR__ . '/db.php';

$pdo = getDbOrDie();
$existing = (int) $pdo->query('SELECT COUNT(*) FROM admin_users')->fetchColumn();

$error = '';
$success = false;

if ($existing > 0) {
    http_response_code(403);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $passwordConfirm = $_POST['password_confirm'] ?? '';

    if ($username === '' || strlen($password) < 10) {
        $error = 'Scegli un nome utente e una password di almeno 10 caratteri.';
    } elseif ($password !== $passwordConfirm) {
        $error = 'Le due password non coincidono.';
    } else {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)');
        $stmt->execute([$username, $hash]);
        $success = true;
    }
}
?>
<!doctype html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Configurazione iniziale — Pannello ENVIRIA</title>
  <link rel="stylesheet" href="/admin/style.css" />
</head>
<body>
  <div class="admin-login">
    <div class="admin-login__card">
      <?php if ($existing > 0 && !$success): ?>
        <h1>Configurazione già completata</h1>
        <p>Esiste già un utente amministratore. Per sicurezza elimina il file
        <code>public/admin/setup.php</code> dal server.</p>
        <p><a href="/admin/login.php" class="admin-btn">Vai al login</a></p>
      <?php elseif ($success): ?>
        <h1>Utente creato!</h1>
        <p>Ora puoi accedere al pannello. Per sicurezza, elimina adesso il file
        <code>public/admin/setup.php</code> dal server (tramite il File Explorer
        di Shellrent).</p>
        <p><a href="/admin/login.php" class="admin-btn">Vai al login</a></p>
      <?php else: ?>
        <h1>Crea il primo utente amministratore</h1>
        <?php if ($error): ?><p style="color:#b3261e;"><?= htmlspecialchars($error) ?></p><?php endif; ?>
        <form method="post" class="admin-form">
          <label>Nome utente
            <input type="text" name="username" required autofocus />
          </label>
          <label>Password (almeno 10 caratteri)
            <input type="password" name="password" required minlength="10" />
          </label>
          <label>Conferma password
            <input type="password" name="password_confirm" required minlength="10" />
          </label>
          <button type="submit" class="admin-btn">Crea utente</button>
        </form>
      <?php endif; ?>
    </div>
  </div>
</body>
</html>
