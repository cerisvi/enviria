<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';

requireLogin();
$pdo = getDbOrDie();

$uploadDir = __DIR__ . '/uploads/governance';
$uploadUrlBase = '/admin/uploads/governance';
$allowedPhotoExt = ['jpg', 'jpeg', 'png', 'webp'];
$allowedCvExt = ['pdf', 'doc', 'docx'];

function slugify(string $text): string
{
    $slug = strtolower(trim($text));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '';
    $slug = trim($slug, '-');
    return $slug !== '' ? $slug : 'figura';
}

function uniqueSlug(PDO $pdo, string $base, int $excludeId = 0): string
{
    $slug = $base;
    $i = 2;
    while (true) {
        $stmt = $pdo->prepare('SELECT COUNT(*) FROM governance_members WHERE slug = ? AND id != ?');
        $stmt->execute([$slug, $excludeId]);
        if ((int) $stmt->fetchColumn() === 0) {
            return $slug;
        }
        $slug = $base . '-' . $i;
        $i++;
    }
}

$message = '';
$messageType = 'success';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    requireValidCsrf();
    $action = $_POST['action'] ?? '';

    if ($action === 'delete') {
        $id = (int) ($_POST['id'] ?? 0);
        $stmt = $pdo->prepare('DELETE FROM governance_members WHERE id = ?');
        $stmt->execute([$id]);
        header('Location: /admin/governance.php?deleted=1');
        exit;
    }

    if ($action === 'save') {
        $id = (int) ($_POST['id'] ?? 0);
        $role = trim($_POST['role'] ?? '');
        $name = trim($_POST['name'] ?? '');
        $bio = trim($_POST['bio'] ?? '');
        $sortOrder = (int) ($_POST['sort_order'] ?? 0);

        if ($role === '') {
            $message = 'Il campo "Ruolo" è obbligatorio.';
            $messageType = 'error';
        } else {
            $photoPath = $_POST['existing_photo'] ?? '';
            $cvPath = $_POST['existing_cv'] ?? '';

            if (!empty($_FILES['photo']['name'])) {
                $ext = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
                if (!in_array($ext, $allowedPhotoExt, true)) {
                    $message = 'Formato foto non supportato (usa JPG, PNG o WEBP).';
                    $messageType = 'error';
                } else {
                    $filename = 'photo-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0755, true);
                    }
                    move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . '/' . $filename);
                    $photoPath = $uploadUrlBase . '/' . $filename;
                }
            }

            if ($message === '' && !empty($_FILES['cv']['name'])) {
                $ext = strtolower(pathinfo($_FILES['cv']['name'], PATHINFO_EXTENSION));
                if (!in_array($ext, $allowedCvExt, true)) {
                    $message = 'Formato CV non supportato (usa PDF, DOC o DOCX).';
                    $messageType = 'error';
                } else {
                    $filename = 'cv-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0755, true);
                    }
                    move_uploaded_file($_FILES['cv']['tmp_name'], $uploadDir . '/' . $filename);
                    $cvPath = $uploadUrlBase . '/' . $filename;
                }
            }

            if ($message === '') {
                if ($id > 0) {
                    $stmt = $pdo->prepare('UPDATE governance_members SET role=?, name=?, photo_path=?, bio=?, cv_path=?, sort_order=? WHERE id=?');
                    $stmt->execute([
                        $role,
                        $name !== '' ? $name : null,
                        $photoPath !== '' ? $photoPath : null,
                        $bio !== '' ? $bio : null,
                        $cvPath !== '' ? $cvPath : null,
                        $sortOrder,
                        $id,
                    ]);
                } else {
                    $slug = uniqueSlug($pdo, slugify($name !== '' ? $name : $role));
                    $maxOrder = (int) $pdo->query('SELECT COALESCE(MAX(sort_order), 0) FROM governance_members')->fetchColumn();
                    $stmt = $pdo->prepare('INSERT INTO governance_members (slug, role, name, photo_path, bio, cv_path, sort_order) VALUES (?,?,?,?,?,?,?)');
                    $stmt->execute([
                        $slug,
                        $role,
                        $name !== '' ? $name : null,
                        $photoPath !== '' ? $photoPath : null,
                        $bio !== '' ? $bio : null,
                        $cvPath !== '' ? $cvPath : null,
                        $sortOrder > 0 ? $sortOrder : $maxOrder + 1,
                    ]);
                }
                header('Location: /admin/governance.php?saved=1');
                exit;
            }
        }
    }
}

if (($_GET['saved'] ?? '') === '1') {
    $message = 'Figura salvata correttamente.';
}
if (($_GET['deleted'] ?? '') === '1') {
    $message = 'Figura eliminata.';
}

$editing = null;
if (!empty($_GET['edit'])) {
    $stmt = $pdo->prepare('SELECT * FROM governance_members WHERE id = ?');
    $stmt->execute([(int) $_GET['edit']]);
    $editing = $stmt->fetch();
}

$allMembers = $pdo->query('SELECT * FROM governance_members ORDER BY sort_order')->fetchAll();

