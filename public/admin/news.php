<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';

requireLogin();
$pdo = getDbOrDie();

$uploadDir = __DIR__ . '/uploads/news';
$uploadUrlBase = '/admin/uploads/news';
$allowedExt = ['jpg', 'jpeg', 'png', 'webp'];

function parseLines(string $raw): array
{
    $lines = array_filter(array_map('trim', explode("\n", $raw)), fn ($l) => $l !== '');
    return array_values($lines);
}

function parseLinks(string $raw): ?string
{
    $lines = parseLines($raw);
    if (empty($lines)) {
        return null;
    }
    $links = [];
    foreach ($lines as $line) {
        [$label, $url] = array_pad(explode('|', $line, 2), 2, '');
        $label = trim($label);
        $url = trim($url);
        if ($label !== '' && $url !== '') {
            $links[] = ['label' => $label, 'url' => $url];
        }
    }
    return empty($links) ? null : json_encode($links, JSON_UNESCAPED_UNICODE);
}

function parseGallery(string $raw): ?string
{
    $lines = parseLines($raw);
    if (empty($lines)) {
        return null;
    }
    $items = [];
    foreach ($lines as $line) {
        [$src, $alt] = array_pad(explode('|', $line, 2), 2, '');
        $src = trim($src);
        $alt = trim($alt);
        if ($src !== '') {
            $items[] = ['src' => $src, 'alt' => $alt !== '' ? $alt : 'Foto dell’evento'];
        }
    }
    return empty($items) ? null : json_encode($items, JSON_UNESCAPED_UNICODE);
}

function linksToText(?string $json): string
{
    if (!$json) {
        return '';
    }
    $links = json_decode($json, true) ?: [];
    return implode("\n", array_map(fn ($l) => $l['label'] . '|' . $l['url'], $links));
}

function galleryToText(?string $json): string
{
    if (!$json) {
        return '';
    }
    $items = json_decode($json, true) ?: [];
    return implode("\n", array_map(fn ($i) => $i['src'] . '|' . ($i['alt'] ?? ''), $items));
}

$message = '';
$messageType = 'success';

// --- Gestione azioni POST (salva / elimina) ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    requireValidCsrf();
    $action = $_POST['action'] ?? '';

    if ($action === 'delete') {
        $id = (int) ($_POST['id'] ?? 0);
        $stmt = $pdo->prepare('DELETE FROM news WHERE id = ?');
        $stmt->execute([$id]);
        header('Location: /admin/news.php?deleted=1');
        exit;
    }

    if ($action === 'save') {
        $id = (int) ($_POST['id'] ?? 0);
        $date = $_POST['news_date'] ?? '';
        $title = trim($_POST['title'] ?? '');
        $subtitle = trim($_POST['subtitle'] ?? '');
        $excerpt = trim($_POST['excerpt'] ?? '');
        $body = trim($_POST['body'] ?? '');
        $imageAlt = trim($_POST['image_alt'] ?? '');
        $links = parseLinks($_POST['links'] ?? '');
        $gallery = parseGallery($_POST['gallery'] ?? '');

        if ($title === '' || $excerpt === '' || $body === '' || !$date) {
            $message = 'Compila almeno data, titolo, riassunto e testo.';
            $messageType = 'error';
        } else {
            $imagePath = $_POST['existing_image'] ?? '';

            if (!empty($_FILES['image']['name'])) {
                $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
                if (!in_array($ext, $allowedExt, true)) {
                    $message = 'Formato immagine non supportato (usa JPG, PNG o WEBP).';
                    $messageType = 'error';
                } else {
                    $filename = 'news-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0755, true);
                    }
                    move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . '/' . $filename);
                    $imagePath = $uploadUrlBase . '/' . $filename;
                }
            }

            if ($message === '' && $imagePath === '') {
                $message = 'Carica una foto di copertina per la news.';
                $messageType = 'error';
            }

            if ($message === '') {
                if ($id > 0) {
                    $stmt = $pdo->prepare(
                        'UPDATE news SET news_date=?, title=?, subtitle=?, excerpt=?, body=?, image_path=?, image_alt=?, gallery_json=?, links_json=? WHERE id=?'
                    );
                    $stmt->execute([$date, $title, $subtitle ?: null, $excerpt, $body, $imagePath, $imageAlt, $gallery, $links, $id]);
                } else {
                    $stmt = $pdo->prepare(
                        'INSERT INTO news (news_date, title, subtitle, excerpt, body, image_path, image_alt, gallery_json, links_json) VALUES (?,?,?,?,?,?,?,?,?)'
                    );
                    $stmt->execute([$date, $title, $subtitle ?: null, $excerpt, $body, $imagePath, $imageAlt, $gallery, $links]);
                }
                header('Location: /admin/news.php?saved=1');
                exit;
            }
        }
    }
}

if (($_GET['saved'] ?? '') === '1') {
    $message = 'News salvata correttamente.';
}
if (($_GET['deleted'] ?? '') === '1') {
    $message = 'News eliminata.';
}

