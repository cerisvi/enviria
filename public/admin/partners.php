<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';

requireLogin();
$pdo = getDbOrDie();

$uploadDir = __DIR__ . '/uploads/partners';
$uploadUrlBase = '/admin/uploads/partners';
$allowedExt = ['jpg', 'jpeg', 'png', 'webp'];

$message = '';
$messageType = 'success';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    requireValidCsrf();
    $action = $_POST['action'] ?? '';

    if ($action === 'add_category') {
        $title = trim($_POST['category_title'] ?? '');
        if ($title !== '') {
            $maxOrder = (int) $pdo->query('SELECT COALESCE(MAX(sort_order), 0) FROM partner_categories')->fetchColumn();
            $stmt = $pdo->prepare('INSERT INTO partner_categories (title, sort_order) VALUES (?, ?)');
            $stmt->execute([$title, $maxOrder + 1]);
        }
        header('Location: /admin/partners.php?saved=1');
        exit;
    }

    if ($action === 'delete_partner') {
        $id = (int) ($_POST['id'] ?? 0);
        $stmt = $pdo->prepare('DELETE FROM partners WHERE id = ?');
        $stmt->execute([$id]);
        header('Location: /admin/partners.php?deleted=1');
        exit;
    }

    if ($action === 'save_partner') {
        $id = (int) ($_POST['id'] ?? 0);
        $categoryId = (int) ($_POST['category_id'] ?? 0);
        $name = trim($_POST['name'] ?? '');
        $url = trim($_POST['url'] ?? '');

        if ($categoryId <= 0 || $name === '' || $url === '') {
            $message = 'Compila categoria, nome e sito web.';
            $messageType = 'error';
        } else {
            $logoPath = $_POST['existing_logo'] ?? '';

            if (!empty($_FILES['logo']['name'])) {
                $ext = strtolower(pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION));
                if (!in_array($ext, $allowedExt, true)) {
                    $message = 'Formato logo non supportato (usa JPG, PNG o WEBP).';
                    $messageType = 'error';
                } else {
                    $filename = 'partner-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0755, true);
                    }
                    move_uploaded_file($_FILES['logo']['tmp_name'], $uploadDir . '/' . $filename);
                    $logoPath = $uploadUrlBase . '/' . $filename;
                }
            }

            if ($message === '' && $logoPath === '') {
                $message = 'Carica il logo del partner.';
                $messageType = 'error';
            }

            if ($message === '') {
                if ($id > 0) {
                    $stmt = $pdo->prepare('UPDATE partners SET category_id=?, name=?, logo_path=?, url=? WHERE id=?');
                    $stmt->execute([$categoryId, $name, $logoPath, $url, $id]);
                } else {
                    $maxOrder = (int) $pdo->query('SELECT COALESCE(MAX(sort_order), 0) FROM partners WHERE category_id = ' . $categoryId)->fetchColumn();
                    $stmt = $pdo->prepare('INSERT INTO partners (category_id, name, logo_path, url, sort_order) VALUES (?,?,?,?,?)');
                    $stmt->execute([$categoryId, $name, $logoPath, $url, $maxOrder + 1]);
                }
                header('Location: /admin/partners.php?saved=1');
                exit;
            }
        }
    }
}

if (($_GET['saved'] ?? '') === '1') {
    $message = 'Salvato correttamente.';
}
if (($_GET['deleted'] ?? '') === '1') {
    $message = 'Partner eliminato.';
}

$categories = $pdo->query('SELECT * FROM partner_categories ORDER BY sort_order')->fetchAll();

$editing = null;
if (!empty($_GET['edit'])) {
    $stmt = $pdo->prepare('SELECT * FROM partners WHERE id = ?');
    $stmt->execute([(int) $_GET['edit']]);
    $editing = $stmt->fetch();
}

$partnersByCategory = [];
foreach ($categories as $cat) {
    $stmt = $pdo->prepare('SELECT * FROM partners WHERE category_id = ? ORDER BY sort_order');
    $stmt->execute([$cat['id']]);
    $partnersByCategory[$cat['id']] = $stmt->fetchAll();
}

adminHeader('Partner', 'partners');
flashMessage($message, $messageType);
?>

