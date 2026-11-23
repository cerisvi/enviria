<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';

requireLogin();
$pdo = getDbOrDie();

$tables = [
    'albo' => ['table' => 'albo_fornitori_submissions', 'label' => 'Albo Fornitori'],
    'long_list' => ['table' => 'long_list_submissions', 'label' => 'Long List Professionisti'],
    'hub' => ['table' => 'hub_requests', 'label' => 'Richieste Hub'],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    requireValidCsrf();
    $group = $_POST['group'] ?? '';
    $id = (int) ($_POST['id'] ?? 0);
    $action = $_POST['action'] ?? '';

    if (isset($tables[$group])) {
        $table = $tables[$group]['table'];
        if ($action === 'mark_read') {
            $stmt = $pdo->prepare("UPDATE {$table} SET status = 'letto' WHERE id = ?");
            $stmt->execute([$id]);
        } elseif ($action === 'delete') {
            $stmt = $pdo->prepare("DELETE FROM {$table} WHERE id = ?");
            $stmt->execute([$id]);
        }
    }
    header('Location: /admin/submissions.php?tab=' . urlencode($group));
    exit;
}

$activeTab = $_GET['tab'] ?? 'albo';
if (!isset($tables[$activeTab])) {
    $activeTab = 'albo';
}

$rows = $pdo->query('SELECT * FROM ' . $tables[$activeTab]['table'] . ' ORDER BY created_at DESC')->fetchAll();

adminHeader('Richieste ricevute', 'submissions');
?>

<div class="trasparenza-nav" style="display:flex; gap:10px; margin-bottom:20px;">
  <?php foreach ($tables as $key => $def): ?>
    <a href="/admin/submissions.php?tab=<?= $key ?>" class="admin-btn <?= $key === $activeTab ? '' : 'admin-btn--outline' ?>">
      <?= htmlspecialchars($def['label']) ?>
    </a>
  <?php endforeach; ?>
</div>

<div class="admin-card">
  <table class="admin-table">
    <thead>
      <tr>
        <th>Data</th>
        <?php if ($activeTab === 'albo'): ?>
          <th>Ragione sociale</th><th>Categoria</th><th>Contatti</th><th>Documento</th>
        <?php elseif ($activeTab === 'long_list'): ?>
          <th>Nome</th><th>Area</th><th>Contatti</th><th>CV</th>
        <?php else: ?>
          <th>Nome</th><th>Tipo richiesta</th><th>Contatti</th>
        <?php endif; ?>
        <th>Stato</th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($rows as $r): ?>
        <tr>
          <td><?= htmlspecialchars(substr($r['created_at'], 0, 16)) ?></td>
          <?php if ($activeTab === 'albo'): ?>
            <td><?= htmlspecialchars($r['ragione_sociale']) ?><br><small><?= htmlspecialchars($r['partita_iva']) ?></small></td>
            <td><?= htmlspecialchars($r['categoria']) ?></td>
            <td><?= htmlspecialchars($r['email']) ?><br><small>PEC: <?= htmlspecialchars($r['pec']) ?></small></td>
            <td>
              <?php if (!empty($r['documento_path'])): ?>
                <a href="<?= htmlspecialchars($r['documento_path']) ?>" target="_blank" class="admin-btn admin-btn--outline">Apri</a>
              <?php else: ?>
                <em>—</em>
              <?php endif; ?>
            </td>
          <?php elseif ($activeTab === 'long_list'): ?>
            <td><?= htmlspecialchars($r['nome']) ?><br><small><?= htmlspecialchars($r['codice_fiscale']) ?></small></td>
            <td><?= htmlspecialchars($r['area_competenza']) ?></td>
            <td><?= htmlspecialchars($r['email']) ?><br><small>PEC: <?= htmlspecialchars($r['pec']) ?></small></td>
            <td>
              <?php if (!empty($r['cv_path'])): ?>
                <a href="<?= htmlspecialchars($r['cv_path']) ?>" target="_blank" class="admin-btn admin-btn--outline">Apri</a>
              <?php else: ?>
                <em>—</em>
              <?php endif; ?>
            </td>
          <?php else: ?>
            <td><?= htmlspecialchars($r['name']) ?><br><small><?= htmlspecialchars($r['organization'] ?? '') ?></small></td>
            <td><?= htmlspecialchars($r['request_type']) ?></td>
            <td><?= htmlspecialchars($r['email']) ?></td>
          <?php endif; ?>
          <td>
            <span class="admin-badge <?= $r['status'] === 'nuovo' ? 'admin-badge--new' : '' ?>">
              <?= htmlspecialchars($r['status']) ?>
            </span>
          </td>
          <td class="admin-actions">
            <?php if ($r['status'] === 'nuovo'): ?>
              <form method="post" style="display:inline;">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrfToken()) ?>" />
                <input type="hidden" name="group" value="<?= $activeTab ?>" />
                <input type="hidden" name="action" value="mark_read" />
                <input type="hidden" name="id" value="<?= (int) $r['id'] ?>" />
                <button type="submit" class="admin-btn admin-btn--outline">Segna come letta</button>
              </form>
            <?php endif; ?>
            <form method="post" onsubmit="return confirm('Eliminare questa richiesta?');" style="display:inline;">
              <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrfToken()) ?>" />
              <input type="hidden" name="group" value="<?= $activeTab ?>" />
              <input type="hidden" name="action" value="delete" />
              <input type="hidden" name="id" value="<?= (int) $r['id'] ?>" />
              <button type="submit" class="admin-btn admin-btn--danger">Elimina</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
      <?php if (empty($rows)): ?>
        <tr><td colspan="6"><em>Nessuna richiesta ricevuta in questa categoria.</em></td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>

<p style="color:#4a5553; font-size:0.88rem;">
  Ogni richiesta arriva comunque anche via email a direzione@enviriahub.it: questo
  elenco è un comodo riepilogo aggiuntivo, non sostituisce la posta elettronica.
</p>

<?php adminFooter(); ?>
