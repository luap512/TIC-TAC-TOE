import Leaderboard from "../../components/Leaderboard/Leaderboard";
import styles from '../LeaderBoardView/LeaderBoardView.module.css';
export default function LeaderBoardView(){
    return(
        <>
        <div className ={styles.leaderboardDiv}>
            <Leaderboard/>
        </div>
        </>
    );
}