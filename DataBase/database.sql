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
  sign_language int, /*Table SIGN_LANGUAGES*/
  birthdate varchar(255),
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
  FOREIGN key (sign_language) REFERENCES SIGN_LANGUAGES(id),
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
  user_dninif varchar(255) not null, /*Table PERSONAL_CARD*/
  insurance_name varchar(255),
  primary key (id),
  FOREIGN key (user_dninif) REFERENCES PERSONAL_CARD(dninie)
);

CREATE TABLE STA(
  id int not null auto_increment,
  user_dninif varchar(255) not null unique, /*Table PERSONAL_CARD*/
  actual_situation varchar(50),
  hiring_date varchar(255),
  tf_service bit,
  tcr_service bit,
  cc_service bit,
  tm_service bit,
  tam_service bit,
  gps_service bit,
  umt_service bit,
  primary key (id),
  FOREIGN key (user_dninif) REFERENCES PERSONAL_CARD(dninie)
);

CREATE TABLE RESPONSIBLE(
  id int not null auto_increment,
  user_dninif varchar(255) not null, /*Table PERSONAL_CARD*/
  priority varchar(50) not null,
  name varchar(255),
  surname varchar(255),
  address varchar(255),
  post_code varchar(8),
  contact_phone varchar(20),
  preferable_hour varchar(255),
  date_responsible varchar(255),
  reason text,
  primary key (id),
  FOREIGN key (user_dninif) REFERENCES PERSONAL_CARD(dninie)
);

/*******************************************/
CREATE TABLE CALL_TYPE(
	id int not null auto_increment,
	call_type varchar(50) unique,
	primary key (id)
);

CREATE TABLE INCALL_TYPE(
	id int not null auto_increment,
	incall_type varchar(50),
  subclass varchar(50) unique,
	primary key (id)
);

CREATE TABLE OUTCALL_TYPE(
	id int not null auto_increment,
	outcall_type varchar(50),
  subclass varchar(50) unique,
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
  user_dninif varchar(255) not null, /*Table PERSONAL_CARD*/
  call_date varchar(255) not null,
  call_type int, /*Table CALL_TYPE*/
  outcall_type int, /*Table OUTCALL_TYPE*/
  incall_type int, /*Table INCALL_TYPE*/
  call_state int, /*Table CALL_STATE*/
  teleoperator_solution text,
  reason_for_advice text,
  description text,
  Destiny_advice varchar(50),
  primary key(id),
  FOREIGN key (user_dninif) REFERENCES PERSONAL_CARD(dninie),
  FOREIGN key (call_type) REFERENCES CALL_TYPE(id),
  FOREIGN key (outcall_type) REFERENCES OUTCALL_TYPE(id),
  FOREIGN key (incall_type) REFERENCES INCALL_TYPE(id),
  FOREIGN key (call_state) REFERENCES CALL_STATE(id)
);

/*Insert type users by default*/
INSERT into type_user VALUES (0,"admin");
INSERT into type_user VALUES (1,"normal_user");

/*Insert type users by default*/
INSERT into users (username,password,usertype) VALUES ("admin","bemen3",0);
INSERT into users (username,password,usertype) VALUES ("normal_user","bemen3",1);

/*Insert languages by default*/
INSERT into languages (language_name) VALUES ("Català");
INSERT into languages (language_name) VALUES ("Castellà");
INSERT into languages (language_name) VALUES ("English");

/*Insert sign_languages by default*/
INSERT INTO sign_languages (id, language_name) VALUES (1, "No");
INSERT into sign_languages (language_name) VALUES ("Català");
INSERT into sign_languages (language_name) VALUES ("Castellà");
INSERT into sign_languages (language_name) VALUES ("English");

/*Insert provinces by default*/
INSERT into provinces (prov_name) VALUES ("Barcelona");
INSERT into provinces (prov_name) VALUES ("Lleida");
INSERT into provinces (prov_name) VALUES ("Tarragona");
INSERT into provinces (prov_name) VALUES ("Girona");

