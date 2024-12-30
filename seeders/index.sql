-- Active: 1735479244248@@127.0.0.1@5432@gogotes@public
INSERT INTO organizations (name, slug) VALUES
('Organization One', 'organization-one'),
('Organization Two', 'organization-two'),
('Organization Three', 'organization-three'),
('Organization Four', 'organization-four'),
('Organization Five', 'organization-five');

INSERT INTO users (name, username, password, role, organization_id) VALUES
('Admin One', 'adminone', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'admin', (SELECT id FROM organizations WHERE slug = 'organization-one')),
('Participant Two', 'participanttwo', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'participant', (SELECT id FROM organizations WHERE slug = 'organization-one')),
('Participant Three', 'participantthree', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'participant', (SELECT id FROM organizations WHERE slug = 'organization-one')),
('Participant Four', 'participantfour', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'participant', (SELECT id FROM organizations WHERE slug = 'organization-one')),
('Admin Two', 'admintwo', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'admin', (SELECT id FROM organizations WHERE slug = 'organization-two')),
('Participant Five', 'participantfive', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'participant', (SELECT id FROM organizations WHERE slug = 'organization-two')),
('Participant Six', 'participantsix', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'participant', (SELECT id FROM organizations WHERE slug = 'organization-two'));

DELETE FROM users;
DELETE FROM organizations;

SELECT * FROM organizations;
SELECT * FROM users;
