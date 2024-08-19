import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './assessmentPage.css';
import { TimerContext } from './TimerContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import PauseModal from '../modals/pauseModal';

const AssessmentPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { timer, startTimer, pauseTimer, archiveCurrentTime} = useContext(TimerContext);
  const [isRunning, setIsRunning] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const [codeSample, setCodeSample] = useState('');
  const [question, setQuestion] = useState(null); // ROBERT
  const [description, setDescription] = useState('');
  
  const [currentQuestion, setCurrentQuestion] = useState(parseInt(localStorage.getItem('currentQuestion')) || 1); // Update when user hits "Next Question" on result pages.
  const totalQuestions = 4;  // MAGIC NUMBER, DO NOT CHANGE THIS 
  const [currUsedIndex, setCurrUsedIndex] = useState(null);

  const [answerKeyVal, setAnswerKeyVal] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // For extra displaying
  const [userId, setUserId] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [attempt, setAttempt] = useState('');

  const { fromTestResults, allTrue } = location.state || {};

  const [firstAttempt, setFirstAttempt] = useState(true);

  //For loading popup
  const [loading, setLoading] = useState(false); //Dylan


  const removeLocalStorageItems = (items) => {
    items.forEach(item => {
        if (localStorage.getItem(item) !== null) {
            localStorage.removeItem(item);
        }
    });
};  

  // run AFTER a successful completion 
  const saveThisAttempt = async () => {

    try { 

       // Fetch all of our things from localStorage
      const userId = localStorage.getItem('userID');
      const difficulty_num = localStorage.getItem('difficulty');
      const attempt = localStorage.getItem('attempt');

      // Fetch all of our things from localStorage 
      const q1score = localStorage.getItem('q1score') !== null ? parseFloat(localStorage.getItem('q1score')) : -1;
      const q1stars = localStorage.getItem('q1stars') !== null ? parseInt(localStorage.getItem('q1stars')) : -1;
      const q1time = localStorage.getItem('q1time') !== null ? parseFloat(localStorage.getItem('q1time')) : -1;
      const q2score = localStorage.getItem('q2score') !== null ? parseFloat(localStorage.getItem('q2score')) : -1;
      const q2stars = localStorage.getItem('q2stars') !== null ? parseInt(localStorage.getItem('q2stars')) : -1;
      const q2time = localStorage.getItem('q2time') !== null ? parseFloat(localStorage.getItem('q2time')) : -1;
      const q3score = localStorage.getItem('q3score') !== null ? parseFloat(localStorage.getItem('q3score')) : -1;
      const q3stars = localStorage.getItem('q3stars') !== null ? parseInt(localStorage.getItem('q3stars')) : -1;
      const q3time = localStorage.getItem('q3time') !== null ? parseFloat(localStorage.getItem('q3time')) : -1;
      const q4score = localStorage.getItem('q4score') !== null ? parseFloat(localStorage.getItem('q4score')) : -1;
      const q4stars = localStorage.getItem('q4stars') !== null ? parseInt(localStorage.getItem('q4stars')) : -1;
      const q4time = localStorage.getItem('q4time') !== null ? parseFloat(localStorage.getItem('q4time')) : -1;
  
      // Calculate new things, excluding -1 values
      const scores = [q1score, q2score, q3score, q4score].filter(score => score !== -1);
      const stars = [q1stars, q2stars, q3stars, q4stars].filter(star => star !== -1);
      const times = [q1time, q2time, q3time, q4time].filter(time => time !== -1);
      
        // .reduce() method in JavaScript is used to iterate over an array and reduce it to a single value.
        // It executes a reducer function on each element of the array, passing the result of the previous computation to the next computation.
      const totalScore = scores.reduce((acc, curr) => acc + curr, 0);
      const avgScore = scores.length > 0 ? totalScore / scores.length : 0;
  
      const totalTime = times.reduce((acc, curr) => acc + curr, 0);
      const avgTime = times.length > 0 ? totalTime / times.length : 0;
  
      const totalStars = stars.reduce((acc, curr) => acc + curr, 0);
      const avgStars = stars.length > 0 ? totalStars / stars.length : 0;

      const data = {
        userId,
        diff: parseInt(difficulty_num),
        attemptNum: parseInt(attempt),
        q1score, q1stars, q1time,
        q2score, q2stars, q2time,
        q3score, q3stars, q3time,
        q4score, q4stars, q4time,
        totalScore, avgScore,
        totalTime, avgTime,
        totalStars, avgStars
    };
       // Send the POST request to insert the new question attempt
       const response = await axios.post('http://localhost:3010/questionAttempts', data);
       console.log('Attempt saved successfully:', response.data);

       // UPDATE userAttempts
      // Attempt has already been incremented. 
      const newAttempt = attempt;
       // Update userAttempts based on difficulty
       switch (parseInt(difficulty_num)) {
        case 1: // Easy
            await axios.put(`http://localhost:3010/userAttempts/easy/${userId}`, { easyAttempts: newAttempt });
            console.log('easyAttempts updated successfully');
            break;
        case 2: // Medium
            await axios.put(`http://localhost:3010/userAttempts/med/${userId}`, { medAttempts: newAttempt });
            console.log('medAttempts updated successfully');
            break;
        case 3: // Hard
            await axios.put(`http://localhost:3010/userAttempts/hard/${userId}`, { hardAttempts: newAttempt });
            console.log('hardAttempts updated successfully');
            break;
        default:
            console.error('Invalid difficulty number');
            break;
    }

    } catch (err) {
      console.error('Error saving attempt:', err.message);
    }
  
  }; 


