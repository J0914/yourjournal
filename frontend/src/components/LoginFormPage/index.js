import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './login.module.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (demo) return;
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demo = () => {
    dispatch(sessionActions.login({
      credential: 'Demo', 
      password: 'password'
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formDiv}>
            <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.header}>Welcome Back!</h1>
            {errors.length ? 
            <div className={styles.errors}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div> : null
            }
            <div className={styles.inputs}>
                <label>
                    Username or Email:
                </label>
                <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                />
                <label>
                    Password:
                </label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button className={styles.submitBtn} type="submit">Log In</button>
            <button 
              className={styles.submitBtn} 
              type='reset'
              onClick={demo}
              >
              Demo
            </button>
            </form>
            <NavLink className={styles.redirect} to='/signup'>Dont have an account?</NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;