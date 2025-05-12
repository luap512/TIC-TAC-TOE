package com.techelevator.controller;

import com.techelevator.dao.PlayerDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.Player;
import jakarta.annotation.security.PermitAll;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "/players")
public class PlayerController {

    private final PlayerDao playerDao;

    public PlayerController(PlayerDao playerDao) {
        this.playerDao = playerDao;
    }

    @PermitAll
    @GetMapping
    public List<Player> getAllPlayers() {
        try {
            return playerDao.getPlayers();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PermitAll
    @GetMapping("/{playerId}")
    public Player getById(@PathVariable int playerId) {
        try {
            return playerDao.getPlayerById(playerId);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PermitAll
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Player createPlayer(@RequestBody Player player) {
        try {
            System.out.println("\nCreating new player: " + player.getUsername());
            return playerDao.createPlayer(player);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PermitAll
    @PutMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
    public Player updatePlayer(@PathVariable String username, @RequestBody Player player) {
        try {
            player.setUsername(username);
            System.out.println("\nUpdating player: " + player.getUsername());
            return playerDao.updatePlayer(player);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