// --- Dati per il form (modifica o nuova) ---
$editing = null;
if (!empty($_GET['edit'])) {
    $stmt = $pdo->prepare('SELECT * FROM news WHERE id = ?');
    $stmt->execute([(int) $_GET['edit']]);
    $editing = $stmt->fetch();
}

$allNews = $pdo->query('SELECT * FROM news ORDER BY news_date DESC')->fetchAll();

adminHeader('News & Eventi', 'news');
flashMessage($message, $messageType);
?>

<div class="admin-card">
  <h2 style="margin-top:0;"><?= $editing ? 'Modifica news' : 'Aggiungi nuova news' ?></h2>
  <form method="post" enctype="multipart/form-data" class="admin-form">
    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrfToken()) ?>" />
    <input type="hidden" name="action" value="save" />
    <input type="hidden" name="id" value="<?= (int) ($editing['id'] ?? 0) ?>" />
    <input type="hidden" name="existing_image" value="<?= htmlspecialchars($editing['image_path'] ?? '') ?>" />

    <div class="admin-form-row">
      <label>Data
        <input type="date" name="news_date" required value="<?= htmlspecialchars($editing['news_date'] ?? date('Y-m-d')) ?>" />
      </label>
      <label>Titolo
        <input type="text" name="title" required value="<?= htmlspecialchars($editing['title'] ?? '') ?>" />
      </label>
    </div>

    <label>Occhiello/sottotitolo <small>(facoltativo, testo in corsivo sopra il riassunto)</small>
      <input type="text" name="subtitle" value="<?= htmlspecialchars($editing['subtitle'] ?? '') ?>" />
    </label>

    <label>Riassunto breve <small>(mostrato nella card prima di "Leggi tutto")</small>
      <textarea name="excerpt" rows="2" required><?= htmlspecialchars($editing['excerpt'] ?? '') ?></textarea>
    </label>

    <label>Testo completo
      <small>
        Separa i paragrafi con una riga vuota. Una riga che inizia con
        <code>## </code> diventa un sottotitolo. Per un elenco puntato scrivi ogni
        punto su una riga che inizia con <code>• </code>, <strong>senza</strong>
        righe vuote tra un punto e l’altro.
      </small>
      <textarea name="body" rows="10" required><?= htmlspecialchars($editing['body'] ?? '') ?></textarea>
    </label>

    <div class="admin-form-row">
      <label>Foto di copertina <small>(JPG/PNG/WEBP — lascia vuoto per mantenere quella attuale)</small>
        <input type="file" name="image" accept="image/jpeg,image/png,image/webp" />
      </label>
      <label>Testo alternativo foto (accessibilità/SEO)
        <input type="text" name="image_alt" required value="<?= htmlspecialchars($editing['image_alt'] ?? '') ?>" />
      </label>
    </div>
    <?php if (!empty($editing['image_path'])): ?>
      <p><img src="<?= htmlspecialchars($editing['image_path']) ?>" style="max-width:160px;border-radius:8px;" /></p>
    <?php endif; ?>

    <label>Foto aggiuntive (galleria) <small>— una per riga, formato: percorso|didascalia (facoltativo)</small>
      <textarea name="gallery" rows="3"><?= htmlspecialchars(galleryToText($editing['gallery_json'] ?? null)) ?></textarea>
    </label>

    <label>Link esterni <small>— uno per riga, formato: Etichetta|https://indirizzo.it</small>
      <textarea name="links" rows="2"><?= htmlspecialchars(linksToText($editing['links_json'] ?? null)) ?></textarea>
    </label>

    <div class="admin-actions">
      <button type="submit" class="admin-btn">Salva</button>
      <?php if ($editing): ?>
        <a href="/admin/news.php" class="admin-btn admin-btn--outline">Annulla modifica</a>
      <?php endif; ?>
    </div>
  </form>
</div>

<div class="admin-card">
  <h2 style="margin-top:0;">News pubblicate</h2>
  <table class="admin-table">
    <thead><tr><th>Foto</th><th>Data</th><th>Titolo</th><th>Azioni</th></tr></thead>
    <tbody>
      <?php foreach ($allNews as $n): ?>
        <tr>
          <td><img src="<?= htmlspecialchars($n['image_path']) ?>" alt="" /></td>
          <td><?= htmlspecialchars($n['news_date']) ?></td>
          <td><?= htmlspecialchars($n['title']) ?></td>
          <td class="admin-actions">
            <a href="/admin/news.php?edit=<?= (int) $n['id'] ?>" class="admin-btn admin-btn--outline">Modifica</a>
            <form method="post" onsubmit="return confirm('Eliminare questa news?');" style="display:inline;">
              <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrfToken()) ?>" />
              <input type="hidden" name="action" value="delete" />
              <input type="hidden" name="id" value="<?= (int) $n['id'] ?>" />
              <button type="submit" class="admin-btn admin-btn--danger">Elimina</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php adminFooter(); ?>
