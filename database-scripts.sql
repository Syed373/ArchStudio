CREATE DATABASE client_management;
USE client_management;

CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(255),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE meetings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    number_of_people INT NOT NULL,
    start_time DATETIME NOT NULL,
    client_id INT,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);