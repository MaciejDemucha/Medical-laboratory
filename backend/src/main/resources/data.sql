INSERT INTO doctor (id, first_name, last_name, login, password) VALUES ('1', 'Jan', 'Nowak', 'sd', '$2a$10$LmlgQsTi.m24dKZb4v0w...oeHin0qjqopDzJCt42cmhzDezOrKR.');

INSERT INTO gender (name) VALUES ('male');
INSERT INTO gender (name) VALUES ('female');


INSERT INTO address (id, street, number, postal_code, city) VALUES (1, 'Wróblewskiego', 25, '51-627', 'Wrocław');

INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (1,(SELECT id FROM gender WHERE name = 'male'), 4.23, 9.07, 'tys/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (2,(SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (5, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (6, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (7, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (8, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (9, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (10, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (11, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (12, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (13, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (14, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (15, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (16, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (17, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (18, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (19, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (20, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (21, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (22, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (23, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (24, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (25, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (26, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (27, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (28, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (29, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (30, (SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');


INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (3,(SELECT id FROM gender WHERE name = 'female'), 33.0, 193.0, 'μg/dl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (4,(SELECT id FROM gender WHERE name = 'female'), 30.0, 400.00, 'mln/μl');

INSERT INTO parameter (id, norm_range_id,  name, value) VALUES (1,1, 'Leukocyty', 5.77);
INSERT INTO parameter (id, norm_range_id,name, value) VALUES (2,2, 'Erytrocyty', 5.44);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (5, 5, 'Name 5', 5.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (6, 6, 'Name 6', 6.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (7, 7, 'Name 7', 7.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (8, 8, 'Name 8', 8.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (9, 9, 'Name 9', 9.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (10, 10, 'Name 10', 10.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (11, 11, 'Name 11', 11.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (12, 12, 'Name 12', 12.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (13, 13, 'Name 13', 13.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (14, 14, 'Name 14', 14.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (15, 15, 'Name 15', 15.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (16, 16, 'Name 16', 16.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (17, 17, 'Name 17', 17.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (18, 18, 'Name 18', 18.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (19, 19, 'Name 19', 19.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (20, 20, 'Name 20', 20.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (21, 21, 'Name 21', 21.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (22, 22, 'Name 22', 22.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (23, 23, 'Name 23', 23.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (24, 24, 'Name 24', 24.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (25, 25, 'Name 25', 25.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (26, 26, 'Name 26', 26.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (27, 27, 'Name 27', 27.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (28, 28, 'Name 28', 28.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (29, 29, 'Name 29', 29.0);
INSERT INTO parameter (id, norm_range_id, name, value) VALUES (30, 30, 'Name 30', 30.0);


INSERT INTO parameter (id,  norm_range_id,name, value) VALUES (3,3, 'Żelazo', 174.0);
INSERT INTO parameter (id,  norm_range_id,name, value) VALUES (4,4, 'Ferrytyna', 106.0);
INSERT INTO parameter (id,  norm_range_id,name, value) VALUES (31,3, 'Żelazo', 145.0);
INSERT INTO parameter (id,  norm_range_id,name, value) VALUES (32,4, 'Ferrytyna', 92.0);


INSERT INTO patient (gender_id, address_id, doctor_id, pesel, first_name, last_name, birth_date) VALUES ((SELECT id
                                                                                   FROM gender
                                                                                   WHERE name = 'male'), 1, 1, '01300703817', 'Maciej', 'Demucha', '2001-10-07');
INSERT INTO patient (gender_id, address_id, pesel, first_name, last_name, birth_date) VALUES ((SELECT id
                                                                                               FROM gender
                                                                                               WHERE name = 'female'), 1, '01310688261', 'Anna', 'x', '2001-11-06');

INSERT INTO examination (id, patient_id, name, number, date_performed) VALUES (1, (SELECT id
                                                                    FROM patient
                                                                    WHERE pesel = '01300703817'), 'Morfologia krwi','1234', '2023-07-10');
INSERT INTO examination (id, patient_id, name, number, date_performed) VALUES (3, (SELECT id
                                                                                   FROM patient
                                                                                   WHERE pesel = '01300703817'), 'Żelazo, ferrytyna','5678', '2023-01-02');
INSERT INTO examination (id, patient_id, name, number, date_performed) VALUES (2, (SELECT id
                                                                           FROM patient
                                                                           WHERE pesel = '01310688261'), 'Żelazo, ferrytyna','0987', '2023-01-01');

INSERT INTO diagnosis (id, examination_id, description) VALUES (1, 1, "masz raka");

INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 1);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 2);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 5);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 6);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 7);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 8);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 9);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 10);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 11);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 12);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 13);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 14);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 15);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 16);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 17);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 18);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 19);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 20);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 21);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 22);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 23);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 24);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 25);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 26);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 27);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 28);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 29);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 30);


INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (2, 3);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (2, 4);

INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (3, 31);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (3, 32);