/*Insert comarcas by default*/
INSERT into comarcas (comar_name) VALUES ("Alt Camp");
INSERT into comarcas (comar_name) VALUES ("Alt Empordà");
INSERT into comarcas (comar_name) VALUES ("Alt Penedès");
INSERT into comarcas (comar_name) VALUES ("Alt Urgell");
INSERT into comarcas (comar_name) VALUES ("Alta Ribagorça");
INSERT into comarcas (comar_name) VALUES ("Anoia");
INSERT into comarcas (comar_name) VALUES ("Aran");
INSERT into comarcas (comar_name) VALUES ("Bages");
INSERT into comarcas (comar_name) VALUES ("Baix Camp");
INSERT into comarcas (comar_name) VALUES ("Baix Ebre");
INSERT into comarcas (comar_name) VALUES ("Baix Empordà");
INSERT into comarcas (comar_name) VALUES ("Baix Llobregat");
INSERT into comarcas (comar_name) VALUES ("Baix Penedès");
INSERT into comarcas (comar_name) VALUES ("Barcelonès");
INSERT into comarcas (comar_name) VALUES ("Berguedà");
INSERT into comarcas (comar_name) VALUES ("Cerdanya");
INSERT into comarcas (comar_name) VALUES ("Conca de Barberà");
INSERT into comarcas (comar_name) VALUES ("Garraf");
INSERT into comarcas (comar_name) VALUES ("Garrigues");
INSERT into comarcas (comar_name) VALUES ("Garrotxa");
INSERT into comarcas (comar_name) VALUES ("Gironès");
INSERT into comarcas (comar_name) VALUES ("Maresme");
INSERT into comarcas (comar_name) VALUES ("Moianès");
INSERT into comarcas (comar_name) VALUES ("Montsià");
INSERT into comarcas (comar_name) VALUES ("Noguera");
INSERT into comarcas (comar_name) VALUES ("Osona");
INSERT into comarcas (comar_name) VALUES ("Pallars Jussà");
INSERT into comarcas (comar_name) VALUES ("Pallars Sobirà");
INSERT into comarcas (comar_name) VALUES ("Pla d'Urgell");
INSERT into comarcas (comar_name) VALUES ("Pla de l'Estany");
INSERT into comarcas (comar_name) VALUES ("Priorat");
INSERT into comarcas (comar_name) VALUES ("Ribera d'Ebre");
INSERT into comarcas (comar_name) VALUES ("Ripollès");
INSERT into comarcas (comar_name) VALUES ("Segarra");
INSERT into comarcas (comar_name) VALUES ("Sagrià");
INSERT into comarcas (comar_name) VALUES ("Selva");
INSERT into comarcas (comar_name) VALUES ("Solsonès");
INSERT into comarcas (comar_name) VALUES ("Tarragonès");
INSERT into comarcas (comar_name) VALUES ("Terra Alta");
INSERT into comarcas (comar_name) VALUES ("Urgell");
INSERT into comarcas (comar_name) VALUES ("Vallès Occidental");
INSERT into comarcas (comar_name) VALUES ("Vallès Oriental");

/*Insert type municipality type by default*/
INSERT into MUNISIPALITYS (muni_name) VALUES ("Barcelona");
INSERT into MUNISIPALITYS (muni_name) VALUES ("L'Hospitalet de Llobregat");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Badalona");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Terrassa");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Sabadell");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Mataró");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Santa Coloma de Gramenet");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Sant Cugat del Vallès");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Cornellà de Llobregat");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Sant Boi de Llobregat");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Rubí");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Manresa");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Vilanova i la Geltrú");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Viladecans");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Castelldefels");
INSERT into MUNISIPALITYS (muni_name) VALUES ("El Prat de Llobregat");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Granollers");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Cerdanyola del Vallès");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Mollet del Vallès");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Esplugues de Llobregat");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Sant Feliu de Llobregat");
INSERT into MUNISIPALITYS (muni_name) VALUES ("Sant Adrià del Besós");

/*Insert type ownership type by default*/
INSERT into OWNERSHIPS (owner_type) VALUES ("Propietari");
INSERT into OWNERSHIPS (owner_type) VALUES ("Arrendatari");

/*Insert client by default*/
INSERT into PERSONAL_CARD (name,surname,gender,language,birthdate,dninie,province,comarca,address,type_house,ownership,phone,mobile_phone) VALUES ("Jordi","Martinez Garcia","Home",2,"17-05-1992","68951118Q",1,14,"carrer fals 123","casa",2,"9345625538","622856794");

