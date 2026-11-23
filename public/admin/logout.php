<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';

startAdminSession();
$_SESSION = [];
session_destroy();
header('Location: /admin/login.php');
exit;