const mapDifficulty = (value) => {
  switch(value) {
      case '1':
          return 'easy';
      case '2':
          return 'med';
      case '3':
          return 'hard';
      default:
          return '';
  }
};

  // FETCHING QUESTIONS 
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  // Any question fetching runs in the useEffect, so runs as soon as we enter.

  const fetchAnyQuestion = async () => {
    try {
        const difficulty = localStorage.getItem('difficulty');
        const response = await axios.get(`http://localhost:3010/questionBank/difficulty/${difficulty}`);
        const questions = response.data;

        if (questions.length > 0) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            const newQuestion = questions[randomIndex];

            setQuestion(newQuestion);
            setCodeSample(newQuestion.val); // Assuming 'val' contains the code sample 
            localStorage.setItem('currProb', newQuestion.val);
            localStorage.setItem('currProbId', newQuestion.id);
            localStorage.setItem('currProbName', newQuestion.qname);
            setCurrUsedIndex(randomIndex);
            setFirstAttempt(true); // first attempt 
        }
    } catch (error) {
        console.error('Error fetching code sample:', error);
    }
};

const fetchNewQuestion = async (usedIndexes) => {
  try {
      const difficulty = localStorage.getItem('difficulty');
      const response = await axios.get(`http://localhost:3010/questionBank/difficulty/${difficulty}`);
      const questions = response.data;

      // Filter out questions that have been used before
      const availableQuestions = questions.filter((_, index) => !usedIndexes.includes(index));

      if (availableQuestions.length === 0) {
        // No available questions, navigate to home and clear local storage
        // localStorage.removeItem('currProb');  // can also remove item this way.
        saveThisAttempt();
        removeLocalStorageItems(['currProb', 'currProbId', 'currProbName', 'usedIndexes', 'currentQuestion', 'currDescription']);
        removeLocalStorageItems(['q1score','q1stars','q1time','q2score','q2stars','q2time','q3score','q3stars','q3time','q4score','q4stars','q4time']);
        navigate('/home');
        return;
    }

      if (availableQuestions.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableQuestions.length);
          const newQuestion = availableQuestions[randomIndex];
          const newIndex = questions.indexOf(newQuestion);

          setQuestion(newQuestion);
          setCodeSample(newQuestion.val); // Assuming 'val' contains the code sample 
          localStorage.setItem('currProb', newQuestion.val);
          localStorage.setItem('currProbId', newQuestion.id);
          localStorage.setItem('currProbName', newQuestion.qname);
          setFirstAttempt(true); // first attempt 

          // Update used indexes
          usedIndexes.push(newIndex);
          localStorage.setItem('usedIndexes', JSON.stringify(usedIndexes));
      }
  } catch (error) {
      console.error('Error fetching code sample:', error);
  }
};

const fetchAnswerKey = async () => {
  try {
      const currProbId = localStorage.getItem('currProbId');
      if (!currProbId) {
          console.error('currProbId is not set in local storage');
          return;
      }
      const response = await axios.get(`http://localhost:3010/answerKey/${currProbId}`);
      const answerKey = response.data[0]; // Assuming the first item in the array is the answer key we need
      setAnswerKeyVal(answerKey.val);
  } catch (error) {
      console.error('Error fetching answer key:', error);
  }
};


