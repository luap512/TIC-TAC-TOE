BEGIN TRANSACTION;

-- the password for both users is "password"
INSERT INTO players (username, games_played, games_won)
VALUES
('Player One', 10, 5),
('Player Two', 20, 10),
('Player Three', 50, 25);


GRANT ALL PRIVILEGES ON TABLE players TO final_capstone_appuser;
GRANT ALL PRIVILEGES ON SEQUENCE players_user_id_seq TO final_capstone_appuser;

COMMIT TRANSACTION;
