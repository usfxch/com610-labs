CREATE DATABASE dbmovies;
CREATE TABLE movies (
    id serial PRIMARY KEY,
    title character varying(150) NOT NULL,
    year integer,
    UNIQUE(title)
);