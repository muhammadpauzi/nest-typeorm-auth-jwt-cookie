-- Active: 1735479244248@@127.0.0.1@5432@gogotes@public
INSERT INTO organizations (id, name) VALUES
(1,'Organization One'),
(2,'Organization Two'),
(3,'Organization Three'),
(4,'Organization Four'),
(5,'Organization Five');

INSERT INTO users (name, username, password, role, organization_id) VALUES
('Admin One', 'adminone', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'admin', 2),
('Participant Two', 'participanttwo', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'participant', 2),
('Participant Three', 'participantthree', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'participant', 2),
('Participant Four', 'participantfour', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'participant', 2),
('Admin Two', 'admintwo', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'admin', 3),
('Participant Five', 'participantfive', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'participant', 3),
('Participant Six', 'participantsix', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'participant', 3);

DELETE FROM users;
DELETE FROM organizations;
DELETE FROM migrations;

DROP TABLE users;
DROP TABLE organizations;

SELECT * FROM organizations;
SELECT * FROM users;

INSERT INTO users (name, username, password, role, organization_id) VALUES
('Superadmin', 'superadmin', '$2b$10$rma9NhbNyijqdveWXQk7T.HBoDYxJTvV5AxTT64RsMvqROlBGcxtm', 'superadmin', NULL);


SELECT * FROM organizations;