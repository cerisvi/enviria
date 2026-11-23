<?php
declare(strict_types=1);

function adminHeader(string $title, string $active = ''): void
{
    $navItems = [
        'dashboard' => ['href' => '/admin/index.php', 'label' => 'Dashboard'],
        'news' => ['href' => '/admin/news.php', 'label' => 'News & Eventi'],
        'partners' => ['href' => '/admin/partners.php', 'label' => 'Partner'],
        'avvisi' => ['href' => '/admin/avvisi.php', 'label' => 'Avvisi per il personale'],
        'submissions' => ['href' => '/admin/submissions.php', 'label' => 'Richieste ricevute'],
    ];
    ?>
<!doctype html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title><?= htmlspecialchars($title) ?> — Pannello ENVIRIA</title>
  <link rel="stylesheet" href="/admin/style.css" />
</head>
<body>
  <div class="admin-shell">
    <aside class="admin-sidebar">
      <div class="admin-sidebar__brand">ENVIRIA <span>Admin</span></div>
      <nav>
        <?php foreach ($navItems as $key => $item): ?>
          <a href="<?= htmlspecialchars($item['href']) ?>" class="<?= $key === $active ? 'is-active' : '' ?>">
            <?= htmlspecialchars($item['label']) ?>
          </a>
        <?php endforeach; ?>
      </nav>
      <a href="/admin/logout.php" class="admin-sidebar__logout">Esci</a>
      <a href="/" class="admin-sidebar__back">← Torna al sito</a>
    </aside>
    <main class="admin-main">
      <h1><?= htmlspecialchars($title) ?></h1>
<?php
}

function adminFooter(): void
{
    ?>
    </main>
  </div>
</body>
</html>
<?php
}

function flashMessage(?string $message, string $type = 'success'): void
{
    if ($message) {
        echo '<div class="admin-flash admin-flash--' . htmlspecialchars($type) . '">' . htmlspecialchars($message) . '</div>';
    }
}
