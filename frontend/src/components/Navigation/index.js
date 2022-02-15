import React, {useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as sessionActions from '../../store/session'

import styles from './Nav.module.css';

const Navigation = ({ isLoaded }) => {
    const [isActive, setIsActive] = useState(false);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        setIsActive(false)
        history.push('/')
    }

    return (
        <div className={isActive ? `${styles.sidebar} ${styles.active}` : `${styles.sidebar}`}>
            <div className={styles.logo}>
                <span className={styles.book}>
                    <ion-icon name="book-outline"></ion-icon>
                </span>
                <p>&nbsp;Your Journal</p>
            </div>
            <div className={styles.btn}>
                <span onClick={() => setIsActive(!isActive)} className={styles.hamburger}>
                    <ion-icon name="menu-outline"></ion-icon>
                </span>
            </div>
            <ul>
                <li>
                    <span onClick={() => {
                        if (isActive === false) {
                            setIsActive(true);
                        }
                    }} className={styles.searchIcon}>
                        <ion-icon name="search-outline"></ion-icon>
                    </span>
                    <input onClick={() => {
                        if (isActive === false) {
                            setIsActive(true);
                        }
                    }} type='search' placeholder='Search...'></input>
                    <span className={styles.tooltip}>Search</span>
                </li>
                <li className={styles.listItem}>
                    <NavLink onClick={() => setIsActive(false)} className={styles.NavLink} to='/'>
                        <span className={styles.icon}>
                            <ion-icon alt='go home' name="home-outline"></ion-icon>
                        </span>
                        <div className={styles.text}>Home</div>
                    </NavLink>
                    <span className={styles.tooltip}>Home</span>
                </li>
                {!user && 
                <>
                <li className={styles.listItem}>
                    <NavLink onClick={() => setIsActive(false)} className={styles.NavLink} to='/login'>
                        <span className={styles.icon}>
                            <ion-icon name="log-in-outline"></ion-icon>
                        </span>
                        <div className={styles.text}>Login</div>
                    </NavLink>
                    <span className={styles.tooltip}>Login</span>
                </li>
                <li className={styles.listItem}>
                    <NavLink onClick={() => setIsActive(false)} className={styles.NavLink} to='/signup'>
                        <span className={styles.icon}>
                            <ion-icon name="create-outline"></ion-icon>
                        </span>
                        <div className={styles.text}>Signup</div>
                    </NavLink>
                    <span className={styles.tooltip}>Signup</span>
                </li>
                </>
                }
                {user && 
                <>
                <li className={styles.listItem}>
                    <NavLink onClick={() => setIsActive(false)} className={styles.NavLink} to='/entries'>
                        <span className={styles.icon}>
                            <ion-icon name="document-outline"></ion-icon>
                        </span>
                        <div className={styles.text}>Entries</div>
                    </NavLink>
                    <span className={styles.tooltip}>Entries</span>
                </li>
                <li className={styles.listItem}>
                <NavLink onClick={() => setIsActive(false)} className={styles.NavLink} to='/profile'>
                    <span className={styles.icon}>
                        <ion-icon name="person-outline"></ion-icon>
                    </span>
                    <div className={styles.text}>Profile</div>
                </NavLink>
                <span className={styles.tooltip}>Profile</span>
                </li>
                <li className={styles.listItem}>
                <NavLink className={styles.NavLink} to='*' onClick={logout}>
                    <span className={styles.icon}>
                        <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                    <div className={styles.text}>Logout</div>
                </NavLink>
                <span className={styles.tooltip}>Logout</span>
                </li>
                </>}
                <div className={styles.indicator}></div>
            </ul>
        </div>
    );
}

export default Navigation

