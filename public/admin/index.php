<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';

requireLogin();
$pdo = getDbOrDie();

$counts = [
    'news' => (int) $pdo->query('SELECT COUNT(*) FROM news')->fetchColumn(),
    'partners' => (int) $pdo->query('SELECT COUNT(*) FROM partners')->fetchColumn(),
    'avvisi' => (int) $pdo->query('SELECT COUNT(*) FROM avvisi_personale')->fetchColumn(),
    'albo' => (int) $pdo->query("SELECT COUNT(*) FROM albo_fornitori_submissions WHERE status = 'nuovo'")->fetchColumn(),
    'long_list' => (int) $pdo->query("SELECT COUNT(*) FROM long_list_submissions WHERE status = 'nuovo'")->fetchColumn(),
    'hub' => (int) $pdo->query("SELECT COUNT(*) FROM hub_requests WHERE status = 'nuovo'")->fetchColumn(),
];
$newSubmissions = $counts['albo'] + $counts['long_list'] + $counts['hub'];

adminHeader('Dashboard', 'dashboard');
?>
<p>Benvenuto/a, <?= htmlspecialchars($_SESSION['admin_username'] ?? '') ?>. Da qui puoi
aggiornare i contenuti del sito enviriahub.it senza bisogno di ricompilare o
ricaricare file.</p>

<div class="admin-dashboard-grid">
  <a href="/admin/news.php" class="admin-dashboard-card">
    <strong><?= $counts['news'] ?></strong> News pubblicate
  </a>
  <a href="/admin/partners.php" class="admin-dashboard-card">
    <strong><?= $counts['partners'] ?></strong> Partner
  </a>
  <a href="/admin/avvisi.php" class="admin-dashboard-card">
    <strong><?= $counts['avvisi'] ?></strong> Avvisi per il personale
  </a>
  <a href="/admin/submissions.php" class="admin-dashboard-card">
    <strong><?= $newSubmissions ?></strong> Richieste nuove da leggere
  </a>
</div>

<div class="admin-card" style="margin-top: 24px;">
  <h3 style="margin-top:0;">Promemoria importante</h3>
  <p>I contenuti modificati qui (News, Partner, Avvisi) compaiono <strong>subito</strong>
  per chi visita il sito nel browser. Tuttavia le pagine salvate anche per i motori
  di ricerca (il cosiddetto "pre-rendering") restano quelle dell'ultima build inviata
  da Claude: per aggiornarle del tutto anche lì, segnala la modifica così da
  rigenerare e ricaricare lo zip del sito quando serve.</p>
</div>
<?php
adminFooter();
