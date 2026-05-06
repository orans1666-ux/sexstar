CREATE DATABASE IF NOT EXISTS sixth_stars CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sixth_stars;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  phone VARCHAR(30) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('customer','admin') NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_users_role (role),
  INDEX idx_users_phone (phone)
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_ar VARCHAR(120) NOT NULL,
  name_en VARCHAR(120) NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  image VARCHAR(255),
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_services_status (status)
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  customer_name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  service_id INT NOT NULL,
  barber_name VARCHAR(120) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  notes TEXT,
  status ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (service_id) REFERENCES services(id),
  UNIQUE KEY unique_barber_slot (barber_name, booking_date, booking_time),
  INDEX idx_booking_date (booking_date),
  INDEX idx_booking_status (status)
);

CREATE TABLE banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_ar VARCHAR(160) NOT NULL,
  title_en VARCHAR(160) NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  image VARCHAR(255),
  discount_percentage INT DEFAULT 0,
  start_date DATE NULL,
  end_date DATE NULL,
  position ENUM('home','services','booking','all') DEFAULT 'home',
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_banners_status_position (status, position)
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(60) NOT NULL,
  payment_status ENUM('pending','paid','failed','refunded') DEFAULT 'pending',
  transaction_id VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  INDEX idx_payments_status (payment_status)
);

CREATE TABLE settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(120) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL
);

INSERT INTO users (name, email, phone, password, role) VALUES
('مدير الموقع', 'admin@sixthstar.test', '966500000000', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'admin'),
('فهد الحربي', 'fahad@test.sa', '966501111111', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'customer');

INSERT INTO services (name_ar, name_en, description_ar, description_en, price, duration, image, status) VALUES
('قص شعر', 'Haircut', 'قص شعر احترافي مناسب للوجه والأسلوب.', 'Professional haircut for your face shape and style.', 60, '35 دقيقة', 'assets/images/services/haircut.svg', 'active'),
('تهذيب لحية', 'Beard Trim', 'تحديد وتهذيب اللحية بتفاصيل دقيقة.', 'Precise beard shaping and trimming.', 35, '25 دقيقة', 'assets/images/services/beard.svg', 'active'),
('حلاقة ملكية', 'Royal Shave', 'تجربة حلاقة فاخرة مع عناية كاملة.', 'Luxury shave with full care.', 120, '70 دقيقة', 'assets/images/services/royal.svg', 'active'),
('تنظيف بشرة', 'Skin Care', 'تنظيف بشرة رجالي سريع ومنعش.', 'Refreshing men skin care session.', 90, '45 دقيقة', 'assets/images/services/skin.svg', 'active'),
('صبغ شعر', 'Hair Color', 'صبغة شعر متوازنة ولمسة طبيعية.', 'Balanced hair color with natural finish.', 140, '80 دقيقة', 'assets/images/services/color.svg', 'active'),
('باقة العريس', 'Groom Package', 'إطلالة متكاملة ليومك المميز.', 'Complete look for your special day.', 299, '120 دقيقة', 'assets/images/services/groom.svg', 'active'),
('عناية VIP', 'VIP Care', 'جلسة عناية فاخرة للشعر واللحية والبشرة.', 'Premium care for hair, beard and skin.', 220, '90 دقيقة', 'assets/images/services/vip.svg', 'active'),
('خدمة الأطفال', 'Kids Service', 'قصات خفيفة وسريعة للأطفال.', 'Quick and smooth kids haircut.', 45, '25 دقيقة', 'assets/images/services/kids.svg', 'active');

INSERT INTO bookings (user_id, customer_name, phone, service_id, barber_name, booking_date, booking_time, notes, status, total_price) VALUES
(2, 'فهد الحربي', '966501111111', 1, 'أحمد', CURDATE(), '18:30:00', 'قص مرتب', 'confirmed', 60),
(NULL, 'ناصر', '966502222222', 6, 'تركي', DATE_ADD(CURDATE(), INTERVAL 2 DAY), '20:00:00', 'باقة العريس', 'pending', 299);

INSERT INTO banners (title_ar, title_en, description_ar, description_en, image, discount_percentage, start_date, end_date, position, status) VALUES
('خصم 30% على باقة العريس', '30% Off Groom Package', 'إطلالة متكاملة ليومك المميز.', 'Complete look for your special day.', 'assets/images/discount-banner.svg', 30, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'home', 'active'),
('مفاجآت أسبوعية', 'Weekly Surprises', 'مفاجآت أسبوعية لعملاء النجمة السادسة.', 'Weekly surprises for Sixth Star customers.', 'assets/images/discount-banner.svg', 15, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'all', 'active');

INSERT INTO settings (setting_key, setting_value) VALUES
('whatsapp', '966500000000'),
('snapchat', 'https://www.snapchat.com/'),
('google_maps', 'https://www.google.com/maps?q=Riyadh%20Saudi%20Arabia&output=embed'),
('salon_name_ar', 'النجمة السادسة'),
('salon_name_en', 'Sixth Star Barbershop');
