<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';

requireLogin();
$pdo = getDbOrDie();

$message = '';
$messageType = 'success';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    requireValidCsrf();
    $action = $_POST['action'] ?? '';

    if ($action === 'delete') {
        $id = (int) ($_POST['id'] ?? 0);
        $stmt = $pdo->prepare('DELETE FROM avvisi_personale WHERE id = ?');
        $stmt->execute([$id]);
        header('Location: /admin/avvisi.php?deleted=1');
        exit;
    }

    if ($action === 'save') {
        $id = (int) ($_POST['id'] ?? 0);
        $title = trim($_POST['title'] ?? '');
        $date = $_POST['avviso_date'] ?? '';
        $body = trim($_POST['body'] ?? '');
        $link = trim($_POST['link'] ?? '');

        if ($title === '' || !$date || $body === '') {
            $message = 'Compila titolo, data e testo.';
            $messageType = 'error';
        } else {
            if ($id > 0) {
                $stmt = $pdo->prepare('UPDATE avvisi_personale SET title=?, avviso_date=?, body=?, link=? WHERE id=?');
                $stmt->execute([$title, $date, $body, $link ?: null, $id]);
            } else {
                $stmt = $pdo->prepare('INSERT INTO avvisi_personale (title, avviso_date, body, link) VALUES (?,?,?,?)');
                $stmt->execute([$title, $date, $body, $link ?: null]);
            }
            header('Location: /admin/avvisi.php?saved=1');
            exit;
        }
    }
}

if (($_GET['saved'] ?? '') === '1') {
    $message = 'Avviso salvato correttamente.';
}
if (($_GET['deleted'] ?? '') === '1') {
    $message = 'Avviso eliminato.';
}

$editing = null;
if (!empty($_GET['edit'])) {
    $stmt = $pdo->prepare('SELECT * FROM avvisi_personale WHERE id = ?');
    $stmt->execute([(int) $_GET['edit']]);
    $editing = $stmt->fetch();
}

$allAvvisi = $pdo->query('SELECT * FROM avvisi_personale ORDER BY avviso_date DESC')->fetchAll();

adminHeader('Avvisi per il personale', 'avvisi');
flashMessage($message, $messageType);
?>

<div class="admin-card">
  <h2 style="margin-top:0;"><?= $editing ? 'Modifica avviso' : 'Aggiungi nuovo avviso' ?></h2>
  <form method="post" class="admin-form">
    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrfToken()) ?>" />
    <input type="hidden" name="action" value="save" />
    <input type="hidden" name="id" value="<?= (int) ($editing['id'] ?? 0) ?>" />

    <div class="admin-form-row">
      <label>Data
        <input type="date" name="avviso_date" required value="<?= htmlspecialchars($editing['avviso_date'] ?? date('Y-m-d')) ?>" />
      </label>
      <label>Titolo
        <input type="text" name="title" required value="<?= htmlspecialchars($editing['title'] ?? '') ?>" />
      </label>
    </div>

    <label>Testo
      <textarea name="body" rows="5" required><?= htmlspecialchars($editing['body'] ?? '') ?></textarea>
    </label>

    <label>Link al documento/bando <small>(facoltativo)</small>
      <input type="url" name="link" placeholder="https://..." value="<?= htmlspecialchars($editing['link'] ?? '') ?>" />
    </label>

    <div class="admin-actions">
      <button type="submit" class="admin-btn">Salva</button>
      <?php if ($editing): ?>
        <a href="/admin/avvisi.php" class="admin-btn admin-btn--outline">Annulla modifica</a>
      <?php endif; ?>
    </div>
  </form>
</div>

<div class="admin-card">
  <h2 style="margin-top:0;">Avvisi pubblicati</h2>
  <table class="admin-table">
    <thead><tr><th>Data</th><th>Titolo</th><th>Azioni</th></tr></thead>
    <tbody>
      <?php foreach ($allAvvisi as $a): ?>
        <tr>
          <td><?= htmlspecialchars($a['avviso_date']) ?></td>
          <td><?= htmlspecialchars($a['title']) ?></td>
          <td class="admin-actions">
            <a href="/admin/avvisi.php?edit=<?= (int) $a['id'] ?>" class="admin-btn admin-btn--outline">Modifica</a>
            <form method="post" onsubmit="return confirm('Eliminare questo avviso?');" style="display:inline;">
              <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrfToken()) ?>" />
              <input type="hidden" name="action" value="delete" />
              <input type="hidden" name="id" value="<?= (int) $a['id'] ?>" />
              <button type="submit" class="admin-btn admin-btn--danger">Elimina</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
      <?php if (empty($allAvvisi)): ?>
        <tr><td colspan="3"><em>Nessun avviso pubblicato.</em></td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>

<?php adminFooter(); ?>
