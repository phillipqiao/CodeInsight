import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import axios from 'axios';
import { TimerContext } from './TimerContext';

const Home = () => {

    const [action, setAction] = useState('');

    const [userID, setUserID] = useState(null);

    const [difficulty, setDifficulty] = useState('easy'); // Default difficulty

    const navigate = useNavigate();

    const { startTimer } = useContext(TimerContext);

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    };

    const removeLocalStorageItems = (items) => {
        items.forEach(item => {
            if (localStorage.getItem(item) !== null) {
                localStorage.removeItem(item);
            }
        });
    };

    const handleStartSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userID');
        if (!userId) {
            // Handle the case where userID is not set
            console.error('User ID not found in local storage');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3010/userAttempts/${userId}`);
            const attempts = response.data[0]; // Assuming response data is an array with one object

            let difficultyValue;
            let attempt;
            if (difficulty === 'easy') {
                difficultyValue = 1;
                attempt = attempts.easyattempts;
            } else if (difficulty === 'med') {
                difficultyValue = 2;
                attempt = attempts.medattempts;
            } else if (difficulty === 'hard') {
                difficultyValue = 3;
                attempt = attempts.hardattempts;
            }

            localStorage.setItem('difficulty', difficultyValue); // Save the mapped difficulty value
            localStorage.setItem('attempt', parseInt(attempt) + 1); // Save the attempt count, plus one

            // Check if 'currentQuestion' exists in local storage
            if (!localStorage.getItem('currentQuestion')) {
                localStorage.setItem('currentQuestion', 1);
            }
            startTimer();
            navigate('/start-assessment');
        } catch (error) {
            console.error('Error fetching user attempts:', error);
        }
    };
    
    const handleAccountSubmit = (e) => {
        e.preventDefault();
        navigate('/AccountPage'); 
    }

    useEffect(() => {
        const storedUserID = localStorage.getItem('userID');
        if (storedUserID) {
          setUserID(storedUserID);
        }
        removeLocalStorageItems(['currProb', 'currProbId', 'currProbName', 'usedIndexes', 'currentQuestion', 'currDescription']);
        removeLocalStorageItems(['navigating','difficulty','attempt']);  // CLEAN OUT LOCALSTORAGE BEFORE STARTING AN ATTEMPT
        removeLocalStorageItems(['q1score','q1stars','q1time','q2score','q2stars','q2time','q3score','q3stars','q3time','q4score','q4stars','q4time']);
      }, []);

      // If the dependency array is empty ([]), the effect runs only once after the initial render.
      // If the dependency array includes variables, the effect re-runs whenever any of those variables change.


    return (
        <div className = 'home'>
            <div className = {`wrapper${action}`}>
                <div className = "homepage">
                <div>
                    <h1>Welcome, User {userID}</h1>
                </div>    
                <div>
                    <select value = {difficulty} onChange={handleDifficultyChange} className='homeSelect'>
                        <option value="easy">Easy</option>
                        <option value="med">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                    <button className='homeButton' type="submit" onClick={handleStartSubmit}>Start Assessment</button>
                    <button className='homeButton' type="submit" onClick={handleAccountSubmit}>My Account</button>
                </div>
            </div>
        </div>
    );
};

export default Home;