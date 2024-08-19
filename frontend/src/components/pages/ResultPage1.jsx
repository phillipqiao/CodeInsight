import React, { useContext, useState, useEffect } from 'react';
import { TimerContext } from './TimerContext';
import './resultPage.css';
import './TestResults.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ResultPage1 = () => {
  // const [question, setQuestion] = useState('');

  const location = useLocation();
  const { testData,updatedDescription,firstAttempt  } = location.state;
  const navigate = useNavigate();
  

  let [stars, setStars] = useState(1);

  const { timer, startTimer, pauseTimer, archivedTimes} = useContext(TimerContext);
  const DEFAULT_TIME = archivedTimes[0];

  const [loading, setLoading] = useState(true);
  const [testCasesPassed, setTestCasesPassed] = useState(4); // Example value
  const totalTestCases = testData.length; // Example value
  const [generatedCode, setGeneratedCode] = useState('');
  const [originalCode, setOriginalCode] = useState('');
  const [refinedAnswer, setRefinedAnswer] = useState('');
  const [reasonsForChanges, setReasonsForChanges] = useState('');
  const percentage = (testCasesPassed / totalTestCases) * 100;

  useEffect(() => {
    // Fetch generated code and original code from the database when the component mounts
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/result'); // Replace with your API endpoint
        const contentType = response.headers.get('content-type');
        console.log("Content-Type:", contentType);
        console.log("aaaa");
        const data = await response.json();
        setTestCasesPassed(data.testCasesPassed);
        setGeneratedCode(data.generatedCode);
        setOriginalCode(data.originalCode);
      } catch (error) {
        console.error('Error fetching code data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  

  const handleSubmit = () => {
    // navigate to assessment page to refine answer 
    navigate('/start-assessment', { state: { fromTestResults: true, allTrue  }});
  };

  const handleNextQuestion = () => {
    //Navigate to the next question (assessment page)
    console.log("Navigating to the next question");
    archivedTimes.length = 0;
    startTimer();
    navigate('/start-assessment', { state: { fromTestResults: true, allTrue  }});
  };

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  // for calculating Stars 
  const getScoreCategory = (percentage) => {
    if (percentage >= 0 && percentage <= 30) {
      return 0;
    } else if (percentage > 30 && percentage <= 60) {
      return 1;
    } else if (percentage > 60 && percentage <= 90) {
      return 2;
    } else if (percentage > 90) {
      return 3;
    } else {
      return 0; // Default to 0 star if something goes wrong
    }
  };
    
  useEffect (() => {
    setStars(getScoreCategory(percentage));
  }, [percentage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const runTests = () => {
    let totalScore = 0;
      const results = testData.map(test => {
        // Inject the function definition into the script context
        const script = new Function(updatedDescription + '\n' + test.val);
        let result;
        try {
            result = script();
        } catch (e) {
            result = 0; // If an error occurs, consider the test failed
        }


        totalScore += result;
        return { ...test, result };
      });

      return { totalScore, results };
  };  

  // Helper for 
  const evalFunc = (value) => {
    const script = new Function(updatedDescription + '\n' + 'return ' + value);
    let result = script(); 
    return result;
  }; 


  const { totalScore, results } = runTests();

  const correctAnswers = (totalScore / testData.length) * 100;
  const starscore = getScoreCategory(correctAnswers); //golden variable, do not touch!
  // console.log(`starscore is ${starscore}`);


const allTrue = totalScore === testData.length; // Did you answer everything correctly? 

// TODO : HANDLE THE TIME LOGIC, right now everything is DEFAULT TIME 
// If this is the first attempt, then save the stats into local storage. 
if (firstAttempt) {
  const currProbName = localStorage.getItem('currProbName');
  if (currProbName) {
    const numberInName = currProbName.match(/\d/)[0];

    switch (numberInName) {
      case '1':
        localStorage.setItem('q1score', totalScore);
        localStorage.setItem('q1stars', getScoreCategory(totalScore / testData.length * 100) ); 
        localStorage.setItem('q1time', DEFAULT_TIME); 
        break;
      case '2':
        // console.log('Case 2: easy2, med2, etc.');
        localStorage.setItem('q2score', totalScore);
        localStorage.setItem('q2stars', getScoreCategory(totalScore / testData.length * 100) ); 
        localStorage.setItem('q2time', DEFAULT_TIME);
        break;
      case '3':
        // console.log('Case 3: easy3, med3, etc.');
        localStorage.setItem('q3score', totalScore);
        localStorage.setItem('q3stars', getScoreCategory(totalScore / testData.length * 100) ); 
        localStorage.setItem('q3time', DEFAULT_TIME);
        break;
      case '4':
        // console.log('Case 4: easy4, med4, etc.');
        localStorage.setItem('q4score', totalScore);
        localStorage.setItem('q4stars', getScoreCategory(totalScore / testData.length * 100) ); 
        localStorage.setItem('q4time', DEFAULT_TIME);
        break;
      default:
        // console.log('No valid case found');
    }
  }
}


const resultStyle = (result) => ({
  color: result === 1 ? 'green' : 'red'
});

const finalResults = () => (
    <div className="test-results">
      <h2 className="test-results-title">Test Results</h2>
      <div className="updated-description">
        <strong>Updated Description:</strong>
        <pre>{updatedDescription}</pre>
      </div>
      {results.map((test, index) => (
        <div key={index} className="test-item">
          <h3>{test.tname}</h3>
          <pre>Actual output: {JSON.stringify(evalFunc(test.fcall))} {/*test.val*/}</pre>
          <p style={resultStyle(test.result)}>
              {test.result === 1 ? 'Pass' : 'Fail'}
          </p>
        </div>
      ))}
      <div className="score">
        <p>Score: {totalScore} / {testData.length}</p>
      </div>
      <div className="stars-container">
        
        {[...Array(3)].map((star, index) => (
          <span key={index} style={{ fontSize: '2em', color: index < starscore ? 'gold' : 'lightgray' }}>
            ★
          </span>
        ))}
      </div>
    </div>
); 

  return (
    <div className = 'result'>
    <div className="result-container">
      <h2 className="result-title">Result Page</h2>
      
      <div className="stars-container">
        {[...Array(3)].map((star, index) => (
          <span key={index} style={{ fontSize: '2em', color: index < starscore ? 'gold' : 'lightgray' }}>
            ★
          </span>
        ))}
      </div>
      <div className="test-cases-result">
        <strong>You Passed</strong> {totalScore} / {testData.length} test cases.
      </div>
      <div className="percentage-result">
        <strong>You got</strong> {(totalScore / testData.length * 100).toFixed(0)}%
      </div>
      <div className="code-sample-container">
        <label>
          <strong>Test cases run :  </strong>
          <div>{finalResults()}</div>
         
        </label>
      </div>
      <div className="generated-original-container">
        <div>
          <label>
            <strong>Generated Code</strong>
            <SyntaxHighlighter language="javascript" style={ tomorrow } 
                customStyle={{
                padding: "12px",
                borderRadius: "15px",
                marginTop: "10px",
                fontSize: "15px"
            }}
            >
              {localStorage.getItem('currentOlla')}         
            </SyntaxHighlighter>
          </label>
        </div>
        <div>
          <label>
            <strong>Original Code</strong>
            <SyntaxHighlighter language="javascript" style={ tomorrow } 
              customStyle={{
              padding: "12px",
              borderRadius: "15px",
              marginTop: "10px",
              fontSize: "15px"
            }}
            >
            {localStorage.getItem('currProb')}        
            </SyntaxHighlighter>
          </label>
        </div>
      </div>
      
      <div>
        {correctAnswers < 100 ? (
          <button onClick={handleSubmit} className='submit-button'>
            Refine Answer
          </button>
        ) : (
          <button onClick={handleNextQuestion} className='submit-button next-question-button'>
            Next Question
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default ResultPage1;