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

CREATE TABLE CAP(
  id int not null auto_increment,
  name varchar(255),
  gender_doctor varchar(10),
  doctor_name varchar(255),
  health_insurance_id int,
  primary key(id),
  FOREIGN key (health_insurance_id) REFERENCES HEALTH_INSURANCE(id)
);

CREATE TABLE HEALTH_INSURANCE(
  id int not null auto_increment,
  insurance_name varchar(255),
  description varchar(255),
  primary key (id)
);

CREATE TABLE STA(
  id int not null auto_increment,
  actual_situation varchar(50),
  hiring_date date,
  contracted_services varchar(255),
  primary key (id)
  );

CREATE TABLE RESPONSIBLE(
  id int not null auto_increment,
  user_vinculation_id int not null,
  name_surname varchar(255),
  post_code varchar(8),
  contact_phone varchar(20),
  preferable_hour varchar(255),
  date_responsible date,
  reason varchar(255),
  primary key (id),
  FOREIGN key (user_vinculation_id) REFERENCES PERSONAL_CARD(id)
);

CREATE TABLE CALL_HISTORY(
  id int not null auto_increment,
  call_date date not null,
  call_type varchar(100),
  outcall_type varchar(100),
  incall_type varchar(100),
  teleoperator_solution varchar(255),
  primary key(id)
);
