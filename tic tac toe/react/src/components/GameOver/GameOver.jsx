import styles from '../GameOver/GameOver.module.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
export default function GameOver({winType, winner}){

    const isDraw = winner === '';
    
    return(
        <>
            <div className={styles.gameOverCard}>
                {isDraw ? 
                    <>
                        <h2 className={styles.gameOverTitle}>TIC-TAC-TOE</h2>
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