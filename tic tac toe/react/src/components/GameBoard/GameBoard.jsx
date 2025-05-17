import styles from '../GameBoard/GameBoard.module.css';
import BigX from '../BigX/BigX';
import BigO from '../BigO/BigO';
import GameOver from '../GameOver/GameOver';
import { useState, useEffect } from 'react';
import VersusCard from '../VersusCard/VersusCard.jsx';
import playerService from '../../services/playerService.js';

export default function GameBoard({ playerOneName, playerTwoName }) {
    const [turnCounter, setTurnCounter] = useState(1);
    const [boardState, setBoardState] = useState(Array(3).fill(null).map(() => Array(3).fill(null)));
    const [gameOver, setGameOver] = useState(false);
    const [winType, setWinType] = useState('');
    const [winner, setWinner] = useState('');
    const [winningLine, setWinningLine] = useState(null);

    const createPlayerIfNotExists = async (username) => {
        try {
            const player = await playerService.getPlayerByUsername(username);
            if (!player) {
                const newPlayer = { username, gamesPlayed: 0, gamesWon: 0, draws: 0 };
                await playerService.createPlayer(newPlayer);
                return newPlayer;
            }
            return player;
        } catch (error) {
            console.error('Error checking or creating player:', error);
        }
    };

    const updatePlayerStats = async (winnerName, result) => {
        // Make sure players exist in database
        await createPlayerIfNotExists(playerOneName);
        await createPlayerIfNotExists(playerTwoName);

        if (result === 'Draw') {
            // Both players played a game but no one won
            await playerService.updatePlayer(playerOneName, false);
            await playerService.updatePlayer(playerTwoName, false);
        } else {
            // Winner gets a win, loser just played a game
            const loserName = winnerName === playerOneName ? playerTwoName : playerOneName;
            await playerService.updatePlayer(winnerName, true);
            await playerService.updatePlayer(loserName, false);
        }
    };

    const handleCellClick = (row, col) => {
        if (boardState[row][col] !== null || gameOver) return;

        const newBoard = boardState.map(r => r.slice());
        newBoard[row][col] = turnCounter % 2 === 0 ? 'O' : 'X';
        setBoardState(newBoard);
        setTurnCounter(prev => prev + 1);
    };

    const checkForWinner = async () => {
        const lines = [
            ...boardState,
            [boardState[0][0], boardState[1][0], boardState[2][0]],
            [boardState[0][1], boardState[1][1], boardState[2][1]],
            [boardState[0][2], boardState[1][2], boardState[2][2]],
            [boardState[0][0], boardState[1][1], boardState[2][2]],
            [boardState[0][2], boardState[1][1], boardState[2][0]]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (a && a === b && b === c) {
                setGameOver(true);
                const winType = i < 3 ? 'Row' : i < 6 ? 'Column' : 'Diagonal';
                setWinType(winType);
                const winningLine = i < 3
                    ? { type: 'row', index: i }
                    : i < 6
                        ? { type: 'column', index: i - 3 }
                        : { type: 'diagonal', index: i - 6 };
                setWinningLine(winningLine);
                const currentWinner = a === 'X' ? playerOneName : playerTwoName;
                setWinner(currentWinner);
                await updatePlayerStats(currentWinner, winType);
                return;
            }
        }

        if (turnCounter >= 10) {
            setGameOver(true);
            setWinType('Draw');
            setWinner(null);
            await updatePlayerStats(null, 'Draw');
        }
    };

    useEffect(() => {
        checkForWinner();
    }, [boardState]);

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