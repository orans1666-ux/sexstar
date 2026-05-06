<?php
require_once __DIR__ . '/db.php';

$action = $_POST['action'] ?? $_GET['action'] ?? 'overview';

if ($action === 'overview') {
    require_admin();
    $stats = [
        'bookings' => (int)db()->query('SELECT COUNT(*) FROM bookings')->fetchColumn(),
        'users' => (int)db()->query('SELECT COUNT(*) FROM users WHERE role = "customer"')->fetchColumn(),
        'services' => (int)db()->query('SELECT COUNT(*) FROM services')->fetchColumn(),
        'revenue' => (float)db()->query('SELECT COALESCE(SUM(total_price),0) FROM bookings WHERE status != "cancelled"')->fetchColumn(),
    ];
    $stmt = db()->query('SELECT b.*, s.name_ar AS service_name FROM bookings b LEFT JOIN services s ON s.id = b.service_id ORDER BY b.created_at DESC LIMIT 10');
    json_response(['success' => true, 'stats' => $stats, 'bookings' => $stmt->fetchAll()]);
}

if ($action === 'save_banner') {
    require_admin();
    $stmt = db()->prepare('INSERT INTO banners (title_ar, title_en, description_ar, description_en, image, discount_percentage, start_date, end_date, position, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "active")');
    $stmt->execute([
        trim($_POST['title_ar'] ?? ''),
        trim($_POST['title_en'] ?? ''),
        trim($_POST['description_ar'] ?? ''),
        trim($_POST['description_en'] ?? ''),
        'assets/images/discount-banner.svg',
        (int)($_POST['discount_percentage'] ?? 0),
        $_POST['start_date'] ?: null,
        $_POST['end_date'] ?: null,
        $_POST['position'] ?? 'home'
    ]);
    header('Location: ../dashboard.html');
    exit;
}

if ($action === 'save_settings') {
    require_admin();
    foreach (['whatsapp', 'snapchat', 'google_maps'] as $key) {
        $stmt = db()->prepare('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)');
        $stmt->execute([$key, trim($_POST[$key] ?? '')]);
    }
    header('Location: ../dashboard.html');
    exit;
}

json_response(['success' => false, 'message' => 'Unknown action'], 400);
