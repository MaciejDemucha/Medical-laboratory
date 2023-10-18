INSERT INTO gender (name) VALUES ('male');
INSERT INTO gender (name) VALUES ('female');


INSERT INTO address (id, street, number, postal_code, city) VALUES (1, 'Wróblewskiego', 25, '51-627', 'Wrocław');

INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (1,(SELECT id
                                                            FROM gender
                                                            WHERE name = 'male'), 4.23, 9.07, 'tys/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (2,(SELECT id
                                                            FROM gender
                                                            WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (3,(SELECT id
                                                                  FROM gender
                                                                  WHERE name = 'female'), 3.23, 8.07, 'tys/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (4,(SELECT id
                                                                  FROM gender
                                                                  WHERE name = 'female'), 3.63, 5.08, 'mln/μl');

INSERT INTO parameter (id, norm_range_id,  name, value) VALUES (1,1, 'Leukocyty', 5.77);
INSERT INTO parameter (id, norm_range_id,name, value) VALUES (2,2, 'Erytrocyty', 5.44);
INSERT INTO parameter (id,  norm_range_id,name, value) VALUES (3,3, 'Leukocyty', 3.77);
INSERT INTO parameter (id,  norm_range_id,name, value) VALUES (4,4, 'Erytrocyty', 4.44);

INSERT INTO patient (gender_id, address_id, pesel, first_name, last_name, birth_date) VALUES ((SELECT id
                                                                                   FROM gender
                                                                                   WHERE name = 'male'), 1, '01300703817', 'Maciej', 'Demucha', '2001-10-07');
INSERT INTO patient (gender_id, address_id, pesel, first_name, last_name, birth_date) VALUES ((SELECT id
                                                                                               FROM gender
                                                                                               WHERE name = 'female'), 1, '01310688261', 'Anna', 'x', '2001-11-06');

INSERT INTO examination (id, patient_id, name, date_performed) VALUES (1, (SELECT id
                                                                    FROM patient
                                                                    WHERE pesel = '01300703817'), 'Morfologia krwi', '2023-07-10');
INSERT INTO examination (id, patient_id, name, date_performed) VALUES (2, (SELECT id
                                                                           FROM patient
                                                                           WHERE pesel = '01310688261'), 'Morfologia krwi', '2023-01-01');

INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 1);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (1, 2);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (2, 3);
INSERT INTO examination_parameter (examination_id, parameter_id) VALUES (2, 4);