/*Insert STA for the client by default*/
INSERT into STA (user_dninif, actual_situation, hiring_date, tf_service, tcr_service, cc_service, tm_service, tam_service, gps_service, umt_service) VALUES ("68951118Q","Alta","12-09-2018",0,1,1,0,1,1,1);

/*Insert RESPONSIBLE for the client by default*/
INSERT into RESPONSIBLE (user_dninif, priority, name, surname, address, post_code, contact_phone, preferable_hour, date_responsible, reason) VALUES ("68951118Q", "Alta", "TEST", "TESTED", "calle falsa 559", "15667", "987654125", "17:10h - 21h", "22-05-2019", "porque si");

/*Insert MED_SPECIALIZATION by default*/
INSERT INTO med_specialization (med_specialization)VALUES("Oftalmologia");
INSERT INTO med_specialization (med_specialization)VALUES("Cirugia");
INSERT INTO med_specialization (med_specialization)VALUES("Ginecologia");

/*Insert CAPS by default*/
INSERT INTO cap (name, address, phone, schedule) VALUES ("Atenció continuada Consultori local Tuixent ", "CR ÚNIC, S/N 25717 JOSA I TUIXÉN ", 973370039, "De dl. a dv., de 15 a 8h i ds., dg. i festius, 24h. ");
INSERT INTO cap (name, address, phone, schedule) VALUES ("Atenció continuada CAP La Seu d'Urgell ", "PS JOAN BRUDIEU, 8 25700 LA SEU D'URGELL ", 973350470, "De dl. a dv., de 20 a 8h i ds., dg. i festius, 24h. ");
INSERT INTO cap (name, address, phone, schedule) VALUES ("Atenció continuada CAP Oliana ", "CR GIRONA, 8 25790 OLIANA ", 973463022, "De dl. a dv., de 20 a 8h i ds., dg. i festius, 24h. ");
INSERT INTO cap (name, address, phone, schedule) VALUES ("Atenció continuada CAP El Pont de Suert ", "CR CANALETA, S/N 25520 EL PONT DE SUERT ", 973691159, "De dl. a dv., de 20 a 8h i ds., dg. i festius, 24h. ");
INSERT INTO cap (name, address, phone, schedule) VALUES ("Atenció continuada CAP Bellver de Cerdanya ", "AV PERE SICART, 1 25720 BELLVER DE CERDANYA ", 973510315, "De dl. a dv., de 15 a 8h i ds., dg. i festius, 24h. ");

/*Insert DOCTORS by default*/
INSERT INTO doctors (name,surname,gender,specialization_id,id_cap)VALUES("Marc","Cardona","Home",1,1);
INSERT INTO doctors (name,surname,gender,specialization_id,id_cap)VALUES("Maria","Marturina","Dona",3,1);
INSERT INTO doctors (name,surname,gender,specialization_id,id_cap)VALUES("David","Laruna","Home",2,1);

/*Insert type call_history type by default*/
insert into call_state (call_type) values ("Acabada");
insert into call_type (call_type)values ("Entrant");
insert into call_type (call_type)values ("Sortint");
insert into incall_type (incall_type, subclass) values ("Trucada d’alarma","Emergències sanitàries");
insert into incall_type (incall_type, subclass) values ("Trucada d’alarma","Emergències socials");
insert into incall_type (incall_type, subclass) values ("Trucada d’alarma","Emergències per crisi de soledat o angoixa");
insert into incall_type (incall_type, subclass) values ("Trucada d’alarma","Alarma sense resposta");
insert into incall_type (incall_type, subclass) values ("Trucada d’informació", "Trucada per error");
insert into incall_type (incall_type, subclass) values ("Trucada d’informació", "Modificació de dades");
insert into incall_type (incall_type, subclass) values ("Trucada d'informació", "Absències o estades temporals");
insert into incall_type (incall_type) values ("Trucada d'assessorament");
insert into outcall_type (outcall_type) values ("Trucada d’agenda");
insert into outcall_type (outcall_type) values ("Trucada de seguiment");
insert into outcall_type (outcall_type) values ("Trucada d’agenda preventiva");
insert into call_history (user_dninif,call_date,call_type,outcall_type,incall_type,call_state,teleoperator_solution) values ("68951118Q", "2019-10-25", 1, 1, 1, 1, "morir");
