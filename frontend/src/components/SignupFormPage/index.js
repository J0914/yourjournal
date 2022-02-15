import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {AiFillQuestionCircle} from 'react-icons/ai'

import styles from './signup.module.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [errors, setErrors] = useState([]);
  const [visible, setVisible] = useState(false);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([])
    console.log(code)
    return dispatch(sessionActions.signUp({ username, email, code, password, confirmedPassword }))
        .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        });
    
  }
  return (
    <div className={styles.formDiv}>
        <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.header}>Create Account!</h1>
        {errors.length ? 
        <div className={styles.errors}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </div> : null
        }
        <div className={styles.inputs}>
        <label>
                Email:
            </label>
            <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <label>
                Username:
            </label>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
            <div className={styles.secretCode}>
            <label>
                Secret Code:
            </label>
            <div className='btn' 
            onMouseEnter={(e) => setVisible(true)} 
            onMouseLeave={(e) => setVisible(false)}
            ><AiFillQuestionCircle />
            </div>
            </div>
            {visible && 
            <div className={styles.secretCode}>
            <label id={styles.secretCode_text}>You will use this code to access your journal entries as added protection. Must be numbers or letters, and between 4 - 6 characters.</label>
            </div>
            }
            <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
            <label>
                Confirm Password:
            </label>
            <input
            type="password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
            />
        </div>
        <button className={styles.submitBtn} type="submit">Sign Up</button>
        </form>
        <NavLink className={styles.redirect} to='/login'>Already have an account?</NavLink>
    </div>
  );
}

export default SignupFormPage;