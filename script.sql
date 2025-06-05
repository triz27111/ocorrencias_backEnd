create database db_ocorrencia_aa ;
use db_ocorrencia_aa ; 

create table tbl_cargo(
id int not null auto_increment,
nome varchar(45) not null,
primary key (id)
);

create table tbl_educador(
id int not null auto_increment primary key,
nome varchar(45) not null,
senha varchar(45) not null,
email varchar(45) not null,
palavra_chave varchar(45) not null,
id_cargo int not null,
constraint FK_CARGO_EDUCADOR
foreign key (id_cargo)
references tbl_cargo(id)
);

create table tbl_turma(
	id int not null primary key auto_increment,
    nome varchar(45) not null,
    curso varchar(45) not null,
    periodo varchar(45) not null,
    max_alunos int not null
);

create table tbl_alunos(
	id int not null primary key auto_increment,
    nome varchar(45) not null,
    matricula varchar(45) not null,
    data_nascimento datetime not null,
    id_turma int not null,
    constraint FK_TURMA_ALUNOS
    foreign key (id_turma) references tbl_turma(id)
)

show tables ;

ALTER TABLE tbl_turma
ADD COLUMN periodo VARCHAR(20) NOT NULL;


select * from tbl_educador;

INSERT INTO tbl_cargo (nome)
VALUES ('historia'),
       ('geografia'),
       ('matematica');

select * from tbl_cargo;

INSERT INTO tbl_educador (nome, senha, email, palavra_chave, id_cargo)
VALUES 
('João Silva', 'senha123', 'joao@email.com', 'azul', 1),
('Maria Souza', 'senha456', 'maria@email.com', 'vermelho', 2),
('Carlos Lima', 'senha789', 'carlos@email.com', 'verde', 1);
