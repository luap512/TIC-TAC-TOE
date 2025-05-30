import styles from '../GameOver/GameOver.module.css';
import { NavLink } from 'react-router-dom';
export default function GameOver({winType, winner}){

    const isDraw = !winner || winner.trim() === '';
    
    return(
        <>
            <div className={styles.gameOverCard}>
                {isDraw ? 
                    <>
                        <h1 className={styles.winByTitle}>{winType}</h1>
                    </>
                    :
                    <>
                        <h2 className={styles.gameOverTitle}>GOOD GAME!</h2>
                        <h1 className={styles.winByTitle}>{winner} wins by {winType}</h1>
                    </>
                }
                
                <div className={styles.playAgainDiv}>
                    <button className={styles.playAgainButton}>
                            <NavLink to="/GameView" className='navbar-link' state={{ reset: true}}>PLAY AGAIN</NavLink>
                    </button>
                </div>
            </div>
        </>
    );
}