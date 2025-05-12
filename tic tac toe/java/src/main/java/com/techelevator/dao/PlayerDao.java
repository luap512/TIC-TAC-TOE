package com.techelevator.dao;
import java.util.List;
import com.techelevator.model.Player;

public interface PlayerDao {
    List<Player> getPlayers();

    Player getPlayerById(int id);

    Player getPlayerByUsername(String username);

    Player createPlayer(Player player);

    Player updatePlayer(Player player);
}
