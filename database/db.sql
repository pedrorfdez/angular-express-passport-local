CREATE DATABASE ng_users;

USE ng_users;

CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL
);

DESCRIBE users;