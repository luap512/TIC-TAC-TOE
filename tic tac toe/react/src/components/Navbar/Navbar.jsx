import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from '../NavBar/NavBar.module.css';

export default function NavBar() {

    return (
        <>
            <nav className ={styles.navbar}>
                <ul className={styles.navul}>
                    <li className='navbar-item'>
                        <NavLink to="/GameView" className='navbar-link' state={{ reset: true}}>PLAY</NavLink>
                    </li>
                    <li className='navbar-item'>
                        <NavLink to="/LeaderBoardView" className='navbar-link'>LEADERBOARD</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}