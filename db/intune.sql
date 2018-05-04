
DROP DATABASE IF EXISTS intune;
CREATE DATABASE intune;
\c intune;
Drop TABLE Users
CASCADE;
CREATE TABLE Users
(
    id SERIAL UNIQUE,
    first_name VARCHAR,
    last_name VARCHAR,
    photo_url VARCHAR,
    password_digest VARCHAR NOT NULL,
    username VARCHAR UNIQUE,
    PRIMARY KEY (id)
);
INSERT INTO Users
    (first_name, last_name, photo_url, password_digest, username)
VALUES
    ('Helen', 'Cho', 'https://i.imgur.com/ePbPHIY.png', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'elixirality@gmail.com'),
    ('David', 'Shin', 'https://i.imgur.com/XsVmYKK.png', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'evadshin@gmail.com');