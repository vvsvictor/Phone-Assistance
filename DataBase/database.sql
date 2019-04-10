CREATE DATABASE phoneA;
use phoneA;
CREATE TABLE USERS(
  id int not null auto_increment,
  username varchar(255) unique,
  password char(64),
  usertype int,
  primary key(id),
  FOREIGN key (usertype) REFERENCES TYPE_USER(id)
);

CREATE TABLE TYPE_USER(
  id int not null,
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
  dninif varchar(50) unique,
  province varchar(255),
  comarca varchar(255),
  municipality varchar(255),
  address varchar(255),
  ownership varchar(255),
  phone varchar(50),
  mobile_phone varchar(50),
  work_phone varchar(50),
  primary key(id)
);

CREATE TABLE CAP(
  id int not null auto_increment,
  name varchar(255),
  address varchar(255),
  phone int,
  address varchar(255),
  primary key(id)
);

CREATE TABLE DOCTORS(
  id int not null auto_increment,
  name varchar(255),
  surname varchar(255),
  gender varchar(10),
  specialization varchar(255),
  id_cap int not null,
  primary key(id),
  FOREIGN key (id_cap) REFERENCES CAP(id)
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
  tf_service bit,
  tcr_service bit,
  cc_service bit,
  tm_service bit,
  tam_service bit,
  gps_service bit,
  umt_service bit,
  primary key (id)
);

CREATE TABLE RESPONSIBLE(
  id int not null auto_increment,
  user_vinculation_id int not null,
  user_dninif not null varchar(255),
  priority int not null,
  name varchar(255),
  surname varchar(255),
  address varchar(255),
  post_code varchar(8),
  contact_phone varchar(20),
  preferable_hour varchar(255),
  date_responsible date,
  reason varchar(max),
  primary key (id),
  FOREIGN key (user_vinculation_id) REFERENCES PERSONAL_CARD(id)
);

CREATE TABLE CALL_HISTORY(
  id int not null auto_increment,
  call_date date not null,
  call_type varchar(100),
  outcall_type varchar(100),
  incall_type varchar(100),
  state varchar(25),
  teleoperator_solution varchar(max),
  primary key(id)
);
