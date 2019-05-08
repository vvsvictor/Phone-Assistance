CREATE DATABASE phoneA;
use phoneA;

CREATE TABLE TYPE_USER(
  id int not null unique,
  name varchar(255),
  primary key(id)
);

CREATE TABLE USERS(
  id int not null auto_increment,
  username varchar(255) unique,
  password char(64),
  usertype int, /*Table TYPE_USER*/
  primary key(id),
  FOREIGN key (usertype) REFERENCES TYPE_USER(id)
);

/***********************************************/
CREATE TABLE LANGUAGES (
	id int not null auto_increment,
	language_name varchar(255) unique,
	primary key (id)
);

CREATE TABLE SIGN_LANGUAGES (
	id int not null auto_increment,
	language_name varchar(255) unique,
	primary key (id)
);

CREATE TABLE PROVINCES (
	id int not null auto_increment,
	prov_name varchar(255) unique,
	primary key (id)
);

CREATE TABLE COMARCAS (
	id int not null auto_increment,
	comar_name varchar(255) unique,
	primary key (id)
);

CREATE TABLE MUNISIPALITYS (
	id int not null auto_increment,
	muni_name varchar(255) unique,
	primary key (id)
);

CREATE TABLE OWNERSHIPS(
	id int not null auto_increment,
	owner_type varchar(50),
	primary key (id)
);
/***********************************************/

CREATE TABLE PERSONAL_CARD(
  id int not null auto_increment,
  name varchar(255),
  surname varchar(255),
  gender varchar(255),
  language int, /*Table LANGUAGES*/
  sign_langauge int, /*Table SIGN_LANGUAGES*/
  birthdate date,
  dninie varchar(50) unique,
  province int, /*Table PROVINCES*/
  comarca int, /*Table COMARCAS*/
  municipality int, /*Table MUNISIPALITYS*/
  address varchar(255),
  type_house varchar(255),
  ownership int, /*Table OWNERSHIPS*/
  phone varchar(50),
  mobile_phone varchar(50),
  work_phone varchar(50),
  primary key(id),
  FOREIGN key (language) REFERENCES LANGUAGES(id),
  FOREIGN key (sign_langauge) REFERENCES SIGN_LANGUAGES(id),
  FOREIGN key (province) REFERENCES PROVINCES(id),
  FOREIGN key (comarca) REFERENCES COMARCAS(id),
  FOREIGN key (municipality) REFERENCES MUNISIPALITYS(id),
  FOREIGN key (ownership) REFERENCES OWNERSHIPS(id)
);

CREATE TABLE CAP(
  id int not null auto_increment,
  name varchar(255),
  address varchar(255),
  phone int,
  schedule varchar(255),
  primary key(id)
);

/*******************************************/
CREATE TABLE MED_SPECIALIZATION(
	id int not null auto_increment,
	med_specialization varchar(255) unique,
	primary key (id)
);
/*******************************************/

CREATE TABLE DOCTORS(
  id int not null auto_increment,
  name varchar(255),
  surname varchar(255),
  gender varchar(10),
  specialization_id int, /*Table MED_SPECIALIZATION*/
  id_cap int not null, /*Table CAP*/
  primary key(id),
  FOREIGN key (specialization_id) REFERENCES MED_SPECIALIZATION(id),
  FOREIGN key (id_cap) REFERENCES CAP(id)
);

CREATE TABLE HEALTH_INSURANCE(
  id int not null auto_increment,
  insurance_name varchar(255),
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
  user_dninif varchar(255) not null,
  priority varchar(50) not null,
  name varchar(255),
  surname varchar(255),
  address varchar(255),
  post_code varchar(8),
  contact_phone varchar(20),
  preferable_hour varchar(255),
  date_responsible date,
  reason text,
  primary key (id),
  FOREIGN key (user_vinculation_id) REFERENCES PERSONAL_CARD(id)
);

/*******************************************/
CREATE TABLE CALL_TYPE(
	id int not null auto_increment,
	call_type varchar(50) unique,
	primary key (id)
);

CREATE TABLE INCALL_TYPE(
	id int not null auto_increment,
	incall_type varchar(50) unique,
	primary key (id)
);

CREATE TABLE OUTCALL_TYPE(
	id int not null auto_increment,
	outcall_type varchar(50) unique,
	primary key (id)
);