adminHeader('Governance e figure chiave', 'governance');
flashMessage($message, $messageType);
?>

<p style="color:#4a5553; font-size:0.88rem; margin-top:-8px;">
  Queste figure compaiono nell'organigramma della pagina "Chi Siamo" e, una
  volta cliccate, aprono una pagina dedicata con foto, competenze e CV —
  come per gli organi di governo di un ateneo. Lascia "Nome" vuoto per
  mostrare "In aggiornamento" finché la figura non è stata assegnata.
</p>

<div class="admin-card">
  <h2 style="margin-top:0;"><?= $editing ? 'Modifica figura' : 'Aggiungi nuova figura' ?></h2>
  <form method="post" enctype="multipart/form-data" class="admin-form">
    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrfToken()) ?>" />
    <input type="hidden" name="action" value="save" />
    <input type="hidden" name="id" value="<?= (int) ($editing['id'] ?? 0) ?>" />
    <input type="hidden" name="existing_photo" value="<?= htmlspecialchars($editing['photo_path'] ?? '') ?>" />
    <input type="hidden" name="existing_cv" value="<?= htmlspecialchars($editing['cv_path'] ?? '') ?>" />

    <div class="admin-form-row">
      <label>Ruolo
        <input type="text" name="role" required placeholder="Es. Responsabile Scientifico" value="<?= htmlspecialchars($editing['role'] ?? '') ?>" />
      </label>
      <label>Nome e cognome <small>(lascia vuoto se non ancora assegnato)</small>
        <input type="text" name="name" placeholder="Es. Mario Rossi" value="<?= htmlspecialchars($editing['name'] ?? '') ?>" />
      </label>
    </div>

    <label>Descrizione sintetica delle competenze <small>(facoltativa)</small>
      <textarea name="bio" rows="4" placeholder="Breve profilo, competenze ed esperienze rilevanti..."><?= htmlspecialchars($editing['bio'] ?? '') ?></textarea>
    </label>

    <div class="admin-form-row">
      <label>Foto <small>(JPG/PNG/WEBP — lascia vuoto per mantenere quella attuale)</small>
        <input type="file" name="photo" accept="image/jpeg,image/png,image/webp" />
      </label>
      <label>CV <small>(PDF/DOC/DOCX — lascia vuoto per mantenere quello attuale)</small>
        <input type="file" name="cv" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
      </label>
    </div>

    <label style="max-width:160px;">Ordine
      <input type="number" name="sort_order" min="0" value="<?= (int) ($editing['sort_order'] ?? 0) ?>" />
    </label>

    <?php if (!empty($editing['photo_path'])): ?>
      <p><img src="<?= htmlspecialchars($editing['photo_path']) ?>" style="max-width:120px;border-radius:50%;" /></p>
    <?php endif; ?>
    <?php if (!empty($editing['cv_path'])): ?>
      <p><a href="<?= htmlspecialchars($editing['cv_path']) ?>" target="_blank" class="admin-btn admin-btn--outline">CV attuale</a></p>
    <?php endif; ?>

    <div class="admin-actions">
      <button type="submit" class="admin-btn">Salva</button>
      <?php if ($editing): ?>
        <a href="/admin/governance.php" class="admin-btn admin-btn--outline">Annulla modifica</a>
      <?php endif; ?>
    </div>
  </form>
</div>

<div class="admin-card">
  <h2 style="margin-top:0;">Figure pubblicate</h2>
  <table class="admin-table">
    <thead><tr><th>Foto</th><th>Ruolo</th><th>Nome</th><th>Link pagina</th><th>Azioni</th></tr></thead>
    <tbody>
      <?php foreach ($allMembers as $m): ?>
        <tr>
          <td><?php if (!empty($m['photo_path'])): ?><img src="<?= htmlspecialchars($m['photo_path']) ?>" style="width:44px;height:44px;border-radius:50%;object-fit:cover;" /><?php else: ?><em>—</em><?php endif; ?></td>
          <td><?= htmlspecialchars($m['role']) ?></td>
          <td><?= $m['name'] ? htmlspecialchars($m['name']) : '<em>In aggiornamento</em>' ?></td>
          <td><a href="/chi-siamo/governance/<?= htmlspecialchars($m['slug']) ?>" target="_blank">/chi-siamo/governance/<?= htmlspecialchars($m['slug']) ?></a></td>
          <td class="admin-actions">
            <a href="/admin/governance.php?edit=<?= (int) $m['id'] ?>" class="admin-btn admin-btn--outline">Modifica</a>
            <form method="post" onsubmit="return confirm('Eliminare questa figura?');" style="display:inline;">
              <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrfToken()) ?>" />
              <input type="hidden" name="action" value="delete" />
              <input type="hidden" name="id" value="<?= (int) $m['id'] ?>" />
              <button type="submit" class="admin-btn admin-btn--danger">Elimina</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
      <?php if (empty($allMembers)): ?>
        <tr><td colspan="5"><em>Nessuna figura inserita.</em></td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>

<?php adminFooter(); ?>
