<?php
require_once __DIR__ . '/db.php';

$bookingId = (int)($_POST['booking_id'] ?? 0);
$method = preg_replace('/[^a-zA-Z_]/', '', $_POST['payment_method'] ?? 'mada');

if (!$bookingId) {
    exit('رقم الحجز مطلوب.');
}

$booking = db()->prepare('SELECT total_price FROM bookings WHERE id = ? LIMIT 1');
$booking->execute([$bookingId]);
$row = $booking->fetch();
if (!$row) {
    exit('الحجز غير موجود.');
}

// Future gateway integration point: Apple Pay, Mada, Visa, Mastercard, STC Pay.
$transaction = 'DEMO-' . time();
$stmt = db()->prepare('INSERT INTO payments (booking_id, amount, payment_method, payment_status, transaction_id) VALUES (?, ?, ?, "pending", ?)');
$stmt->execute([$bookingId, $row['total_price'], $method, $transaction]);

echo 'تم إنشاء عملية دفع تجريبية. لا توجد بيانات بطاقة محفوظة.';
