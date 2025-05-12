import styles from '../GameBoard/GameBoard.module.css';
import BigX from '../BigX/BigX';
import BigO from '../BigO/BigO';
import GameOver from '../GameOver/GameOver';
import { useState, useEffect } from 'react';
import VersusCard from '../VersusCard/VersusCard.jsx';
import playerService from '../../services/playerService.js';

export default function GameBoard({ playerOneName, playerTwoName }) {

    // counter for turns
    const [turnCounter, setTurnCounter] = useState(1);
    // 3x3 array for tracking the state of the board. All cells are initially null.
    const [boardState, setBoardState] = useState(Array(3).fill(null).map(() => Array(3).fill(null)));
    // track if game is over
    const [gameOver, setGameOver] = useState(false);
    // track the win type
    const [winType, setWinType] = useState('');
    // track the winner
    const [winner, setWinner] = useState('');
    // track the winning line 
    const [winningLine, setWinningLine] = useState(null);  // null, 'row', 'col', or 'diagonal'

    // Check if player exists, otherwise create them
    const createPlayerIfNotExists = async (username) => {
        try {
            const player = await playerService.getPlayerByUsername(username);
            if (!player) {
                // If player doesn't exist, create them
                const newPlayer = { username, gamesPlayed: 0, gamesWon: 0, draws: 0 };
                await playerService.createPlayer(newPlayer);
                return newPlayer;  // Return new player object
            }
            return player;  // Return existing player
        } catch (error) {
            console.error('Error checking or creating player:', error);
        }
    };

    function handleCellClick(row, col) {
        let newBoard = boardState.map(row => row.slice());

        // Prevent clicking on already filled cells or after game is over
        if (boardState[row][col] !== null || gameOver) return;

        // Alternate between X and O
        newBoard[row][col] = turnCounter % 2 === 0 ? 'O' : 'X';
        setBoardState(newBoard);

        // Increment turn counter if the game isn't over
        if (!gameOver) {
            setTurnCounter(turnCounter + 1);
        }

        console.log("Current Board State: ");
        console.log(boardState);
    }

    function checkForWinner() {
        // Check rows, columns, and diagonals for a win
        const lines = [
            // Rows
            ...boardState,
            // Columns
            [boardState[0][0], boardState[1][0], boardState[2][0]],
            [boardState[0][1], boardState[1][1], boardState[2][1]],
            [boardState[0][2], boardState[1][2], boardState[2][2]],
            // Diagonals
            [boardState[0][0], boardState[1][1], boardState[2][2]],
            [boardState[0][2], boardState[1][1], boardState[2][0]]
        ];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line[0] !== null && line[0] === line[1] && line[1] === line[2]) {
                setGameOver(true);
                setWinType(i < 3 ? 'Row' : (i < 6 ? 'Column' : 'Diagonal'));
                setWinningLine(i < 3 ? { type: 'row', index: i } : (i < 6 ? { type: 'column', index: i - 3 } : { type: 'diagonal', index: i - 6 }));
                setWinner(turnCounter % 2 === 0 ? playerOneName : playerTwoName);
                return;
            }
        }

        if (turnCounter >= 9) {
            setGameOver(true);
            setWinType('Draw');
        }
    }

    // check the board state every time it changes
    useEffect(() => {
        checkForWinner();
    }, [boardState, turnCounter]);

    useEffect(() => {
        if (winner) {
            // Check if players exist and create them if not
            const updatePlayerStats = async () => {
                const player1 = await createPlayerIfNotExists(playerOneName);
                const player2 = await createPlayerIfNotExists(playerTwoName);

                // Update winner's stats
                if (winner === playerOneName) {
                    player1.gamesPlayed += 1;
                    player1.gamesWon += 1;
                    await playerService.updatePlayer(player1);
                } else if (winner === playerTwoName) {
                    player2.gamesPlayed += 1;
                    player2.gamesWon += 1;
                    await playerService.updatePlayer(player2);
                }

                // Handle draws
                if (winType === 'Draw') {
                    player1.gamesPlayed += 1;
                    player2.gamesPlayed += 1;
                    player1.draws += 1;
                    player2.draws += 1;
                    await playerService.updatePlayer(player1);
                    await playerService.updatePlayer(player2);
                }
            };

            updatePlayerStats();
        }
    }, [winner, gameOver, winType]);

    return (
        <div className={styles.gameBoard}>
            <VersusCard playerOneName={playerOneName} playerTwoName={playerTwoName} />
            
            <div className={styles.gameBoardDiv}>
                {gameOver && (
                    <div className={styles.gameOverDiv}>
                        <GameOver winType={winType} winner={winner} />
                    </div>
                )}
                
                <table className={styles.gameBoardTable}>
                    <tbody className={styles.gameBoardBody}>
                        {[0, 1, 2].map((row) => (
                            <tr key={row}>
                                {[0, 1, 2].map((col) => (
                                    <td
                                        onClick={gameOver ? undefined : () => handleCellClick(row, col)}
                                        key={col}
                                        className={styles.cell}
                                    >
                                        {boardState[row][col] === 'X' ? <BigX /> :
                                         boardState[row][col] === 'O' ? <BigO /> : null}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {winningLine && winningLine.type === 'row' && (
                            <div className={`${styles.winningLine} ${styles['row-' + winningLine.index]}`} />
                        )}
                        {winningLine && winningLine.type === 'column' && (
                            <div className={`${styles.winningLine} ${styles['column-' + winningLine.index]}`} />
                        )}
                        {winningLine && winningLine.type === 'diagonal' && (
                            <div className={`${styles.winningLine} ${styles['diagonal-' + winningLine.index]}`} />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
