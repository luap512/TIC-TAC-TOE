
import GameBoard from '../../components/GameBoard/GameBoard';
import styles from '../GameView/GameView.module.css';
import{ useState, useEffect } from 'react';
export default function GameView(){

    const [isPlaying, setIsPlaying] = useState(false);
    const[playerOneName, setPlayerOnename] = useState('');
    const[playerTwoName, setPlayerTwoname] = useState('');

    function onSubmit(e){
        e.preventDefault();
        setIsPlaying(true);
    }


    if(isPlaying)
    {
        return(<GameBoard
        playerOneName={playerOneName}
        playerTwoName={playerTwoName}
        />)
    }

    return(
        <>
            <form onSubmit={onSubmit} className={styles.PlayerInfoForm}>
                <fieldset className={styles.PlayerInfoFieldset}>
                    <legend className={styles.playerInfoLegend}>TIC-TAC-TOE</legend>
                    <div className={styles.inputDiv}>
                        <label form="PlayerOne">Player One Name: </label>
                        <input value={playerOneName} onChange={e => setPlayerOnename(e.target.value)} type="text" id="PlayerOne" name="PlayerOne" required></input>
                    </div>
                    <div className={styles.inputDiv}>
                        <label form="PlayerTwo">Player Two Name: </label>
                        <input value={playerTwoName} onChange={e => setPlayerTwoname(e.target.value)} type="text" id="PlayerTwo" name="PlayerTwo" required></input>
                    </div>
                </fieldset>
                <button type="submit" className={styles.startButton}>
                Start Game
                </button>
            </form>
        </>
    );
}