<div class="admin-card">
  <h2 style="margin-top:0;">Categorie</h2>
  <p>Categorie attuali: <?= implode(', ', array_map(fn ($c) => htmlspecialchars($c['title']), $categories)) ?></p>
  <form method="post" class="admin-form" style="display:flex; gap:10px; align-items:flex-end;">
    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrfToken()) ?>" />
    <input type="hidden" name="action" value="add_category" />
    <label style="flex:1; margin:0;">Nuova categoria
      <input type="text" name="category_title" placeholder="Es. Partner tecnologici" required />
    </label>
    <button type="submit" class="admin-btn">Aggiungi categoria</button>
  </form>
</div>

<div class="admin-card">
  <h2 style="margin-top:0;"><?= $editing ? 'Modifica partner' : 'Aggiungi nuovo partner' ?></h2>
  <form method="post" enctype="multipart/form-data" class="admin-form">
    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrfToken()) ?>" />
    <input type="hidden" name="action" value="save_partner" />
    <input type="hidden" name="id" value="<?= (int) ($editing['id'] ?? 0) ?>" />
    <input type="hidden" name="existing_logo" value="<?= htmlspecialchars($editing['logo_path'] ?? '') ?>" />

    <div class="admin-form-row">
      <label>Categoria
        <select name="category_id" required>
          <?php foreach ($categories as $cat): ?>
            <option value="<?= $cat['id'] ?>" <?= (($editing['category_id'] ?? null) == $cat['id']) ? 'selected' : '' ?>>
              <?= htmlspecialchars($cat['title']) ?>
            </option>
          <?php endforeach; ?>
        </select>
      </label>
      <label>Nome partner
        <input type="text" name="name" required value="<?= htmlspecialchars($editing['name'] ?? '') ?>" />
      </label>
    </div>
    <div class="admin-form-row">
      <label>Sito web
        <input type="url" name="url" required placeholder="https://..." value="<?= htmlspecialchars($editing['url'] ?? '') ?>" />
      </label>
      <label>Logo <small>(JPG/PNG/WEBP — lascia vuoto per mantenere quello attuale)</small>
        <input type="file" name="logo" accept="image/jpeg,image/png,image/webp" />
      </label>
    </div>
    <?php if (!empty($editing['logo_path'])): ?>
      <p><img src="<?= htmlspecialchars($editing['logo_path']) ?>" style="max-width:140px;border-radius:8px;background:#fff;padding:6px;" /></p>
    <?php endif; ?>

    <div class="admin-actions">
      <button type="submit" class="admin-btn">Salva</button>
      <?php if ($editing): ?>
        <a href="/admin/partners.php" class="admin-btn admin-btn--outline">Annulla modifica</a>
      <?php endif; ?>
    </div>
  </form>
</div>

<?php foreach ($categories as $cat): ?>
  <div class="admin-card">
    <h3 style="margin-top:0;"><?= htmlspecialchars($cat['title']) ?></h3>
    <table class="admin-table">
      <thead><tr><th>Logo</th><th>Nome</th><th>Sito</th><th>Azioni</th></tr></thead>
      <tbody>
        <?php foreach ($partnersByCategory[$cat['id']] as $p): ?>
          <tr>
            <td><img src="<?= htmlspecialchars($p['logo_path']) ?>" alt="" /></td>
            <td><?= htmlspecialchars($p['name']) ?></td>
            <td><a href="<?= htmlspecialchars($p['url']) ?>" target="_blank"><?= htmlspecialchars($p['url']) ?></a></td>
            <td class="admin-actions">
              <a href="/admin/partners.php?edit=<?= (int) $p['id'] ?>" class="admin-btn admin-btn--outline">Modifica</a>
              <form method="post" onsubmit="return confirm('Eliminare questo partner?');" style="display:inline;">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrfToken()) ?>" />
                <input type="hidden" name="action" value="delete_partner" />
                <input type="hidden" name="id" value="<?= (int) $p['id'] ?>" />
                <button type="submit" class="admin-btn admin-btn--danger">Elimina</button>
              </form>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
<?php endforeach; ?>

<?php adminFooter(); ?>
