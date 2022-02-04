create table autores (
  id int auto_increment primary key,
  nome varchar(255),
  email varchar(255),
  area varchar(255),
  password varchar(255)
);

INSERT INTO autores (nome, email, area, password) VALUES ('Malu', 'marialuizaduda00@gmail.com', 'Expressão gráfica', '1234');
INSERT INTO autores (nome, email, area, password) VALUES ('Duda', 'duda@gmail.com', 'Biologia', '123');
INSERT INTO autores (nome, email, area, password) VALUES ('Luiza', 'luiza@gmail.com', 'Oceanografia', '12345');

SELECT * FROM autores;

UPDATE autores set password = '$2a$10$h.zbMO2nmi8vK5OpesMBpO7m3exIQkF8QD.ro4.6JlK79b32NEZFi' where id = 1;
UPDATE autores set password = '$2a$10$P4M736gjNxYHMU0QAVCrY.pbUQRItM4lHShVo7/B8O407YJ5iiDuq' where id = 2;
UPDATE autores set password = '$2a$10$zY6dfaopdfy4vauJjvAwF.dcDuZiyggceayyp9i86VxG2a1VIrHhi' where id = 3