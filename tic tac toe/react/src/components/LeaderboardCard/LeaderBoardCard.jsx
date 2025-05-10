import styles from '../LeaderboardCard/leaderboardCard.module.css';
export default function LeaderBoardCard() {


    const fakeUser = [
        {   
            name: 'Paul',
            gamesPlayed: 69,
            gamesWon: 69
        },
        {   
            name: 'Rhino',
            gamesPlayed: 10,
            gamesWon: 8
        },
        {   
            name: 'beep',
            gamesPlayed: 0,
            gamesWon: 0
        }
    ];

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
            {fakeUser.map((user, index) => (
                <tr className={styles.leaderboardCardTableRow} key={index}>
                <td className={styles.leaderboardCardTD}>{user.name}</td>
                <td className={styles.leaderboardCardTD}>{user.gamesPlayed}</td>
                <td className={styles.leaderboardCardTD}>{user.gamesWon}</td>
                </tr>
            ))}  
        </tbody>
        </table>
    </div>
  );
}
