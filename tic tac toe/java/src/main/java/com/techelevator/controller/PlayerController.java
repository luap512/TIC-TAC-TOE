
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
@CrossOrigin(origins = "*")
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
    @GetMapping("id/{playerId}")
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
            System.out.println("attempting to create Player: " + player);
            // Check if the player already exists in the database
            System.out.println("get player by USN");
            if (playerDao.getPlayerByUsername(player.getUsername()) != null) {

                System.out.println(player.getUsername());
                // If the player already exists, handle it as needed
                System.out.println("Player already exists... ");

                updatePlayer(player.getUsername(), false);
                System.out.println(" trying to update player");
                return playerDao.getPlayerByUsername(player.getUsername());
            }
            else{
                System.out.println("\nCreating new player: " + player.getUsername());
                // Create the new player (without the player_id)
                return playerDao.createPlayer(player);
            }
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @PermitAll
    @GetMapping("/username/{username}")
    public Player getPlayerByUsername(@PathVariable String username) {
        try {
            return playerDao.getPlayerByUsername(username);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @PermitAll
    @PutMapping("/username/{username}")
    @ResponseStatus(HttpStatus.OK)
    public Player updatePlayer(@PathVariable String username, @RequestParam(required = false, defaultValue = "false") boolean win) {
        try {
            System.out.println("\nUpdating player: " + username + ", win: " + win);
            Player playerToUpdate = playerDao.getPlayerByUsername(username);
            playerToUpdate.setGamesPlayed(playerToUpdate.getGamesPlayed() + 1);

            if (win) {
                playerToUpdate.setGamesWon(playerToUpdate.getGamesWon() + 1);
            }

            return playerDao.updatePlayer(playerToUpdate);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}