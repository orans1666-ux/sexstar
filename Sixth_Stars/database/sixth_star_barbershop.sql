-- Sixth Star Barbershop database structure.
-- هذا الملف للتجهيز المستقبلي فقط. واجهات JavaScript الحالية لا تتصل بـ MySQL مباشرة.
-- الربط الحقيقي مع قاعدة البيانات يحتاج Backend لاحقًا.

CREATE DATABASE IF NOT EXISTS sixth_star_barbershop
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sixth_star_barbershop;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('customer','admin','barber') DEFAULT 'customer',
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_phone (phone),
  INDEX idx_users_role (role)
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_ar VARCHAR(120) NOT NULL,
  name_en VARCHAR(120) NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INT NOT NULL,
  image_path VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_services_active (is_active)
);

CREATE TABLE barbers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  display_name VARCHAR(120) NOT NULL,
  specialty VARCHAR(160) NOT NULL,
  bio TEXT,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_barbers_active (is_active),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_code VARCHAR(40) NOT NULL UNIQUE,
  user_id INT NULL,
  service_id INT NOT NULL,
  barber_id INT NOT NULL,
  customer_name VARCHAR(120) NOT NULL,
  customer_phone VARCHAR(30) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_bookings_date_time (booking_date, booking_time),
  INDEX idx_bookings_status (status),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (service_id) REFERENCES services(id),
  FOREIGN KEY (barber_id) REFERENCES barbers(id)
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  payment_reference VARCHAR(80) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  method ENUM('card','mada','cash','wallet') DEFAULT 'card',
  status ENUM('pending','paid','failed','refunded') DEFAULT 'pending',
  paid_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_payments_status (status),
  INDEX idx_payments_reference (payment_reference),
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  booking_id INT NULL,
  rating DECIMAL(2,1) NOT NULL,
  review_text TEXT NOT NULL,
  is_visible TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_reviews_visible (is_visible),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);

CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160),
  phone VARCHAR(30),
  message TEXT NOT NULL,
  status ENUM('new','read','archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_contact_status (status)
);

CREATE TABLE loyalty_points (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  points INT NOT NULL DEFAULT 0,
  reason VARCHAR(180) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_loyalty_user (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(120) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE working_hours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  day_name VARCHAR(30) NOT NULL,
  opens_at TIME NOT NULL,
  closes_at TIME NOT NULL,
  is_closed TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE holidays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  holiday_date DATE NOT NULL,
  title VARCHAR(160) NOT NULL,
  is_closed TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_holidays_date (holiday_date)
);

INSERT INTO users (full_name, phone, email, password_hash, role) VALUES
('مدير النظام', '966500000000', 'admin@sixthstar.test', 'demo-hash-only', 'admin'),
('فهد الحربي', '966501111111', 'fahad@test.sa', 'demo-hash-only', 'customer'),
('ناصر العتيبي', '966502222222', 'nasser@test.sa', 'demo-hash-only', 'customer');

INSERT INTO services (name_ar, name_en, description_ar, description_en, price, duration_minutes, image_path) VALUES
('حلاقة شعر كلاسيكية', 'Classic Haircut', 'قص مرتب بتفاصيل دقيقة يناسب العمل والمناسبات.', 'Clean precise cut for work and occasions.', 55.00, 35, 'assets/images/services/classic-cut.svg'),
('حلاقة شعر عصرية', 'Modern Fade', 'تدرج عصري ولمسة نهائية حادة.', 'Modern fade with a sharp finish.', 70.00, 45, 'assets/images/services/modern-fade.svg'),
('تهذيب اللحية', 'Beard Trim', 'تحديد وتهذيب باحترافية مع عناية خفيفة.', 'Professional shaping and beard care.', 35.00, 25, 'assets/images/services/beard-trim.svg'),
('حلاقة شعر ولحية', 'Haircut & Beard', 'تجربة متكاملة للشعر واللحية.', 'Complete grooming for hair and beard.', 90.00, 60, 'assets/images/services/hair-beard.svg'),
('تنظيف البشرة', 'Skin Refresh', 'تنظيف سريع ومنعش للبشرة الرجالية.', 'Quick refreshing facial care for men.', 80.00, 40, 'assets/images/services/facial.svg'),
('باقة العريس', 'Groom Package', 'باقة فاخرة لإطلالة متكاملة.', 'Premium full look package.', 260.00, 120, 'assets/images/services/groom.svg');

INSERT INTO barbers (display_name, specialty, bio) VALUES
('أحمد', 'تدرج ولحية', 'حلاق متخصص في القصات العصرية والتحديد الدقيق.'),
('تركي', 'باقة العريس', 'خبرة في تجهيز المناسبات والعناية الكاملة.'),
('عبدالعزيز', 'قصات كلاسيكية', 'لمسات هادئة ومظهر مرتب مناسب للعمل.');

INSERT INTO bookings (booking_code, user_id, service_id, barber_id, customer_name, customer_phone, booking_date, booking_time, total_price, status) VALUES
('SS-1024', 2, 4, 1, 'فهد الحربي', '966501111111', '2026-05-09', '19:30:00', 90.00, 'confirmed'),
('SS-1025', 3, 6, 2, 'ناصر العتيبي', '966502222222', '2026-05-11', '20:00:00', 260.00, 'pending');

INSERT INTO payments (booking_id, payment_reference, amount, method, status, paid_at) VALUES
(1, 'PAY-8021', 90.00, 'card', 'paid', '2026-05-06 18:10:00'),
(2, 'PAY-8022', 260.00, 'mada', 'pending', NULL);

INSERT INTO reviews (user_id, booking_id, rating, review_text) VALUES
(2, 1, 5.0, 'التدرج مضبوط والخدمة راقية.'),
(3, NULL, 4.9, 'المكان مرتب والحجز سهل.');

INSERT INTO contact_messages (full_name, email, phone, message) VALUES
('عميل مهتم', 'client@test.sa', '966503333333', 'أرغب بحجز باقة العريس ومعرفة التفاصيل.');

INSERT INTO loyalty_points (user_id, points, reason) VALUES
(2, 120, 'حجز مكتمل'),
(3, 80, 'زيارة أولى');

INSERT INTO settings (setting_key, setting_value) VALUES
('site_name_ar', 'صالون النجمة السادسة'),
('site_name_en', 'Sixth Star Barbershop'),
('whatsapp', '966500000000'),
('snapchat', 'https://www.snapchat.com/'),
('currency', 'SAR');

INSERT INTO working_hours (day_name, opens_at, closes_at, is_closed) VALUES
('Saturday', '12:00:00', '23:59:00', 0),
('Sunday', '12:00:00', '23:59:00', 0),
('Monday', '12:00:00', '23:59:00', 0),
('Tuesday', '12:00:00', '23:59:00', 0),
('Wednesday', '12:00:00', '23:59:00', 0),
('Thursday', '12:00:00', '23:59:00', 0),
('Friday', '14:00:00', '23:59:00', 0);

INSERT INTO holidays (holiday_date, title, is_closed) VALUES
('2026-06-16', 'إجازة صيانة الصالون', 1);
