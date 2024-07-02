-- Insert 10 records into `user` table with auto-increment `id` and random `role_id` between 1 and 2
INSERT INTO `user` (address, avatar, created_at, deleted_at, email, full_name, is_active, job_position, password, phone, province, skills, social_network_1, social_network_2, updated_at, year_experience, role_id)
VALUES
('Address 1', 'avatar1.jpg', NOW(), NULL, 'user1@example.com', 'User 1', 1, 'Developer', 'password1', '1234567890', 'Hanoi', 'Java, Python', 'https://social1.com', 'https://social2.com', NOW(), 2),
('Address 2', 'avatar2.jpg', NOW(), NULL, 'user2@example.com', 'User 2', 1, 'Designer', 'password2', '0987654321', 'Ho Chi Minh', 'PHP, JavaScript', 'https://social1.com', 'https://social2.com', NOW(), 3),
('Address 3', 'avatar3.jpg', NOW(), NULL, 'user3@example.com', 'User 3', 1, 'Manager', 'password3', '0123456789', 'Da Nang', 'C#, TypeScript', 'https://social1.com', 'https://social2.com', NOW(), 4),
('Address 4', 'avatar4.jpg', NOW(), NULL, 'user4@example.com', 'User 4', 1, 'Engineer', 'password4', '0987654321', 'Hanoi', 'JavaScript, Ruby', 'https://social1.com', 'https://social2.com', NOW(), 5),
('Address 5', 'avatar5.jpg', NOW(), NULL, 'user5@example.com', 'User 5', 1, 'Developer', 'password5', '1234567890', 'Ho Chi Minh', 'Python, Kotlin', 'https://social1.com', 'https://social2.com', NOW(), 6),
('Address 6', 'avatar6.jpg', NOW(), NULL, 'user6@example.com', 'User 6', 1, 'Designer', 'password6', '0987654321', 'Hanoi', 'Java, React', 'https://social1.com', 'https://social2.com', NOW(), 7),
('Address 7', 'avatar7.jpg', NOW(), NULL, 'user7@example.com', 'User 7', 1, 'Manager', 'password7', '0123456789', 'Ho Chi Minh', 'PHP, Angular', 'https://social1.com', 'https://social2.com', NOW(), 8),
('Address 8', 'avatar8.jpg', NOW(), NULL, 'user8@example.com', 'User 8', 1, 'Engineer', 'password8', '0987654321', 'Da Nang', 'C#, Node.js', 'https://social1.com', 'https://social2.com', NOW(), 9),
('Address 9', 'avatar9.jpg', NOW(), NULL, 'user9@example.com', 'User 9', 1, 'Developer', 'password9', '1234567890', 'Ho Chi Minh', 'JavaScript, Vue', 'https://social1.com', 'https://social2.com', NOW(), 10),
('Address 10', 'avatar10.jpg', NOW(), NULL, 'user10@example.com', 'User 10', 1, 'Designer', 'password10', '0987654321', 'Hanoi', 'Java, TypeScript', 'https://social1.com', 'https://social2.com', NOW(), 11);
