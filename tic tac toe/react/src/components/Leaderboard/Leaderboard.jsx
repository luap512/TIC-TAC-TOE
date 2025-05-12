import LeaderboardCard from '../LeaderboardCard/LeaderBoardCard';
import styles from '../Leaderboard/Leaderboard.module.css';
export default function Leaderboard({ playerData }){

    return(
        <>
            <div className={styles.leaderboardDiv}>
                <h1 className={styles.LeaderboardH1}>LEADERBOARD</h1>
                <LeaderboardCard playerData={ playerData }/>
            </div>
        </>
    );
}