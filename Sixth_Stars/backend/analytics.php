<?php
require_once __DIR__ . '/db.php';

$daily = (int)db()->query('SELECT COUNT(*) FROM bookings WHERE DATE(created_at) = CURDATE()')->fetchColumn();
$weekly = (int)db()->query('SELECT COUNT(*) FROM bookings WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)')->fetchColumn();
$monthly = (int)db()->query('SELECT COUNT(*) FROM bookings WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())')->fetchColumn();
$completed = (int)db()->query('SELECT COUNT(*) FROM bookings WHERE status = "completed"')->fetchColumn();
$cancelled = (int)db()->query('SELECT COUNT(*) FROM bookings WHERE status = "cancelled"')->fetchColumn();
$revenue = (float)db()->query('SELECT COALESCE(SUM(total_price),0) FROM bookings WHERE status != "cancelled"')->fetchColumn();

json_response([
    'success' => true,
    'metrics' => [
        ['اليومي', $daily],
        ['الأسبوعي', $weekly],
        ['الشهري', $monthly],
        ['المكتملة', $completed],
        ['الملغاة', $cancelled],
        ['الإيرادات', (int)$revenue]
    ]
]);
