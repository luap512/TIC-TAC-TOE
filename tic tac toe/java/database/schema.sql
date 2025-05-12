BEGIN TRANSACTION;

DROP TABLE IF EXISTS players;


CREATE TABLE players (

	user_id SERIAL,
	username varchar(100) NOT NULL UNIQUE,
	games_played int,
	games_won int
);

COMMIT TRANSACTION;
