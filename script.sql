create database inha_hospital;
use inha_hospital;

create table admin
(
    admin_id varchar(255) not null
        primary key,
    name     varchar(255) not null,
    password varchar(255) not null
);

create table medical_department
(
    department_id           varchar(255) not null
        primary key,
    department_name         varchar(255) not null,
    department_phone_number varchar(255) not null
);

create table doctor
(
    doctor_id     varchar(255) not null
        primary key,
    name          varchar(255) not null,
    address       varchar(255) not null,
    phone_number  varchar(255) not null,
    password      varchar(255) not null,
    department_id varchar(255) not null,
    constraint doctor_department
        foreign key (department_id) references medical_department (department_id)
);

create table nurse
(
    nurse_id      varchar(255) not null
        primary key,
    name          varchar(255) not null,
    address       varchar(255) not null,
    phone_number  varchar(255) not null,
    password      varchar(255) not null,
    department_id varchar(255) not null,
    constraint nurse_department
        foreign key (department_id) references medical_department (department_id)
);

create table patient
(
    patient_id   varchar(255) not null
        primary key,
    name         varchar(255) not null,
    ssn          varchar(255) not null,
    gender       varchar(8)   not null,
    address      varchar(255) not null,
    blood_type   varchar(255) not null,
    height       double       not null,
    weight       double       not null,
    phone_number varchar(255) not null,
    password     varchar(255) not null,
    nurse_id     varchar(255) not null,
    doctor_id    varchar(255) not null,
    constraint patient_doctor
        foreign key (doctor_id) references doctor (doctor_id),
    constraint patient_nurse
        foreign key (nurse_id) references nurse (nurse_id)
);

create table examination
(
    examination_id       bigint auto_increment
        primary key,
    examination_datetime datetime     not null,
    examination_details  varchar(255) null,
    doctor_id            varchar(255) null,
    patient_id           varchar(255) null,
    constraint examination_doctor
        foreign key (doctor_id) references doctor (doctor_id),
    constraint examination_patient
        foreign key (patient_id) references patient (patient_id)
);

create table inpatient
(
    inpatient_id       bigint auto_increment
        primary key,
    room_information   varchar(255) not null,
    admission_datetime varchar(255) not null,
    discharge_datetime varchar(255) not null,
    patient_id         varchar(255) not null,
    constraint inpatient_patient
        foreign key (patient_id) references patient (patient_id)
);

create table reservation
(
    reservation_number   bigint auto_increment
        primary key,
    reservation_datetime datetime     not null,
    patient_id           varchar(255) not null,
    department_id        varchar(255) not null,
    constraint reservation_department
        foreign key (department_id) references medical_department (department_id),
    constraint reservation_patient
        foreign key (patient_id) references patient (patient_id)
);

create table treatment
(
    treatment_id       bigint auto_increment
        primary key,
    treatment_datetime datetime     not null,
    treatment_details  varchar(255) null,
    nurse_id           varchar(255) not null,
    patient_id         varchar(255) not null,
    constraint treatment_nurse
        foreign key (nurse_id) references nurse (nurse_id),
    constraint treatment_patient
        foreign key (patient_id) references patient (patient_id)
);

INSERT INTO inha_hospital.admin (admin_id, name, password) VALUES ('admin1', '관리자1', 'password1');

INSERT INTO inha_hospital.medical_department (department_id, department_name, department_phone_number) VALUES ('department1', '부서1', '02-1111-1111');
INSERT INTO inha_hospital.medical_department (department_id, department_name, department_phone_number) VALUES ('department2', '부서2', '02-2222-2222');
INSERT INTO inha_hospital.medical_department (department_id, department_name, department_phone_number) VALUES ('department3', '부서3', '02-3333-3333');

INSERT INTO inha_hospital.doctor (doctor_id, name, address, phone_number, password, department_id) VALUES ('doctor1', '의사1', 'address1', '010-1111-1111', 'password1', 'department1');
INSERT INTO inha_hospital.doctor (doctor_id, name, address, phone_number, password, department_id) VALUES ('doctor2', '의사2', 'address2', '010-2222-2222', 'password2', 'department1');
INSERT INTO inha_hospital.doctor (doctor_id, name, address, phone_number, password, department_id) VALUES ('doctor3', '의사3', 'address3', '010-3333-3333', 'password3', 'department1');
INSERT INTO inha_hospital.doctor (doctor_id, name, address, phone_number, password, department_id) VALUES ('doctor4', '의사4', 'address4', '010-4444-4444', 'password4', 'department2');
INSERT INTO inha_hospital.doctor (doctor_id, name, address, phone_number, password, department_id) VALUES ('doctor5', '의사5', 'address5', '010-5555-5555', 'password5', 'department2');
INSERT INTO inha_hospital.doctor (doctor_id, name, address, phone_number, password, department_id) VALUES ('doctor6', '의사6', 'address6', '010-6666-6666', 'password6', 'department2');
INSERT INTO inha_hospital.doctor (doctor_id, name, address, phone_number, password, department_id) VALUES ('doctor7', '의사7', 'address7', '010-7777-7777', 'password7', 'department3');
INSERT INTO inha_hospital.doctor (doctor_id, name, address, phone_number, password, department_id) VALUES ('doctor8', '의사8', 'address8', '010-8888-8888', 'password8', 'department3');
INSERT INTO inha_hospital.doctor (doctor_id, name, address, phone_number, password, department_id) VALUES ('doctor9', '의사9', 'address9', '010-9999-9999', 'password9', 'department3');

