import styles from '../LeaderboardCard/leaderboardCard.module.css';
export default function LeaderBoardCard({playerData}) {

  return (
        <div className={styles.leaderboardCardDiv}>
        <table className={styles.leaderboardCardTable}>
        <thead className={styles.leaderboardCardTableHead}>
            <tr className={styles.leaderboardCardTableRow}>
                <th className={styles.leaderboardCardTH}>
                    NAME
                </th>
                <th className={styles.leaderboardCardTH}>
                    GAMES PLAYED
                </th>
                <th className={styles.leaderboardCardTH}>
                    GAMES WON
                </th>
            </tr>
        </thead>
        <tbody className={styles.tableBody}>
            {playerData?.data?.map((player, index) => (
                <tr className={styles.leaderboardCardTableRow} key={index}>
                <td className={styles.leaderboardCardTD}>{player.username}</td>
                <td className={styles.leaderboardCardTD}>{player.gamesPlayed}</td>
                <td className={styles.leaderboardCardTD}>{player.gamesWon}</td>
                </tr>
            ))}  
        </tbody>
        </table>
    </div>
  );
}
