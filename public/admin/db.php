<?php
declare(strict_types=1);

function getDb(): PDO
{
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $config = require __DIR__ . '/config.php';

    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=utf8mb4',
        $config['db_host'],
        $config['db_name'],
    );

    try {
        $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        // Rilanciata come eccezione (non un die()) così chi chiama getDb()
        // in un contesto "tollerante" (es. i moduli pubblici di iscrizione)
        // può intercettarla con un try/catch e continuare comunque a
        // funzionare via email anche se il database non è ancora configurato.
        throw new RuntimeException(
            'Impossibile connettersi al database. Verifica le credenziali in '
            . 'public/admin/config.php e che lo schema sia stato importato '
            . '(public/admin/schema.sql).',
            0,
            $e,
        );
    }

    return $pdo;
}

/**
 * Variante usata dalle pagine del pannello admin: se il database non è
 * configurato, interrompe con un messaggio chiaro invece di una pagina
 * bianca o un errore PHP illeggibile.
 */
function getDbOrDie(): PDO
{
    try {
        return getDb();
    } catch (RuntimeException $e) {
        http_response_code(500);
        die(htmlspecialchars($e->getMessage()));
    }
}
