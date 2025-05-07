import styles from '../VersusCard/VersusCard.module.css';

export default function GameStart({playerOneName, playerTwoName}){



    return(
        <>  
        <div className={styles.container}>
            <div className={styles.titleDiv}>
                    <h1 className={styles.titleText}>TIC-TAC-TOE</h1>
                </div>
                <div className={styles.versusCardDiv}>
                    <h1 className={styles.versusCardText}>{playerOneName} VS {playerTwoName}</h1>
                </div>
            </div>
        </>
    );
}