
INSERT INTO employee (id,role, title, first_name, last_name, login, password) VALUES ('1','doctor','dr', 'Jan', 'Nowak', 'sd', '$2a$10$LmlgQsTi.m24dKZb4v0w...oeHin0qjqopDzJCt42cmhzDezOrKR.'),
                                                                               ('2','admin', '','Andrzej', 'Nowak', 'admin', '$2a$10$LmlgQsTi.m24dKZb4v0w...oeHin0qjqopDzJCt42cmhzDezOrKR.'),
                                                                               ('3','employee','mgr', 'Anna', 'Nowak', 'an', '$2a$10$LmlgQsTi.m24dKZb4v0w...oeHin0qjqopDzJCt42cmhzDezOrKR.');

INSERT INTO gender (name) VALUES ('male');
INSERT INTO gender (name) VALUES ('female');

INSERT INTO examination_offer(id, name, description, price) VALUES (1, 'Morfologia krwi','Morfologia krwi pełna (tzw. morfologia 5 diff.). Jakościowa i ilościowa ocena składu i morfologii  krwi obwodowej, krwinek: czerwonych (erytrocytów), białych (pięciu frakcji) oraz płytek krwi (trombocytów). Podstawowe przesiewowe badanie krwi o zastosowaniu profilaktycznym i diagnostycznym.',19.99),
                                                             (2, 'Żelazo, ferrytyna','Żelazo. Pomiar stężenia żelaza w surowicy krwi, przydatny  w diagnostyce niedoborów i nadmiaru żelaza. Ferrytyna. Kliniczna ocena zapasów żelaza w organizmie z naciskiem na niedobory. ',15.99);


INSERT INTO address (id, street, postal_code, city) VALUES (1, 'Wróblewskiego 25', '51-627', 'Wrocław');
INSERT INTO address (id, street, postal_code, city) VALUES (2, 'plac Grunwaldzki 18-20', '50-384', 'Wrocław');
INSERT INTO address (id, street, postal_code, city) VALUES (3, 'Oławska 14', '50-123', 'Wrocław');

INSERT INTO laboratory (id, address_id, phone) VALUES (1, 2, '122950101');
INSERT INTO laboratory (id, address_id, phone) VALUES (2, 3, '122950103');

INSERT INTO schedule (id, laboratory_id, day, opening_time, closing_time) VALUES (1,1,'Poniedziałek', '08:00', '17:00'),
                                                                  (2,1,'Wtorek', '09:00', '18:00'),
                                                                  (3,1,'Środa', '08:30', '17:30'),
                                                                  (4,1,'Czwartek', '09:30', '18:30'),
                                                                  (5,1,'Piątek', '10:00', '19:00'),
                                                                  (6,2,'Poniedziałek', '08:00', '16:00'),
                                                                  (7,2,'Wtorek', '09:00', '18:00'),
                                                                  (8,2,'Środa', '08:30', '16:30'),
                                                                  (9,2,'Czwartek', '09:30', '18:30'),
                                                                  (10,2,'Piątek', '10:00', '19:00');


INSERT INTO patient (gender_id, address_id, employee_id, pesel, first_name, last_name, birth_date,phone, email) VALUES ((SELECT id
                                                                                                                         FROM gender
                                                                                                                         WHERE name = 'male'), 1, 1, '01300703817', 'Maciej', 'Demucha', '2001-10-07', '098765432', 'maciej.demucha@interia.pl');
INSERT INTO patient (gender_id, address_id, pesel, first_name, last_name, birth_date, phone, email) VALUES ((SELECT id
                                                                                                             FROM gender
                                                                                                             WHERE name = 'female'), 1, '01310688261', 'Anna', 'Nowak', '2001-11-06', '123456789', 'anna.nowak@gmail.com');

INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (1,(SELECT id FROM gender WHERE name = 'male'), 4.23, 9.07, 'tys/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (2,(SELECT id FROM gender WHERE name = 'male'), 4.63, 6.08, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (7, (SELECT id FROM gender WHERE name = 'male'), 13.7, 17.5, 'g/dl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (8, (SELECT id FROM gender WHERE name = 'male'), 40.1, 51.0, '%');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (9,(SELECT id FROM gender WHERE name = 'male'), 79.1, 92.07, 'fl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (10,(SELECT id FROM gender WHERE name = 'male'), 25.7, 32.2, 'pg');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (11, (SELECT id FROM gender WHERE name = 'male'), 32.3, 36.5, 'g/dl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (12, (SELECT id FROM gender WHERE name = 'male'), 150.0, 400.0, 'tys/μl');


INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (3,(SELECT id FROM gender WHERE name = 'female'), 31.0, 183.0, 'μg/dl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (4,(SELECT id FROM gender WHERE name = 'female'), 27.0, 370.00, 'mln/μl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (5,(SELECT id FROM gender WHERE name = 'male'), 33.0, 193.0, 'μg/dl');
INSERT INTO norm_range (id, gender_id, min, max, unit) VALUES (6,(SELECT id FROM gender WHERE name = 'male'), 30.0, 400.00, 'mln/μl');

INSERT INTO examination (id, patient_id, name,  date_performed) VALUES (1234, (SELECT id
                                                                               FROM patient
                                                                               WHERE pesel = '01300703817'), 'Morfologia krwi', '2023-07-10');
INSERT INTO examination (id, patient_id, name,  date_performed) VALUES (5678, (SELECT id
                                                                               FROM patient
                                                                               WHERE pesel = '01300703817'), 'Żelazo, ferrytyna', '2023-12-02');
INSERT INTO examination (id, patient_id, name,  date_performed) VALUES (9876, (SELECT id
                                                                               FROM patient
                                                                               WHERE pesel = '01310688261'), 'Żelazo, ferrytyna', '2023-01-01');


INSERT INTO parameter (id, norm_range_id,examination_id, name, value) VALUES (1,1,1234, 'Leukocyty', 9.77);
INSERT INTO parameter (id, norm_range_id,examination_id, name, value) VALUES (2,2,1234, 'Erytrocyty', 5.44);
INSERT INTO parameter (id, norm_range_id,examination_id, name, value) VALUES (9,7,1234, 'Hemoglobina', 16.4);
INSERT INTO parameter (id, norm_range_id,examination_id, name, value) VALUES (10,8,1234, 'Hematokryt', 31.9);
INSERT INTO parameter (id, norm_range_id,examination_id, name, value) VALUES (5,9,1234, 'MCV', 89.9);
INSERT INTO parameter (id, norm_range_id,examination_id, name, value) VALUES (6,10,1234, 'MCH', 30.1);
INSERT INTO parameter (id, norm_range_id,examination_id, name, value) VALUES (7,11,1234, 'MCHC', 33.5);
INSERT INTO parameter (id, norm_range_id,examination_id, name, value) VALUES (8,12,1234, 'Płytki krwi', 184.0);



INSERT INTO parameter (id,  norm_range_id,examination_id,name, value) VALUES (3,3,9876, 'Żelazo', 174.0);
INSERT INTO parameter (id,  norm_range_id,examination_id,name, value) VALUES (4,4,9876, 'Ferrytyna', 106.0);
INSERT INTO parameter (id,  norm_range_id,examination_id,name, value) VALUES (31,5,5678, 'Żelazo', 145.0);
INSERT INTO parameter (id,  norm_range_id,examination_id,name, value) VALUES (32,6,5678, 'Ferrytyna', 92.0);





INSERT INTO diagnosis (id, examination_id, description) VALUES (1, 1234, "Morfologia krwi wykazała łagodne zwiększenie liczby leukocytów, które jest lekko powyżej normy referencyjnej. Wynik ten może być związany z reakcją organizmu na infekcję, stan zapalny lub inny czynnik stresowy. Zaleca się dalszą diagnostykę w celu ustalenia przyczyny tego zjawiska, a także monitorowanie pacjenta pod kątem ewentualnych objawów klinicznych. W razie potrzeby mogą być zalecane dodatkowe badania laboratoryjne oraz konsultacja specjalisty.

Ważne jest, aby tę diagnozę interpretować w kontekście pełnej historii medycznej pacjenta oraz ewentualnych objawów klinicznych, aby ustalić dokładną przyczynę leukocytozy.");
