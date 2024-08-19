import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginRegister.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";


const LoginRegister = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [agree, setAgree] = useState(false);  
    const [action, setAction] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const registerLink = (e) => {
        e.preventDefault();
        setAction(' active');
    }

    const loginLink = (e) => {
        e.preventDefault();
        setAction('');
    }

    
    const removeLocalStorageItems = (items) => {
        items.forEach(item => {
            if (localStorage.getItem(item) !== null) {
                localStorage.removeItem(item);
            }
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3010/login', {
                username,
                password
            });

            if (response.data.success) {
                // localStorage.clear(); // Refreshes the data before every new attempt, before we set the userID 
                removeLocalStorageItems(['currProb', 'currProbId', 'currProbName', 'usedIndexes', 'currentQuestion', 'currDescription']);
                removeLocalStorageItems(['navigating','difficulty','attempt']);  // CLEAN OUT LOCALSTORAGE BEFORE STARTING AN ATTEMPT
                removeLocalStorageItems(['q1score','q1stars','q1time','q2score','q2stars','q2time','q3score','q3stars','q3time','q4score','q4stars','q4time']);
                localStorage.setItem('userID', response.data.user.id);
                navigate('/home');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            setError('An error occurred during login. Please try again.');
        }
    };  

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (!agree) {
            setError('You must agree to the terms and conditions.');
            return;
        }

        const generateRndID = () => Math.floor(Math.random() * 1000000); 

        let userId = parseInt(id, 10); 

        const checkIdExists = async (id) => {
            try {
                const response = await axios.get(`http://localhost:3010/users/${id}`);
                return response.data ? true : false; 

            } catch(error) {
                if (error.response && error.response.status === 404) {
                    return false;    
                } else {
                    throw new Error('Error checking ID. ');
                }
            }
        };


        try {
            let idExists = await checkIdExists(userId);
            while(idExists){
                userId = generateRndID();
                idExists = await checkIdExists(userId);
            }

            const response = await axios.post('http://localhost:3010/users', {
                id: userId,
                username,
                email,
                password
            });

            if (response.data) {
                setAction('');
                setError('');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error.message);
            setError('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div className = 'loginRegister'>
        <div className = {`wrapper${action}`}>

            <div className = "form-box login-box">
                <form onSubmit = {handleLoginSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input 
                          type="username"
                          placeholder='Username'
                          value = {username} 
                          onChange = {(e) => setUsername(e.target.value)}
                          required 
                        />
                        <FaUser className='icon' />
                    </div>

                    <div className="input-box">
                        < input 
                            type ="password"
                            placeholder='Password' 
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        <FaLock className='icon' />
                    </div>

                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type="submit">Login</button>

                    <div className="register">
                        <p>Don't have an account? 
                            <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div> 

            <div className = "form-box register-box">
                <form onSubmit={handleRegisterSubmit}>
                    <h1>Registration</h1>
                    
                    <div className="input-box">
                            <input
                                type="number"
                                placeholder='ID'
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                            <FaUser className='icon' />
                    </div>

                    <div className="input-box">
                        <input 
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                        <FaUser className='icon' />
                    </div>

                    <div className="input-box">
                        <input 
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <FaEnvelope className='icon' />
                    </div>

                    <div className="input-box">
                        <input 
                            type="text"
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember">
                        <label>
                            <input 
                             type="checkbox"
                             checked={agree}
                             onChange={(e) => setAgree(e.target.checked)} 
                             />I consent to have my usage data recorded for research purposes
                        </label>
                    </div>

                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type="submit">Register</button>

                    <div className="register">
                        <p>Already have an account? 
                            <a href="/Home" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div> 


        </div>
        </div>
    );
};

export default LoginRegister;