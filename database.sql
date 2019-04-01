CREATE DATABASE database;

CREATE TABLE USERS(
  id int not null auto_increment,
  username varchar(255) unique,
  password char(64),
  usertype int,
  primary key(id)
);

CREATE TABLE TYPE_USER(
  id int not null auto_increment,
  name varchar(255),
  primary key(id)
);

CREATE TABLE PERSONAL_CARD(
  id int not null auto_increment,
  name varchar(255),
  surname varchar(255),
  gender varchar(255),
  language varchar(255),
  birthdate date,
  dni varchar(50),
  province varchar(255),
  comarca varchar(255),
  municipality varchar(255),
  adress int not null,
  ownership varchar(255),
  telephone varchar(50),
  phone varchar(50),
  work_phone varchar(50),
  id_user int not null,
  primary key(id),
  FOREIGN key (id_user) REFERENCES users(id)
);

CREATE TABLE HEALTH_INSURANCE(
  id int not null auto_increment
)