INSERT INTO inha_hospital.nurse (nurse_id, name, address, phone_number, password, department_id) VALUES ('nurse1', '간호사1', 'address1', '010-1111-1111', 'password1', 'department1');
INSERT INTO inha_hospital.nurse (nurse_id, name, address, phone_number, password, department_id) VALUES ('nurse2', '간호사2', 'address2', '010-2222-2222', 'password2', 'department1');
INSERT INTO inha_hospital.nurse (nurse_id, name, address, phone_number, password, department_id) VALUES ('nurse3', '간호사3', 'address3', '010-3333-3333', 'password3', 'department1');
INSERT INTO inha_hospital.nurse (nurse_id, name, address, phone_number, password, department_id) VALUES ('nurse4', '간호사4', 'address4', '010-4444-4444', 'password4', 'department2');
INSERT INTO inha_hospital.nurse (nurse_id, name, address, phone_number, password, department_id) VALUES ('nurse5', '간호사5', 'address5', '010-5555-5555', 'password5', 'department2');
INSERT INTO inha_hospital.nurse (nurse_id, name, address, phone_number, password, department_id) VALUES ('nurse6', '간호사6', 'address6', '010-6666-6666', 'password6', 'department2');
INSERT INTO inha_hospital.nurse (nurse_id, name, address, phone_number, password, department_id) VALUES ('nurse7', '간호사7', 'address7', '010-7777-7777', 'password7', 'department3');
INSERT INTO inha_hospital.nurse (nurse_id, name, address, phone_number, password, department_id) VALUES ('nurse8', '간호사8', 'address8', '010-8888-8888', 'password8', 'department3');
INSERT INTO inha_hospital.nurse (nurse_id, name, address, phone_number, password, department_id) VALUES ('nurse9', '간호사9', 'address9', '010-9999-9999', 'password9', 'department3');

INSERT INTO inha_hospital.patient (patient_id, name, ssn, gender, address, blood_type, height, weight, phone_number, password, nurse_id, doctor_id) VALUES ('patient1', 'Winnie Macdonald', '792575-4852837', 'MALE', 'Address1', 'B', 161.50319648690376, 62.12515035546544, '010-3227-8076', 'password1', 'nurse4', 'doctor5');
INSERT INTO inha_hospital.patient (patient_id, name, ssn, gender, address, blood_type, height, weight, phone_number, password, nurse_id, doctor_id) VALUES ('patient2', 'Joan Bowers', '875804-9523636', 'MALE', 'Address2', 'AB', 170.67869799191348, 81.13005505424505, '010-4519-5207', 'password2', 'nurse7', 'doctor9');
INSERT INTO inha_hospital.patient (patient_id, name, ssn, gender, address, blood_type, height, weight, phone_number, password, nurse_id, doctor_id) VALUES ('patient3', 'Eusebio Huber', '876943-8837960', 'MALE', 'Address3', 'B', 168.10295295958028, 57.475640163359735, '010-8836-7758', 'password3', 'nurse1', 'doctor3');
INSERT INTO inha_hospital.patient (patient_id, name, ssn, gender, address, blood_type, height, weight, phone_number, password, nurse_id, doctor_id) VALUES ('patient4', 'Lora Arnold', '789004-6336369', 'MALE', 'Address4', 'AB', 163.03236267775773, 75.18338605838751, '010-8642-5133', 'password4', 'nurse5', 'doctor5');
INSERT INTO inha_hospital.patient (patient_id, name, ssn, gender, address, blood_type, height, weight, phone_number, password, nurse_id, doctor_id) VALUES ('patient5', 'Bret Barron', '910642-1118359', 'FEMALE', 'Address5', 'O', 166.2252249715566, 67.84699701338583, '010-7399-3318', 'password5', 'nurse7', 'doctor8');