//-----------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    
    const userId = localStorage.getItem('userID');
    const difficulty = localStorage.getItem('difficulty');
    const attempt = localStorage.getItem('attempt');
        
    setUserId(userId);
    setDifficulty(mapDifficulty(difficulty));
    setAttempt(attempt);
    
    // Fetch questions from the database based on difficulty when the component mounts
    const shouldFetch = !location.state || !location.state.fromTestResults;
    let usedIndexes = JSON.parse(localStorage.getItem('usedIndexes')) || [];
    if (shouldFetch) {
      localStorage.removeItem('currDescription');
      fetchAnyQuestion();
      localStorage.setItem('currentQuestion', 1);
      setCurrentQuestion(1);
  } else {
      if (allTrue) {
          localStorage.removeItem('currDescription');
          fetchNewQuestion(usedIndexes);
      } else {
          const val = localStorage.getItem('currProb');
          const des = localStorage.getItem('currDescription');
          setCodeSample(val);
          setQuestion(val);
          setDescription(des);
          setDescription(null);
          const updatedQuestion = currentQuestion - 1;
          setCurrentQuestion(updatedQuestion);
          localStorage.setItem('currentQuestion', updatedQuestion);
          setFirstAttempt(false); // we got questions wrong on the previous attempt
      }
  } 


  // DO NOT DELETE FOR NOW, IDEALLY, HANDLES CLEANING UP DATA IF WE ACCIDENTLY NAVIGATE AWAY

  //  const handleBeforeUnload = (event) => {
  //     // Mark that the user is navigating away
  //     localStorage.setItem('navigating', 'true');
  //   };

  //  const handleUnload = (event) => {
  //     if (localStorage.getItem('navigating') === 'true') {
  //        // If navigating, do not clear storage
  //         localStorage.removeItem('navigating');
  //     } else {
  //         // If not navigating (i.e., closing the browser), clear storage i.e. everything except userid 
  //         // localStorage.clear();
  //         removeLocalStorageItems(['currProb', 'currProbId', 'currProbName', 'usedIndexes', 'currentQuestion', 'currDescription']);
  //         removeLocalStorageItems(['navigating','difficulty','attempt']); 
  //         // TODO : Remeber the two arrays, one that stores the score for q1 to q4, the other that stores the time
  //         // TODO : Implement the time mechanism 

  //     }
  //  };

  //  window.addEventListener('beforeunload', handleBeforeUnload);
  //  window.addEventListener('unload', handleUnload);

  // return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     window.removeEventListener('unload', handleUnload);
  // };
   
  }, [location.state]);

  const handlePauseSubmit = () => {
    pauseTimer();
    setModalOpen(true);
  };

    
  // CHECK THE USER ANSWER AGAINST OUR TEST CASES 
  //-------------------------------------------------------------------------------------------------------------------------------

  // Replaces the description with something the eval function can read 
  const handleCheckAns = async () => {  
 
      console.log('Check your description button clicked');

      //timer pauses and archieve the current time for submitting single question, timer resets afterwards
      // Retrieve currProbId from local storage
      const probId = localStorage.getItem('currProbId');
      pauseTimer();
      archiveCurrentTime(probId);
      
      // Retrieve currProbName from local storage
      const currProbName = localStorage.getItem('currProbName');

      // Check if currProbName is correctly retrieved
      if (!currProbName) {
        console.error('currProbName is not set in local storage');
        return;
      }

      //shows loading popup 
      setLoading(true);
      //Query ollama and get the code response
      const ollamaResponse = await queryOllama();
      // const ollamaResponse = description; // skip ollama for test bank
      //hides the pop up once the ollama response is back 
      setLoading(false);

      // Use regular expression to find and replace the function name
      const updatedDescription = ollamaResponse.replace(/function\s+(\w+)\s*\(/, `function ${currProbName}(`);
      
      
      // Update the description state with the updated description
      // NOT NECESSARY ANYMORE
      // setDescription(updatedDescription);
      localStorage.setItem('currentOlla', updatedDescription);
    
      console.log('Updated description:', updatedDescription);
      
       // Call testAns after updating the description
       // also checking if the code is runnable because it crashes if its not runnable 

      if (isRunnableCode(updatedDescription)) {
        testAns(updatedDescription);
      }
  }; 

  //helper for handleCheckAns
  //to check if the created code from ollama is runnable so it doesn't crash

function isRunnableCode(code) {
  try {
    const func = new Function(code);
    func(); // Execute the function code
    return true;
  } catch (e) {
    console.error('Function code threw an error:', e);
    return false;
  }
}


  // Helper for handleCheckAns 
  const testAns = async (updatedDescription) => {
    
    try {
      // Retrieve currProbId from local storage
      const currProbId = localStorage.getItem('currProbId');
      
      if (!currProbId) {
        console.error('currProbId is not set in local storage');
        return;
      }
      
      // Fetch the test data by ID
      const response = await axios.get(`http://localhost:3010/testBank/${currProbId}`);
      const testData = response.data;
  
      console.log('Test data:', testData);
      
      // Navigate to the new page with the test data
      navigate('/result1', { state: { testData, updatedDescription, firstAttempt, fromTestResults : true } });

      // Increment the current question number 
      const newQuestionNumber = currentQuestion + 1; 
      setCurrentQuestion(newQuestionNumber);
      localStorage.setItem('currentQuestion', newQuestionNumber); 
      localStorage.setItem('currDescription', updatedDescription); 

       // Save currUsedIndex into 'usedIndexes' if shouldFetch is true
       if (currUsedIndex !== null) {
          let usedIndexes = JSON.parse(localStorage.getItem('usedIndexes')) || [];
          usedIndexes.push(currUsedIndex);
          localStorage.setItem('usedIndexes', JSON.stringify(usedIndexes));
          setCurrUsedIndex(null); 
       }

    } catch (error) {
      console.error('Error fetching test data:', error);
    }
  }; 


const messageStyle = {
    color: allTrue ? 'lightblue' : 'pink'
 };

 //-------------------------------------------------------------------------------------------------------------------------------

  // For querying Ollama 
  const queryOllama = async () => {
    try {
        const payload = {
            "model": "stable-code:3b",
            "prompt": JSON.stringify("return the response following the template : {javascript code of the function}. Write me " + description + ". Don't add extra closed brackets. Ensure the code is runnable. Ensure that every forward bracket has one closed bracket. ")
        };
        const response = await axios.post('http://localhost:4000', payload);
        const data = response.data.data;
        setDescription(data);
        return data;
    } catch (error) {
        console.error('Error querying Ollama:', error);
        setDescription("failed", error);
    }
};





//-------------------------------------------------------------------------------------------------------------------------------

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <div className = 'assessment'>
    <div className="assessment-container">
      <h2 className="assessment-title">Assessment Page</h2>
      <div>
                <h3>Assessment Details:</h3>
                <p>UserID: {userId}</p>
                <p>Difficulty: {difficulty}</p>
                <p>Attempt: {attempt}</p>
      </div>
      <div className="timer-container">
        <span>Timer</span>
        <div className="timer-time">{formatTime(timer)}</div>
      </div>
      <div className="code-sample-container">
        <label>
          <strong>Code Sample : </strong>
          <SyntaxHighlighter language="javascript" style={ tomorrowNight } 
            customStyle={{
              padding: "20px",
              borderRadius: "15px",
              marginTop: "10px",
            }}
          >
          {codeSample}          
          </SyntaxHighlighter>
        </label>
      </div>
      {fromTestResults && (
        <div className="test-result-info">
           <p style={messageStyle} >{allTrue ? 'Congratulations! You passed all tests.' : 'Some tests failed. Please try again.'}</p>
        </div>
      )}
      {!question && <p>No questions available for the selected difficulty.</p>}
      <div className="description-container">
        <label>
          <strong>Describe the function : </strong>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', borderRadius: "15px", }}
          />
        </label>
      </div>

      <div className={`loadingModal ${loading ? 'show' : ''}`}>
          <div className="loadingModal-content">
            <span className="loading-text">Loading</span>
          </div>
        </div>
 
      <div className="progress-container">
        <strong>Current Progress:</strong> Question {currentQuestion} out of {totalQuestions}
      </div>
      {fromTestResults && !allTrue && (
                <div>
                    {/* <button 
                        onClick={fetchAnswerKey} 
                        className="submit-button fetch-answer-key-button" 
                    >
                        Fetch Answer Key
                    </button> */}
                    {answerKeyVal && (
                        <div className="answer-key" style={{ color: 'lightblue' }}>
                            <strong>Answer Key:</strong>
                            <pre>{answerKeyVal}</pre>
                        </div>
                    )}
                </div>
      )}
      <div>
        <button onClick={handleCheckAns} className="submit-button">
          Submit
        </button>

        <button onClick={handlePauseSubmit} className="submit-button">
          Pause
        </button>

        {fromTestResults && !allTrue && (
                    <button 
                        onClick={fetchAnswerKey} 
                        className="submit-button" 
                        style={{
                          backgroundColor: '#90ee90',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease'
                      }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#76c376'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#90ee90'}
                    >
                        Fetch Answer Key
                    </button>
        )}

        <span className="submit-status">{submitStatus}</span>
      </div>
    </div>
      {modalOpen && <PauseModal setOpenModal={setModalOpen} />}
    </div>
  );
};

export default AssessmentPage;