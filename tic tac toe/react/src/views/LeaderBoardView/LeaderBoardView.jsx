import Leaderboard from "../../components/Leaderboard/Leaderboard";
import styles from '../LeaderBoardView/LeaderBoardView.module.css';
import playerService from '../../services/playerService';
import{ useEffect, useState } from 'react';
export default function LeaderBoardView(){

    const[isLoading, setIsLoading] = useState(true);
    const[playerData, setPlayerData] = useState([]);

    
    useEffect(() => {
        setIsLoading(true);
        playerService.getPlayers()
        .then((response) => {
            setPlayerData(response);
            setIsLoading(false);
        })
        .catch((e) => {
            console.log(e);
            setIsLoading(false);
        });
    }, [])

    console.log(playerData.data);

    return(
        <>
        <div className ={styles.leaderboardDiv}>
            <Leaderboard playerData={playerData}/>
        </div>
        </>
    );
}