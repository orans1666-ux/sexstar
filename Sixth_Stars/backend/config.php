<?php
declare(strict_types=1);

// Configure these values for XAMPP or Laragon.
define('DB_HOST', 'localhost');
define('DB_NAME', 'sixth_stars');
define('DB_USER', 'root');
define('DB_PASS', '');
define('BASE_URL', '../');

ini_set('display_errors', '0');
error_reporting(E_ALL);

if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'httponly' => true,
        'secure' => isset($_SERVER['HTTPS']),
        'samesite' => 'Lax'
    ]);
    session_start();
}

function e(?string $value): string {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

function json_response(array $payload, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function require_admin(): void {
    if (($_SESSION['user']['role'] ?? '') !== 'admin') {
        json_response(['success' => false, 'message' => 'غير مصرح. سجل دخول المدير أولاً.'], 403);
    }
}
