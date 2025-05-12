package com.techelevator.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.techelevator.dao.PlayerDao;
import com.techelevator.exception.DaoException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.techelevator.model.Player;

@Component
public class JDBCPlayerDao implements PlayerDao {

    private final JdbcTemplate jdbcTemplate;

    public JDBCPlayerDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Player getPlayerById(int playerId) {
        Player player = null;
        String sql = "SELECT user_id, username, games_played, games_won FROM players where user_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, playerId);
            if (results.next()) {
                player = mapRowToPlayer(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return player;
    }

    @Override
    public List<Player> getPlayers() {
        List<Player> users = new ArrayList<>();
        String sql = "SELECT user_id, username, games_played, games_won FROM players";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Player player = mapRowToPlayer(results);
                users.add(player);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return users;
    }

    @Override
    public Player getPlayerByUsername(String username) {
        if (username == null) throw new IllegalArgumentException("Username cannot be null");
        Player player = null;
        String sql = "SELECT * FROM players where username = ?;";
        try {
            SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, username);
            if (rowSet.next()) {
                player = mapRowToPlayer(rowSet);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return player;
    }

    @Override
    public Player createPlayer(Player player) {
        Player newPlayer = null;
        String insertUserSql = "INSERT INTO Players (username, games_played, games_won) " +
                "values (?, 0, 0) RETURNING user_id";

        try {
            int newUserId = jdbcTemplate.queryForObject(insertUserSql, Integer.class,
                    player.getUsername());
            newPlayer = getPlayerById(newUserId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            updatePlayer(player);
            throw new DaoException("Data integrity violation", e);
        }
        return newPlayer;
    }

    @Override
    public Player updatePlayer(Player player) {
        Player updatedPlayer = null;

        // Make sure the username is not null
        if (player.getUsername() == null) {
            throw new DaoException("Username cannot be null");
        }

        // Update query based on the username
        String sql = "UPDATE players SET games_played = ?, games_won = ? WHERE username = ?";

        try {
            // Perform the update based on the username
            int numberOfRowsUpdated = jdbcTemplate.update(sql,
                    player.getGamesPlayed(),
                    player.getGamesWon(),
                    player.getUsername());

            // Check if no rows were updated (could be due to invalid username)
            if (numberOfRowsUpdated == 0) {
                throw new DaoException("Zero rows affected. Expected at least one.");
            } else {
                // Fetch the updated player by username
                updatedPlayer = getPlayerByUsername(player.getUsername());
            }

        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to the server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }

        return updatedPlayer;
    }


    private Player mapRowToPlayer(SqlRowSet rs) {
        Player player = new Player();
        player.setPlayer_id(rs.getInt("user_id"));
        player.setUsername(rs.getString("username"));
        player.setGamesPlayed(rs.getInt("games_played"));
        player.setGamesWon(rs.getInt("games_won"));
        return player;
    }
}