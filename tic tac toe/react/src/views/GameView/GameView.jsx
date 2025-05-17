import GameBoard from '../../components/GameBoard/GameBoard';
import styles from '../GameView/GameView.module.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import playerService from '../../services/playerService';

export default function GameView() {
    const location = useLocation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerOneName, setPlayerOnename] = useState('');
    const [playerTwoName, setPlayerTwoname] = useState('');

    useEffect(() => {
        setIsPlaying(false);
    }, [location]);

    useEffect(() => {
        if (isPlaying) {
            // Player One
            playerService.getPlayerById(playerOneName)
                .then(res => {
                    console.log(`Player one exists: ${res.data.username}`);
                })
                .catch(err => {
                    if (err.response && err.response.status === 400) {
                        console.log("Player one not found, creating...");
                        playerService.createPlayer({ username: playerOneName, gamesPlayed: 0, gamesWon: 0 })
                            .then(() => console.log("Player one created"))
                            .catch(err => console.error("Failed to create player one:", err));
                    } else {
                        console.error("Error fetching player one:", err);
                    }
                });
    
            // Player Two
            playerService.getPlayerById(playerTwoName)
                .then(res => {
                    console.log(`Player two exists: ${res.data.username}`);
                })
                .catch(err => {
                    if (err.response && err.response.status === 400) {
                        console.log("Player two not found, creating...");
                        playerService.createPlayer({ username: playerTwoName, gamesPlayed: 0, gamesWon: 0 })
                            .then(() => console.log("Player two created"))
                            .catch(err => console.error("Failed to create player two:", err));
                    } else {
                        console.error("Error fetching player two:", err);
                    }
                });
        }
    }, [isPlaying, playerOneName, playerTwoName]);
    

    function onSubmit(e) {
        e.preventDefault();
        setIsPlaying(true);
    }

    return (
        <>
            {isPlaying ? (
                <GameBoard
                    playerOneName={playerOneName}
                    playerTwoName={playerTwoName}
                />
            ) : (
                <div className={styles.gameViewDiv}>
                    <form onSubmit={onSubmit} className={styles.PlayerInfoForm}>
                        <fieldset className={styles.PlayerInfoFieldset}>
                            <legend className={styles.playerInfoLegend}>TIC-TAC-TOE</legend>
                            <div className={styles.inputDiv}>
                                <label htmlFor="PlayerOne">Player One Name: </label>
                                <input
                                    value={playerOneName}
                                    onChange={e => setPlayerOnename(e.target.value)}
                                    type="text"
                                    id="PlayerOne"
                                    name="PlayerOne"
                                    required
                                />
                            </div>
                            <div className={styles.inputDiv}>
                                <label htmlFor="PlayerTwo">Player Two Name: </label>
                                <input
                                    value={playerTwoName}
                                    onChange={e => setPlayerTwoname(e.target.value)}
                                    type="text"
                                    id="PlayerTwo"
                                    name="PlayerTwo"
                                    required
                                />
                            </div>
                        </fieldset>
                        <button type="submit" className={styles.startButton}>
                            Start Game
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
