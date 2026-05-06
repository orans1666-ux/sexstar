<?php
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$customer = trim($_POST['customer_name'] ?? '');
$phone = preg_replace('/[^0-9+]/', '', $_POST['phone'] ?? '');
$serviceId = (int)($_POST['service_id'] ?? 0);
$barber = trim($_POST['barber_name'] ?? '');
$date = $_POST['booking_date'] ?? '';
$time = $_POST['booking_time'] ?? '';
$notes = trim($_POST['notes'] ?? '');
$total = (float)($_POST['total_price'] ?? 0);

if (!$customer || !$phone || !$serviceId || !$barber || !$date || !$time) {
    json_response(['success' => false, 'message' => 'يرجى تعبئة جميع الحقول المطلوبة.'], 422);
}

$check = db()->prepare('SELECT id FROM bookings WHERE barber_name = ? AND booking_date = ? AND booking_time = ? AND status != "cancelled" LIMIT 1');
$check->execute([$barber, $date, $time]);
if ($check->fetch()) {
    json_response(['success' => false, 'message' => 'هذا الموعد محجوز مسبقاً. اختر وقتاً آخر.'], 409);
}

$stmt = db()->prepare('INSERT INTO bookings (user_id, customer_name, phone, service_id, barber_name, booking_date, booking_time, notes, status, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, "pending", ?)');
$stmt->execute([$_SESSION['user']['id'] ?? null, $customer, $phone, $serviceId, $barber, $date, $time, $notes, $total]);

$text = rawurlencode("مرحباً، أرغب في تأكيد حجز في صالون النجمة السادسة.\nالاسم: {$customer}\nالجوال: {$phone}\nالتاريخ: {$date}\nالوقت: {$time}\nالحلاق: {$barber}");
json_response(['success' => true, 'message' => 'تم حفظ الحجز بنجاح.', 'whatsapp' => "https://wa.me/966500000000?text={$text}"]);
