import styles from '../GameBoard/GameBoard.module.css';
import BigX from '../BigX/BigX';
import BigO from '../BigO/BigO';
import GameOver from '../GameOver/GameOver';
import { useState, useEffect} from 'react';
import VersusCard from '../VersusCard/VersusCard.jsx';

export default function GameBoard({playerOneName, playerTwoName}){

    // counter for turns
    const [turnCounter, setTurnCounter] = useState(1);
    // 3x3 array for tracking the state of the board. All cells are initially null.
    const [boardState, setBoardState] = useState(Array(3).fill(null).map(() => Array(3).fill(null)));
    // track if game is over
    const [gameOver, setGameOver] = useState(false);
    // track the win type
    const[winType, setWinType] = useState('');
    // track the winner
    const[winner, setWinner] = useState('');

    // track the winning line 
    const [winningLine, setWinningLine] = useState(null);  // null, 'row', 'col', or 'diagonal'

    function handleCellClick(row, col){

        // create deep copy of the board called new board
        let newBoard = boardState.map(row => row.slice());

        // if cell is already filled
        if(boardState[row][col] !== null){
            // do nothing
            return;
        }
    
        // if odd turn
        if(turnCounter % 2 !== 0){
            // set cell to x
            newBoard[row][col] = ("X")
            // update board
            setBoardState(newBoard);
        }

        // if even turn
        if(turnCounter % 2 === 0){
            // set cell to O
            newBoard[row][col] = ("O")
            // update board
            setBoardState(newBoard);
        }

        // if more than 8 turns
        if(turnCounter >= 9){
            console.log("maximum turns reached - game is over")
            setWinType('Draw')
            setGameOver(true);
        }
        
        // incriment turn counter
        setTurnCounter(turnCounter + 1);

        // show current board
        console.log("Current Board State: ")
        console.log(boardState);
        

    }

    function checkBoardState(boardState, turnCounter){
        // loop thru rows
        for(let i = 0; i < boardState.length; i++){
            if(boardState[i][1] !== null && boardState[i][0] === boardState[i][1] && boardState[i][1] === boardState[i][2])
            {
                
                setGameOver(true);
                setWinningLine({ type: 'row', index: i});
                setWinType('Row')
                if(turnCounter % 2 === 0){
                  setWinner(playerOneName);
                }
                else{
                  setWinner(playerTwoName);
                }
                return;
            }
        }
        
        // loop thru columns
        for(let j = 0; j < boardState.length; j++){
            if(boardState[1][j] !== null && boardState[0][j] === boardState[1][j] && boardState[1][j] === boardState[2][j])
                {
                    
                    setGameOver(true);
                    setWinningLine({ type: 'column', index: j});
                    setWinType('Column');
                    if(turnCounter % 2 === 0){
                      setWinner(playerOneName);
                    }
                    else{
                      setWinner(playerTwoName);
                    }
                    return;
                }
    
        }
        if(boardState[1][1] !== null && boardState[0][0] === boardState[1][1] && boardState[1][1] === boardState[2][2])
        {
            setGameOver(true);
            setWinningLine({ type: 'diagonal', index: 0});
            setWinType('Diagonal');
            if(turnCounter % 2 === 0){
              setWinner(playerOneName);
            }
            else{
              setWinner(playerTwoName);
            }
            return;
        }
        if(boardState[1][1] !== null && boardState[0][2] === boardState[1][1] && boardState[1][1] === boardState[2][0])
        {
            setGameOver(true);
            setWinningLine({ type: 'diagonal', index: 1});
            setWinType('Diagonal');
            if(turnCounter % 2 === 0){
              setWinner(playerOneName);
            }
            else{
              setWinner(playerTwoName);
            }
            return;
        }
    }
    
    // check the board state every time it changes
    useEffect(() => {
        checkBoardState(boardState, turnCounter);
    }, [boardState],[winType]);

    return (
        <div className={styles.gameBoard}>
            <VersusCard playerOneName={playerOneName} playerTwoName={playerTwoName}/>
            
          <div className={styles.gameBoardDiv}>
          {gameOver ? 
              <div className={styles.gameOverDiv}>
                  <GameOver winType={winType} winner={winner} />
              </div>
                : 
              <div></div> 
            }
            <table className={styles.gameBoardTable}>
              <tbody className={styles.gameBoardBody}>
                {[0, 1, 2].map((row) => (
                  <tr key={row}>
                    {[0, 1, 2].map((col) => (
                      <td onClick={gameOver ? undefined : () => handleCellClick(row, col)} key={col} className={styles.cell}>
                        {boardState[row][col] === "X" ? <BigX/> :
                        boardState[row][col] === "O" ? <BigO/> : 
                        null}
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