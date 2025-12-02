-- SP-Loyalty Demo Seed Data
-- Run with: psql -h localhost -U postgres -d "SP-Loyality.DB" -f seed.sql

-- Clear existing data (in correct order due to foreign keys)
TRUNCATE TABLE transaction_products CASCADE;
TRUNCATE TABLE transactions CASCADE;
TRUNCATE TABLE product_approval_requests CASCADE;
TRUNCATE TABLE redemptions CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE user_favorite_shops CASCADE;
TRUNCATE TABLE family_members CASCADE;
TRUNCATE TABLE shops CASCADE;
TRUNCATE TABLE rewards CASCADE;
TRUNCATE TABLE users CASCADE;

-- =============================================
-- USERS (password for demo users: "userdemo", admin: "admindemo")
-- =============================================
INSERT INTO users (id, email, name, password, role, points, "isVerified", "invitationCode", "createdAt", "updatedAt") VALUES
-- Demo User (password: userdemo) - 500 points for demo
('2721d7a2-b4f4-4854-9073-f0a1d403d2aa', 'user@demo.com', 'Demo User', '$2b$10$X.nFAgrQzYIi/nUxqkzdv.zNfBRxiKkA25BfWqUDF0ccVxZbNQ1.i', 'user', 500, true, 'DEMO2024', NOW(), NOW()),
-- Admin (password: userdemo)
('0600aa5a-8c5b-4ab3-9557-76c326692c0b', 'admin@demo.com', 'Admin User', '$2b$10$X.nFAgrQzYIi/nUxqkzdv.zNfBRxiKkA25BfWqUDF0ccVxZbNQ1.i', 'admin', 150, true, 'ADMIN2024', NOW(), NOW()),
-- Additional demo users
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'marko.petrovic@demo.com', 'Marko Petrovic', '$2b$10$X.nFAgrQzYIi/nUxqkzdv.zNfBRxiKkA25BfWqUDF0ccVxZbNQ1.i', 'user', 320, true, 'MARKO001', NOW(), NOW()),
('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'ana.jovanovic@demo.com', 'Ana Jovanovic', '$2b$10$X.nFAgrQzYIi/nUxqkzdv.zNfBRxiKkA25BfWqUDF0ccVxZbNQ1.i', 'user', 275, true, 'ANA00001', NOW(), NOW()),
('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'stefan.nikolic@demo.com', 'Stefan Nikolic', '$2b$10$X.nFAgrQzYIi/nUxqkzdv.zNfBRxiKkA25BfWqUDF0ccVxZbNQ1.i', 'user', 180, true, 'STEFAN01', NOW(), NOW()),
('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'milica.stojanovic@demo.com', 'Milica Stojanovic', '$2b$10$X.nFAgrQzYIi/nUxqkzdv.zNfBRxiKkA25BfWqUDF0ccVxZbNQ1.i', 'user', 95, true, 'MILICA01', NOW(), NOW()),
('e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b', 'nikola.djordjevic@demo.com', 'Nikola Djordjevic', '$2b$10$X.nFAgrQzYIi/nUxqkzdv.zNfBRxiKkA25BfWqUDF0ccVxZbNQ1.i', 'user', 420, true, 'NIKOLA01', NOW(), NOW()),
('f6a7b8c9-d0e1-9f0a-3b4c-5d6e7f8a9b0c', 'jovana.ilic@demo.com', 'Jovana Ilic', '$2b$10$X.nFAgrQzYIi/nUxqkzdv.zNfBRxiKkA25BfWqUDF0ccVxZbNQ1.i', 'user', 55, true, 'JOVANA01', NOW(), NOW());

-- =============================================
-- SHOPS (12 stores with various locations)
-- =============================================
INSERT INTO shops (id, name, "cleanedName", location, "additionalPoints", "createdAt", "updatedAt") VALUES
-- Existing shops
('9c13aa92-abd5-4866-ba77-5c003a1196e5', '1235237-287 - Maxi', 'Maxi', 'SOMBOR PUT 29A', 0, NOW(), NOW()),
('eec630dd-6d99-4964-8d8f-18c07a07e577', '1206913-230055 Subotica 2 FO', 'Subotica 2 FO', 'Bajnatska bb', 0, NOW(), NOW()),
('9efbe933-3d02-44e9-846c-42b49c332036', '1370491-HITRA DOO OGRANAK BOX', 'HITRA DOO OGRANAK BOX', 'DIMITRIJA TUCOVICA 1', 0, NOW(), NOW()),
('ecff1e84-55c2-4aac-a2c6-c924bd9fe236', '1374056-ZZZ RADNIKAMEDIGROUP CENTAR', 'RADNIKAMEDIGROUP CENTAR', 'BAJNATSKA 21 A', 0, NOW(), NOW()),
('226d3c1d-09d5-4016-af44-5f47e6239b24', '1054272-Bomax doo', 'Bomax doo', 'Put Edvarda Kardelja 13a', 2, NOW(), NOW()),
('1c3f738c-b938-49e3-ba46-51789c5d6e5a', '1023825-MAYUR DOO MAYUR SHOP', 'MAYUR DOO MAYUR SHOP', 'SANDORA PETEFIJA 20', 0, NOW(), NOW()),
('613f7381-3b51-45ae-a3b2-7e657549c78e', '1347800-Madame Coco XS14', 'Madame Coco XS14', 'Bajnatska 21', 0, NOW(), NOW()),
('96537998-0c4b-4561-83f1-3adcf1beb2fb', '1255753-Madame Coco XS04', 'Madame Coco XS04', 'BULEVAR OSLOBODJENJA 119', 0, NOW(), NOW()),
-- New shops
('11111111-1111-1111-1111-111111111111', '1234567-Idea Supermarket', 'Idea Supermarket', 'Narodnog Fronta 45', 1, NOW(), NOW()),
('22222222-2222-2222-2222-222222222222', '2345678-Lidl Novi Sad', 'Lidl Novi Sad', 'Bulevar Oslobodjenja 89', 0, NOW(), NOW()),
('33333333-3333-3333-3333-333333333333', '3456789-DM Drogerie', 'DM Drogerie', 'Zmaj Jovina 15', 1, NOW(), NOW()),
('44444444-4444-4444-4444-444444444444', '4567890-Univerexport', 'Univerexport', 'Futoska 12', 0, NOW(), NOW()),
('55555555-5555-5555-5555-555555555555', '5678901-Tempo Market', 'Tempo Market', 'Kisacka 55', 0, NOW(), NOW()),
('66666666-6666-6666-6666-666666666666', '6789012-Gomex', 'Gomex', 'Mise Dimitrijevica 8', 1, NOW(), NOW()),
('77777777-7777-7777-7777-777777777777', '7890123-Aman Plus', 'Aman Plus', 'Cara Dusana 22', 0, NOW(), NOW()),
('88888888-8888-8888-8888-888888888888', '8901234-Roda Megamarket', 'Roda Megamarket', 'Sentandrejski Put 11', 2, NOW(), NOW());

-- =============================================
-- REWARDS (10 diverse rewards)
-- =============================================
INSERT INTO rewards (id, name, description, "pointsCost", stock, "imageUrl", status, "createdAt", "updatedAt") VALUES
-- Existing rewards
('9282b6f1-3f31-4908-81d0-423fff5e63ec', 'Coffee to go', 'Kafa od najboljeg zrna', 2, 50, 'https://i.ibb.co/3yVHd72K/slika-2796866-5fb16069944b6-velika.jpg', 'active', NOW(), NOW()),
('2fba7fd5-f3e1-4865-b70b-c05c7680f4af', 'Nutella Snack', 'Najukusniji zalogaj za pocetak dana', 5, 30, 'https://i.ibb.co/4wVFGJWT/81q-XA5-Uz-YBL.jpg', 'active', NOW(), NOW()),
('cb0474bf-6d2f-46b5-ab96-08ae8194f45d', 'MChose G7 Gaming mouse', 'Budite na vrhu svakog zadatka', 55, 5, 'https://i.ibb.co/Mx0gmym1/61-Ib6l-RFyi-L-AC-UF894-1000-QL80.jpg', 'active', NOW(), NOW()),
('a7108c3f-d8d9-4212-9080-66abcaa96167', 'Honor 400 Pro', 'Uzivajte u novom telefonu vrhunskog proizvodjaca', 345, 3, 'https://i.ibb.co/spWFSNh0/a0192e54e51c.jpg', 'active', NOW(), NOW()),
('33d50b13-b1ba-45ea-b136-c25f03687151', 'Letovanje Maldivi', 'Letovanje za 2 osoba na jednoj od najatraktivnijih destinacija', 650, 2, 'https://i.ibb.co/3yP45Fgj/image.png', 'active', NOW(), NOW()),
-- New rewards
('aaaa1111-1111-1111-1111-111111111111', 'Cinema Ticket', 'Ulaznica za bioskop - bilo koji film', 8, 100, 'https://i.ibb.co/JWJDqwhH/image.png', 'active', NOW(), NOW()),
('bbbb2222-2222-2222-2222-222222222222', 'Gym Day Pass', 'Dnevna karta za fitnes centar', 12, 50, 'https://i.ibb.co/YFfbQMXs/image.png', 'active', NOW(), NOW()),
('cccc3333-3333-3333-3333-333333333333', 'Spotify Premium 1 Month', 'Mesec dana Spotify Premium', 25, 20, 'https://i.ibb.co/b5NZ7wrr/image.png', 'active', NOW(), NOW()),
('dddd4444-4444-4444-4444-444444444444', 'Restaurant Voucher 1000 RSD', 'Vaucer za restoran u vrednosti 1000 dinara', 35, 25, 'https://i.ibb.co/hFp4TPHV/image.png', 'active', NOW(), NOW()),
('eeee5555-5555-5555-5555-555555555555', 'Wireless Earbuds', 'Bezicne slusalice visokog kvaliteta', 85, 10, 'https://i.ibb.co/YBJGdxpk/image.png', 'active', NOW(), NOW()),
('ffff6666-6666-6666-6666-666666666666', 'Weekend Spa Package', 'Vikend wellness paket za dvoje', 150, 5, 'https://i.ibb.co/4ZDvxh76/image.png', 'active', NOW(), NOW()),
('a7a77777-7777-7777-7777-777777777777', 'E-Book Reader', 'Kindle Paperwhite e-citac', 120, 8, 'https://i.ibb.co/BVNc6g2s/image.png', 'active', NOW(), NOW());

-- =============================================
-- PRODUCTS (mix of approved and pending)
-- =============================================
INSERT INTO products (id, name, "pointValue", "isApproved", status, "shopId", "createdAt", "updatedAt") VALUES
-- Maxi products
('e6dd27ae-30f0-40f3-bd34-ed45580be520', 'Coca-Cola 0,5l', 1, true, 'available', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
('9a653607-4ed4-47b7-b999-41c8e1235abb', 'Pepsi Strawberry Cream 0,33l', 2, true, 'available', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
('71b44696-65c6-4f4b-a9dd-39e04cff6502', 'Tortilja Grcka Premia 170g', 1, true, 'available', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
('b992ee45-63a7-4bad-936f-5189ac81ea0e', 'Cigarete Terea Oasis pearl', 3, true, 'available', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
('1e37f25e-e1e9-4fd6-a0f3-32ba0e327219', 'Cig.Ter.Turquoise s50', 3, true, 'available', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
('cd35d557-9d9d-4e1f-90ff-819eb4ca26b3', 'Min.voda NG Rosa Sport 0.75l', 2, true, 'available', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
('adc5eb84-962f-4ee7-a9db-a8a55961755d', 'Cockta Blondie 1,5l', 1, true, 'available', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
('42569e0f-65b9-4a76-a9e9-bc6db53fcc1a', 'Cockta free 0,5l', 1, true, 'available', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
('33581d93-e9fb-4510-9737-d6eab798d4b4', 'Tortilja Crispy piletina 260g', 2, true, 'available', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
('b185d9c9-b6d1-4abf-8537-43c42d18c262', 'Tost sendvic p.prsa 150g Premia', 2, true, 'available', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
-- Pending products at Maxi
('4bfe2e84-4b39-40c7-bd87-29184bff0c66', 'Keks Noblice kakao 350g', 0, false, 'unavailable', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
('88326725-4125-4d08-96c2-4bbdb9938999', 'Ledeni caj sum.voce Jana 1.5l', 0, false, 'unavailable', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
('3ca5acb8-704e-4d16-a1c0-78fe7e7eff95', 'Kesa sa ruckom visekratna Maxi', 0, false, 'unavailable', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW(), NOW()),
-- Bomax products
('004555ab-1a8c-4fdd-9270-509faec8ca40', 'Lak za camce Adria -Irkom 3L', 4, true, 'available', '226d3c1d-09d5-4016-af44-5f47e6239b24', NOW(), NOW()),
('40acc343-9446-4a3d-a857-baadd6cd5b97', 'Stub za panel Pvc plastificirani 1.5m', 2, true, 'available', '226d3c1d-09d5-4016-af44-5f47e6239b24', NOW(), NOW()),
('b571561e-d7c5-4522-a18a-c5064363a26f', 'Panel Pvc plastificirani 1.23x2.5m', 2, true, 'available', '226d3c1d-09d5-4016-af44-5f47e6239b24', NOW(), NOW()),
-- HITRA products
('f5747e19-97b5-46ac-bd41-4c1df5bb4cfa', 'CRISTAL CHERRY ICE', 2, true, 'available', '9efbe933-3d02-44e9-846c-42b49c332036', NOW(), NOW()),
('1d9d4c91-ad12-4fae-9898-b2bf619dc99e', 'MARLBORO FINE TOUCH', 1, true, 'available', '9efbe933-3d02-44e9-846c-42b49c332036', NOW(), NOW()),
('1e543bce-ce7d-4a8d-b039-4720da673e81', 'GUARANA 0,25', 1, true, 'available', '9efbe933-3d02-44e9-846c-42b49c332036', NOW(), NOW()),
-- MAYUR products
('7395f919-9efa-4cdd-85c2-272f1bf07711', 'Henkel Ceresit CE 40 01 bela 2/1', 3, true, 'available', '1c3f738c-b938-49e3-ba46-51789c5d6e5a', NOW(), NOW()),
('15e97f70-2462-4334-8c45-5250068eec8a', 'Henkel Ceresit CE 40 04 04 srebr', 0, false, 'unavailable', '1c3f738c-b938-49e3-ba46-51789c5d6e5a', NOW(), NOW()),
('61303d41-5b3d-4272-983c-5334ad6874f0', 'Henkel Ceresit CM 11 plus 25/1', 0, false, 'unavailable', '1c3f738c-b938-49e3-ba46-51789c5d6e5a', NOW(), NOW()),
-- Madame Coco products
('56e35f05-6d3c-4634-a25e-be5f5f2a5527', '1KHALI1905: TEPIH', 5, true, 'available', '613f7381-3b51-45ae-a3b2-7e657549c78e', NOW(), NOW()),
-- New Idea products
('b1111111-1111-1111-1111-111111111111', 'Mleko Imlek 1L', 1, true, 'available', '11111111-1111-1111-1111-111111111111', NOW(), NOW()),
('b2222222-2222-2222-2222-222222222222', 'Jogurt Balans+ 1kg', 2, true, 'available', '11111111-1111-1111-1111-111111111111', NOW(), NOW()),
('b3333333-3333-3333-3333-333333333333', 'Hleb Integral 500g', 1, true, 'available', '11111111-1111-1111-1111-111111111111', NOW(), NOW()),
('b4444444-4444-4444-4444-444444444444', 'Jaja M 10 kom', 2, true, 'available', '11111111-1111-1111-1111-111111111111', NOW(), NOW()),
-- Lidl products
('b5555555-5555-5555-5555-555555555555', 'Piletina file 1kg', 3, true, 'available', '22222222-2222-2222-2222-222222222222', NOW(), NOW()),
('b6666666-6666-6666-6666-666666666666', 'Cokolada Fin Carre 100g', 1, true, 'available', '22222222-2222-2222-2222-222222222222', NOW(), NOW()),
('b7777777-7777-7777-7777-777777777777', 'Banana 1kg', 1, true, 'available', '22222222-2222-2222-2222-222222222222', NOW(), NOW()),
-- DM products
('b8888888-8888-8888-8888-888888888888', 'Nivea krema 75ml', 2, true, 'available', '33333333-3333-3333-3333-333333333333', NOW(), NOW()),
('b9999999-9999-9999-9999-999999999999', 'Oral-B cetkica', 3, true, 'available', '33333333-3333-3333-3333-333333333333', NOW(), NOW()),
('baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Pampers pelene 50kom', 5, true, 'available', '33333333-3333-3333-3333-333333333333', NOW(), NOW()),
-- Pending products at various stores
('dbbbbbb0-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Novi proizvod za odobrenje 1', 0, false, 'unavailable', '44444444-4444-4444-4444-444444444444', NOW(), NOW()),
('dcccccc0-cccc-cccc-cccc-cccccccccccc', 'Novi proizvod za odobrenje 2', 0, false, 'unavailable', '55555555-5555-5555-5555-555555555555', NOW(), NOW()),
('ddddddd0-dddd-dddd-dddd-dddddddddddd', 'Novi proizvod za odobrenje 3', 0, false, 'unavailable', '66666666-6666-6666-6666-666666666666', NOW(), NOW());

-- =============================================
-- TRANSACTIONS
-- =============================================
INSERT INTO transactions (id, "userId", "shopId", date, points, "receiptId", "createdAt") VALUES
-- Demo user transactions
('c1111111-1111-1111-1111-111111111111', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW() - INTERVAL '30 days', 15, 'DEMO-REC-001', NOW() - INTERVAL '30 days'),
('c2222222-2222-2222-2222-222222222222', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '25 days', 8, 'DEMO-REC-002', NOW() - INTERVAL '25 days'),
('c3333333-3333-3333-3333-333333333333', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '20 days', 12, 'DEMO-REC-003', NOW() - INTERVAL '20 days'),
('c4444444-4444-4444-4444-444444444444', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '33333333-3333-3333-3333-333333333333', NOW() - INTERVAL '15 days', 10, 'DEMO-REC-004', NOW() - INTERVAL '15 days'),
('c5555555-5555-5555-5555-555555555555', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '226d3c1d-09d5-4016-af44-5f47e6239b24', NOW() - INTERVAL '10 days', 18, 'DEMO-REC-005', NOW() - INTERVAL '10 days'),
('c6666666-6666-6666-6666-666666666666', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '9efbe933-3d02-44e9-846c-42b49c332036', NOW() - INTERVAL '5 days', 6, 'DEMO-REC-006', NOW() - INTERVAL '5 days'),
-- Admin transactions
('c7777777-7777-7777-7777-777777777777', '0600aa5a-8c5b-4ab3-9557-76c326692c0b', '9c13aa92-abd5-4866-ba77-5c003a1196e5', NOW() - INTERVAL '28 days', 20, 'ADMIN-REC-001', NOW() - INTERVAL '28 days'),
('c8888888-8888-8888-8888-888888888888', '0600aa5a-8c5b-4ab3-9557-76c326692c0b', '226d3c1d-09d5-4016-af44-5f47e6239b24', NOW() - INTERVAL '14 days', 25, 'ADMIN-REC-002', NOW() - INTERVAL '14 days'),
-- Other users transactions
('c9999999-9999-9999-9999-999999999999', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '22 days', 14, 'USER1-REC-001', NOW() - INTERVAL '22 days'),
('caaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '18 days', 9, 'USER2-REC-001', NOW() - INTERVAL '18 days'),
('cbbbbbb0-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', '33333333-3333-3333-3333-333333333333', NOW() - INTERVAL '12 days', 16, 'USER3-REC-001', NOW() - INTERVAL '12 days'),
('ccccccc0-cccc-cccc-cccc-cccccccccccc', 'e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b', '88888888-8888-8888-8888-888888888888', NOW() - INTERVAL '8 days', 22, 'USER4-REC-001', NOW() - INTERVAL '8 days'),
('cddddddd-dddd-dddd-dddd-dddddddddddd', 'e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b', '77777777-7777-7777-7777-777777777777', NOW() - INTERVAL '3 days', 11, 'USER4-REC-002', NOW() - INTERVAL '3 days');

-- =============================================
-- TRANSACTION PRODUCTS
-- =============================================
INSERT INTO transaction_products ("transactionId", "productId", quantity, "pointsAwarded", "pointsValue", "createdAt") VALUES
-- Demo user transaction products
('c1111111-1111-1111-1111-111111111111', 'e6dd27ae-30f0-40f3-bd34-ed45580be520', 3, true, 3, NOW()),
('c1111111-1111-1111-1111-111111111111', '9a653607-4ed4-47b7-b999-41c8e1235abb', 2, true, 4, NOW()),
('c1111111-1111-1111-1111-111111111111', 'b992ee45-63a7-4bad-936f-5189ac81ea0e', 2, true, 6, NOW()),
('c1111111-1111-1111-1111-111111111111', '71b44696-65c6-4f4b-a9dd-39e04cff6502', 2, true, 2, NOW()),
('c2222222-2222-2222-2222-222222222222', 'b1111111-1111-1111-1111-111111111111', 2, true, 2, NOW()),
('c2222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', 2, true, 4, NOW()),
('c2222222-2222-2222-2222-222222222222', 'b4444444-4444-4444-4444-444444444444', 1, true, 2, NOW()),
('c3333333-3333-3333-3333-333333333333', 'b5555555-5555-5555-5555-555555555555', 2, true, 6, NOW()),
('c3333333-3333-3333-3333-333333333333', 'b6666666-6666-6666-6666-666666666666', 4, true, 4, NOW()),
('c3333333-3333-3333-3333-333333333333', 'b7777777-7777-7777-7777-777777777777', 2, true, 2, NOW()),
('c4444444-4444-4444-4444-444444444444', 'b8888888-8888-8888-8888-888888888888', 2, true, 4, NOW()),
('c4444444-4444-4444-4444-444444444444', 'b9999999-9999-9999-9999-999999999999', 2, true, 6, NOW()),
('c5555555-5555-5555-5555-555555555555', '004555ab-1a8c-4fdd-9270-509faec8ca40', 2, true, 8, NOW()),
('c5555555-5555-5555-5555-555555555555', '40acc343-9446-4a3d-a857-baadd6cd5b97', 3, true, 6, NOW()),
('c5555555-5555-5555-5555-555555555555', 'b571561e-d7c5-4522-a18a-c5064363a26f', 2, true, 4, NOW()),
('c6666666-6666-6666-6666-666666666666', 'f5747e19-97b5-46ac-bd41-4c1df5bb4cfa', 2, true, 4, NOW()),
('c6666666-6666-6666-6666-666666666666', '1e543bce-ce7d-4a8d-b039-4720da673e81', 2, true, 2, NOW()),
-- Admin transaction products
('c7777777-7777-7777-7777-777777777777', 'e6dd27ae-30f0-40f3-bd34-ed45580be520', 5, true, 5, NOW()),
('c7777777-7777-7777-7777-777777777777', 'cd35d557-9d9d-4e1f-90ff-819eb4ca26b3', 5, true, 10, NOW()),
('c7777777-7777-7777-7777-777777777777', 'adc5eb84-962f-4ee7-a9db-a8a55961755d', 5, true, 5, NOW()),
('c8888888-8888-8888-8888-888888888888', '004555ab-1a8c-4fdd-9270-509faec8ca40', 3, true, 12, NOW()),
('c8888888-8888-8888-8888-888888888888', 'b571561e-d7c5-4522-a18a-c5064363a26f', 5, true, 10, NOW());

-- =============================================
-- REDEMPTIONS
-- =============================================
INSERT INTO redemptions (id, "userId", "rewardId", "pointsSpent", status, "createdAt") VALUES
-- Demo user redemptions
('e1111111-1111-1111-1111-111111111111', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '9282b6f1-3f31-4908-81d0-423fff5e63ec', 2, 'completed', NOW() - INTERVAL '20 days'),
('e2222222-2222-2222-2222-222222222222', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '2fba7fd5-f3e1-4865-b70b-c05c7680f4af', 5, 'completed', NOW() - INTERVAL '15 days'),
('e3333333-3333-3333-3333-333333333333', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa', 'aaaa1111-1111-1111-1111-111111111111', 8, 'pending', NOW() - INTERVAL '5 days'),
-- Admin redemptions
('e4444444-4444-4444-4444-444444444444', '0600aa5a-8c5b-4ab3-9557-76c326692c0b', '9282b6f1-3f31-4908-81d0-423fff5e63ec', 2, 'completed', NOW() - INTERVAL '25 days'),
('e5555555-5555-5555-5555-555555555555', '0600aa5a-8c5b-4ab3-9557-76c326692c0b', 'bbbb2222-2222-2222-2222-222222222222', 12, 'completed', NOW() - INTERVAL '10 days'),
-- Other user redemptions
('e6666666-6666-6666-6666-666666666666', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '2fba7fd5-f3e1-4865-b70b-c05c7680f4af', 5, 'completed', NOW() - INTERVAL '18 days'),
('e7777777-7777-7777-7777-777777777777', 'e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b', 'cccc3333-3333-3333-3333-333333333333', 25, 'pending', NOW() - INTERVAL '2 days'),
('e8888888-8888-8888-8888-888888888888', 'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'dddd4444-4444-4444-4444-444444444444', 35, 'cancelled', NOW() - INTERVAL '12 days');

-- =============================================
-- USER FAVORITE SHOPS
-- =============================================
INSERT INTO user_favorite_shops ("userId", "shopId") VALUES
('2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '9c13aa92-abd5-4866-ba77-5c003a1196e5'),
('2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '11111111-1111-1111-1111-111111111111'),
('2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '22222222-2222-2222-2222-222222222222'),
('0600aa5a-8c5b-4ab3-9557-76c326692c0b', '226d3c1d-09d5-4016-af44-5f47e6239b24'),
('0600aa5a-8c5b-4ab3-9557-76c326692c0b', '33333333-3333-3333-3333-333333333333'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '11111111-1111-1111-1111-111111111111'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '88888888-8888-8888-8888-888888888888'),
('e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b', '77777777-7777-7777-7777-777777777777'),
('e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b', '88888888-8888-8888-8888-888888888888');

-- =============================================
-- FAMILY MEMBERS
-- =============================================
INSERT INTO family_members ("userId", "familyMemberId") VALUES
('2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '0600aa5a-8c5b-4ab3-9557-76c326692c0b'),
('0600aa5a-8c5b-4ab3-9557-76c326692c0b', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e'),
('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d');

-- =============================================
-- PRODUCT APPROVAL REQUESTS
-- =============================================
INSERT INTO product_approval_requests (id, "userId", "productId", "isRewarded", "createdAt") VALUES
-- Pending approval requests
('da011111-1111-1111-1111-111111111111', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa', '4bfe2e84-4b39-40c7-bd87-29184bff0c66', false, NOW() - INTERVAL '5 days'),
('da022222-2222-2222-2222-222222222222', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '88326725-4125-4d08-96c2-4bbdb9938999', false, NOW() - INTERVAL '3 days'),
('da033333-3333-3333-3333-333333333333', 'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'dbbbbbb0-bbbb-bbbb-bbbb-bbbbbbbbbbbb', false, NOW() - INTERVAL '2 days'),
('da044444-4444-4444-4444-444444444444', 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'dcccccc0-cccc-cccc-cccc-cccccccccccc', false, NOW() - INTERVAL '1 day'),
-- Rewarded approval requests (for approved products)
('da055555-5555-5555-5555-555555555555', '2721d7a2-b4f4-4854-9073-f0a1d403d2aa', 'e6dd27ae-30f0-40f3-bd34-ed45580be520', true, NOW() - INTERVAL '30 days'),
('da066666-6666-6666-6666-666666666666', '0600aa5a-8c5b-4ab3-9557-76c326692c0b', '9a653607-4ed4-47b7-b999-41c8e1235abb', true, NOW() - INTERVAL '28 days');

-- Done!
SELECT 'Seed completed successfully!' as status;
SELECT 'Demo User: user@demo.com / userdemo (500 points)' as info;
SELECT 'Admin User: admin@demo.com / userdemo (150 points)' as info;