CREATE TABLE CALL_STATE (
	id int not null auto_increment,
	call_type varchar(50) unique,
	primary key (id)
);
/*******************************************/

CREATE TABLE CALL_HISTORY(
  id int not null auto_increment,
  call_date date not null,
  call_type int, /*Table CALL_TYPE*/
  outcall_type int, /*Table OUTCALL_TYPE*/
  incall_type int, /*Table INCALL_TYPE*/
  call_state int, /*Table CALL_STATE*/
  teleoperator_solution text,
  primary key(id),
  FOREIGN key (call_type) REFERENCES CALL_TYPE(id),
  FOREIGN key (outcall_type) REFERENCES OUTCALL_TYPE(id),
  FOREIGN key (incall_type) REFERENCES INCALL_TYPE(id),
  FOREIGN key (call_state) REFERENCES CALL_STATE(id)
);

/*Insert type users by default*/
INSERT into type_user VALUES (0,"admin");
INSERT into type_user VALUES (1,"normal_user");

/*Insert type users by default*/
INSERT into users VALUES ("admin","bemen3",0);
INSERT into users VALUES ("normal_user","bemen3",1);

/*Insert languages by default*/
INSERT into languages VALUES ("Català");
INSERT into languages VALUES ("Castellano");
INSERT into languages VALUES ("English");
INSERT into languages VALUES ("日本語");

/*Insert sign_languages by default*/
INSERT into sign_languages VALUES ("Català");
INSERT into sign_languages VALUES ("Castellano");
INSERT into sign_languages VALUES ("English");
INSERT into sign_languages VALUES ("日本語");

/*Insert provinces by default*/
INSERT into provinces VALUES ("Barcelona");
INSERT into provinces VALUES ("Lleida");
INSERT into provinces VALUES ("Tarragona");
INSERT into provinces VALUES ("Girona");

/*Insert comarcas by default*/
INSERT into comarcas VALUES ("Alt Camp");
INSERT into comarcas VALUES ("Alt Empordà");
INSERT into comarcas VALUES ("Alt Penedès");
INSERT into comarcas VALUES ("Alt Urgell");
INSERT into comarcas VALUES ("Alta Ribagorça");
INSERT into comarcas VALUES ("Anoia");
INSERT into comarcas VALUES ("Aran");
INSERT into comarcas VALUES ("Bages");
INSERT into comarcas VALUES ("Baix Camp");
INSERT into comarcas VALUES ("Baix Ebre");
INSERT into comarcas VALUES ("Baix Empordà");
INSERT into comarcas VALUES ("Baix Llobregat");
INSERT into comarcas VALUES ("Baix Penedès");
INSERT into comarcas VALUES ("Barcelonès");
INSERT into comarcas VALUES ("Berguedà");
INSERT into comarcas VALUES ("Cerdanya");
INSERT into comarcas VALUES ("Conca de Barberà");
INSERT into comarcas VALUES ("Garraf");
INSERT into comarcas VALUES ("Garrigues");
INSERT into comarcas VALUES ("Garrotxa");
INSERT into comarcas VALUES ("Gironès");
INSERT into comarcas VALUES ("Maresme");
INSERT into comarcas VALUES ("Moianès");
INSERT into comarcas VALUES ("Montsià");
INSERT into comarcas VALUES ("Noguera");
INSERT into comarcas VALUES ("Osona");
INSERT into comarcas VALUES ("Pallars Jussà");
INSERT into comarcas VALUES ("Pallars Sobirà");
INSERT into comarcas VALUES ("Pla d'Urgell");
INSERT into comarcas VALUES ("Pla de l'Estany");
INSERT into comarcas VALUES ("Priorat");
INSERT into comarcas VALUES ("Ribera d'Ebre");
INSERT into comarcas VALUES ("Ripollès");
INSERT into comarcas VALUES ("Segarra");
INSERT into comarcas VALUES ("Sagrià");
INSERT into comarcas VALUES ("Selva");
INSERT into comarcas VALUES ("Solsonès");
INSERT into comarcas VALUES ("Tarragonès");
INSERT into comarcas VALUES ("Terra Alta");
INSERT into comarcas VALUES ("Urgell");
INSERT into comarcas VALUES ("Vallès Occidental");
INSERT into comarcas VALUES ("Vallès Oriental");
