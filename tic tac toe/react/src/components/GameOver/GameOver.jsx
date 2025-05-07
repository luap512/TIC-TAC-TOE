import styles from '../GameOver/GameOver.module.css';
export default function GameOver({winType}){

    console.log(winType);

    return(
        <>

            <h1>GameOver</h1>
            <h2>WIN BY: {winType}</h2>
        </>
    );
}