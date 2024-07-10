-- Insert 10 records into `company` table with `employer_id` referencing `user` table
INSERT INTO `company` ( about, address, created_at, deleted_at, field, link_google_map, name, province, registration_certificate, tax_code, updated_at, employer_id)
VALUES
( 'About company 1', 'Company 1 Address', NOW(), NULL, 'IT', 'https://maps.google.com/company1', 'Company 1', 'Hanoi', 'Registration Cert 1', 1234567890, NOW(), 'user1_id'),
( 'About company 2', 'Company 2 Address', NOW(), NULL, 'Finance', 'https://maps.google.com/company2', 'Company 2', 'Ho Chi Minh', 'Registration Cert 2', 2345678901, NOW(), 'user2_id'),
('About company 3', 'Company 3 Address', NOW(), NULL, 'Technology', 'https://maps.google.com/company3', 'Company 3', 'Da Nang', 'Registration Cert 3', 3456789012, NOW(), 'user3_id'),
( 'About company 4', 'Company 4 Address', NOW(), NULL, 'Healthcare', 'https://maps.google.com/company4', 'Company 4', 'Hanoi', 'Registration Cert 4', 4567890123, NOW(), 'user4_id'),
( 'About company 5', 'Company 5 Address', NOW(), NULL, 'E-commerce', 'https://maps.google.com/company5', 'Company 5', 'Ho Chi Minh', 'Registration Cert 5', 5678901234, NOW(), 'user5_id'),
( 'About company 6', 'Company 6 Address', NOW(), NULL, 'Education', 'https://maps.google.com/company6', 'Company 6', 'Hanoi', 'Registration Cert 6', 6789012345, NOW(), 'user6_id'),
( 'About company 7', 'Company 7 Address', NOW(), NULL, 'Automotive', 'https://maps.google.com/company7', 'Company 7', 'Ho Chi Minh', 'Registration Cert 7', 7890123456, NOW(), 'user7_id'),
('About company 8', 'Company 8 Address', NOW(), NULL, 'Real Estate', 'https://maps.google.com/company8', 'Company 8', 'Da Nang', 'Registration Cert 8', 8901234567, NOW(), 'user8_id'),
( 'About company 9', 'Company 9 Address', NOW(), NULL, 'Telecommunications', 'https://maps.google.com/company9', 'Company 9', 'Ho Chi Minh', 'Registration Cert 9', 9012345678, NOW(), 'user9_id'),
( 'About company 10', 'Company 10 Address', NOW(), NULL, 'Media', 'https://maps.google.com/company10', 'Company 10', 'Hanoi', 'Registration Cert 10', 1234567890, NOW(), 'user10_id');
