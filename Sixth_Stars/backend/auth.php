<?php
require_once __DIR__ . '/db.php';

$action = $_POST['action'] ?? $_GET['action'] ?? '';

if ($action === 'status') {
    json_response(['success' => true, 'user' => $_SESSION['user'] ?? null]);
}

if ($action === 'register') {
    $name = trim($_POST['name'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $phone = preg_replace('/[^0-9+]/', '', $_POST['phone'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$name || !$email || strlen($password) < 6) {
        exit('بيانات التسجيل غير صحيحة.');
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = db()->prepare('INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, "customer")');
    try {
        $stmt->execute([$name, $email, $phone, $hash]);
        header('Location: ../login.html');
        exit;
    } catch (PDOException $exception) {
        error_log($exception->getMessage());
        exit('البريد مستخدم مسبقاً أو حدث خطأ.');
    }
}

if ($action === 'login') {
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $password = $_POST['password'] ?? '';
    if (!$email || !$password) {
        exit('بيانات الدخول غير صحيحة.');
    }

    $stmt = db()->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        session_regenerate_id(true);
        $_SESSION['user'] = [
            'id' => (int)$user['id'],
            'name' => e($user['name']),
            'email' => e($user['email']),
            'role' => $user['role']
        ];
        header('Location: ' . ($user['role'] === 'admin' ? '../dashboard.html' : '../booking.html'));
        exit;
    }
    exit('البريد أو كلمة المرور غير صحيحة.');
}

json_response(['success' => false, 'message' => 'طلب غير معروف.'], 400);
