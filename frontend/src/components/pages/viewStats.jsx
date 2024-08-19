import React, {useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewStats = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pastAttempts } = location.state || {};

    const [showAttempts, setShowAttempts] = useState(false);
    const [showStats, setShowStats] = useState(false); // display the calculated stats 
    const [showClassStats, setShowClassStats] = useState(false); 

    const [difficulty, setDifficulty] = useState("all"); // Default difficulty

    const [targetStat, setTargetStat] = useState("avgscore");

    const [classStats, setClassStats] = useState({}); // Store the fetched Class data


    //------------------------------------------------------------------------------------------------------------
    // HELPERS 
  
    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
        setShowClassStats(false); 
        // Force pull new class stats from DataBase on difficulty change 
    };

    const handleTargetStatChange = (e) => {
      setTargetStat(e.target.value);
      setShowClassStats(false); 
    }; 

    const handleShowStats = () => {
      setShowStats(true);
    };

    // ensure the target cols are named correctly when querying
    const mapTargetStat = (value) => {
        switch(value) {
          case "avgscore":
            return "avgScore"; 
          case "avgtime":
            return "avgTime"; 
          case "avgstars":
            return "avgStars";   
          case "totalstars":
            return "totalStars"; 
          default: 
            return value;     
        }
    }; 
    // Should handle both forward and reverse direction mapping,
    const mapDifficulty = (value) => {
        switch(value) {
            case 1:
                return "easy";
            case 2:
                return "med";
            case 3:
                return "hard";
            case "easy":
                return 1; 
            case "med":
                return 2; 
            case "hard":
                return 3; 
            case "all":
                return 0; 
            default:
                return '';
        }
      };


    const filteredAttempts = pastAttempts.filter(attempt => {
        if (difficulty === "all") {
            return true;
        }
        const attemptDifficulty = mapDifficulty(attempt.diff);
        return attemptDifficulty === difficulty;
        // return false;
    });


    // Render the pastAttempts data for debugging DO NOT DELETE
    const renderDebugInfo = () => {
        return (
            <pre style={styles.pre}>
                {JSON.stringify(pastAttempts, null, 2)}
            </pre>
        );
    };

    const displayNulls = (value) => {
      if ((value === -1) || (value === null)) {
        return "invalid";
      } else {
        return value; 
      }
    }; 

    const calculateStats = (data) => {
      // Filter out invalid values
      const validData = data.filter(value => value !== -1 && value !== null);
  
      if (validData.length === 0) return {};
  
      const mean = validData.reduce((a, b) => a + b, 0) / validData.length;
      const sortedData = [...validData].sort((a, b) => a - b);
      const median = sortedData[Math.floor(sortedData.length / 2)];
      const range = Math.max(...validData) - Math.min(...validData);
      const std_dev = Math.sqrt(validData.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / validData.length);
      const n = validData.length;
      const t_value = 1.96; // Approx value for 95% CI
      const margin_of_error = t_value * std_dev / Math.sqrt(n);
      const lower_95_ci = mean - margin_of_error;
      const upper_95_ci = mean + margin_of_error;
  
      return {
        mean,
        median,
        range,
        lower_95_ci,
        upper_95_ci
      };
    };
    
const handleShowClassStats = async () => {
  if (showClassStats === true) {
    setShowClassStats(false); 
  } else {
    
    // if difficulty === "all" or mapDifficulty(difficulty) === 0 
    // use the router path to get all questionAttempts of the target column, whose value is targetStat
     
    // else difficulty must be one of "easy", "med", or "hard"
    // mapDifficulty(difficulty) should return the correct integer 

    // use targetStat, mapDifficulty(difficulty) as arguments 
    // against the route Route to get a specific column from question attempts by difficulty
    
    try {
      let response;
      const actualTargetStat = mapTargetStat(targetStat); 
      if (difficulty === "all" || mapDifficulty(difficulty) === 0) {
          // Fetch all questionAttempts of the target column
          response = await axios.get(`http://localhost:3010/questionAttempts/column/${actualTargetStat}`);
      } else {
          // Fetch specific column from questionAttempts by difficulty
          const difficultyNum = mapDifficulty(difficulty);
          response = await axios.get(`http://localhost:3010/questionAttempts/filter/${difficultyNum}/column/${actualTargetStat}`);
      }

      console.log('Fetched data:', response.data);
      // This data should already be filtered when pulled from the database. 
      const classStats = targetStat ? calculateStats(response.data.map(attempt => attempt[targetStat])) : {};
      // Set the classStats state 
      setClassStats(classStats);
      setShowClassStats(true);// Set this to true after successful fetch of data. 
    
  } catch (err) {
      console.error('Error fetching class stats:', err.message);
  }

  }
}; 
 //-----------------------------------------------------------------------------------------------------------------

 const styles = {
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'flex-start', // Ensures alignment at the top
  },
  statsSection: {
    flex: 1,
    margin: '0 10px',
    maxWidth: '150%', // Limits the width of each section
  },
  container: {
      backgroundColor: 'black',
      color: 'white',
      minHeight: '100vh',
      padding: '20px',
      width: '100%',            
      background: 'transparent', 
      border: '2px solid rgba(255, 255, 255, 1)',
      backdropFilter: 'blur(66px)', 
      borderRadius: '10px'   
  },
  button: {
      margin: '10px',
      padding: '10px 20px',
      backgroundColor: '#fff',
      color: 'black',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
      borderRadius: '40px', 
      fontWeight: '700'
  },
  table: {
      width: '100%',
      borderCollapse: 'collapse'
  },
  th: {
      border: '1px solid white',
      padding: '8px'
  },
  td: {
      border: '1px solid white',
      padding: '8px'
  },
  select: {
    margin: '10px',
    padding: '5px 10px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid rgba(255, 255, 255, 1)',
    borderRadius: '10px',
    outline: 'none',
    cursor: 'pointer',
    fontWeight: 400,
    fontSize: '12px'
  },
  selectHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    color: 'blue', 
    borderColor: 'blue' 
  },
  option: {
      backgroundColor: 'white',
      color: 'black',
      padding: '10px',
      fontWeight: 700
  }
};
    
    
    const stats = targetStat ? calculateStats(filteredAttempts.map(attempt => attempt[targetStat])) : {};

    return (
        <div style={styles.container}>
          <button onClick={() => navigate('/AccountPage')} style={styles.button}>
            Back to Account Page
          </button>
          <button onClick={() => setShowAttempts(prevState => !prevState)} style={styles.button}>
            {showAttempts ? 'Hide Past Attempts' : 'Display Past Attempts'}
          </button>
          Select Stat to calculate :  
          <select value={targetStat} onChange={handleTargetStatChange} style={{ ...styles.select, ':hover': styles.selectHover }}>
              <option value="avgscore" style={styles.option}>avgscore</option>
              <option value="q1score" style={styles.option}>q1score</option>
              <option value="q1stars" style={styles.option}>q1stars</option>
              <option value="q1time" style={styles.option}>q1time</option>
              <option value="q2score" style={styles.option}>q2score</option>
              <option value="q2stars" style={styles.option}>q2stars</option>
              <option value="q2time" style={styles.option}>q2time</option>
              <option value="q3score" style={styles.option}>q3score</option>
              <option value="q3stars" style={styles.option}>q3stars</option>
              <option value="q3time" style={styles.option}>q3time</option>
              <option value="q4score" style={styles.option}>q4score</option>
              <option value="q4stars" style={styles.option}>q4stars</option>
              <option value="q4time" style={styles.option}>q4time</option>
              <option value="avgtime" style={styles.option}>avgtime</option>
              <option value="avgstars" style={styles.option}>avgstars</option>
              <option value="totalstars" style={styles.option}>totalstars</option> 
              {/*<option value="">Select Stat</option> */}
              {/*filteredAttempts.length > 0 && Object.keys(filteredAttempts[0]).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))*/}
          </select>
          <button onClick={handleShowStats} style={styles.button}>Show Stats</button>

          {showStats && targetStat && (
                <div className="popup" style={styles.popup}>
                  <div style={styles.statsContainer}>
                        <div style={styles.statsSection}>
                          <h2>Statistics for {targetStat}</h2>
                          <p><strong>Mean:</strong> {stats.mean?.toFixed(2)}</p>
                          <p><strong>Median:</strong> {stats.median?.toFixed(2)}</p>
                          <p><strong>Range:</strong> {stats.range?.toFixed(2)}</p>
                          <p><strong>Lower 95% CI:</strong> {stats.lower_95_ci?.toFixed(2)}</p>
                          <p><strong>Upper 95% CI:</strong> {stats.upper_95_ci?.toFixed(2)}</p>
                          <button onClick={() => setShowStats(false)} style={styles.button}>Close</button>
                          <button onClick={handleShowClassStats} style={styles.button}>Class stats</button>
                        </div>
                        {showClassStats && (
                        <div className="class-stats" style={styles.statsSection}>
                            <h2>Class Statistics for {targetStat}</h2>
                            <p><strong>Class Mean:</strong> {classStats.mean?.toFixed(2)}</p>
                            <p><strong>Class Median:</strong> {classStats.median?.toFixed(2)}</p>
                            <p><strong>Class Range:</strong> {classStats.range?.toFixed(2)}</p>
                            <p><strong>Class Lower 95% CI:</strong> {classStats.lower_95_ci?.toFixed(2)}</p>
                            <p><strong>Class Upper 95% CI:</strong> {classStats.upper_95_ci?.toFixed(2)}</p>
                            {targetStat !== 'q1time' && targetStat !== 'q2time' && targetStat !== 'q3time' && targetStat !== 'q4time' && targetStat !== 'avgtime' ? (
                            <div>
                                {stats.mean > classStats.mean ? (
                                    <p  style={{ color: 'lightblue' }} >You did better than class average.</p>
                                ) : stats.mean === classStats.mean ? (
                                    <p  style={{ color: 'lightblue' }} >You did about class average.</p>
                                ) : (
                                    <p style={{ color: 'pink' }} >Keep Trying! You can do it.</p>
                                )}
                            </div>
                          ) : (
                            <div>
                                {stats.mean > classStats.mean ? (
                                    <p style={{ color: 'pink' }}>You are slower than class average.</p>
                                ) : stats.mean === classStats.mean ? (
                                    <p style={{ color: 'lightblue' }}>You did about class average.</p>
                                ) : (
                                    <p style={{ color: 'lightblue' }} >You are faster than class average.</p>
                                )}
                            </div>
                          )}
                        </div>
                        )}
                  </div>
              </div>
            )}
          <div>
            Filter Data : 
            <select value={difficulty} onChange={handleDifficultyChange} style={{ ...styles.select, ':hover': styles.selectHover }}>
              <option value="all" style={styles.option}>All</option>
              <option value="easy" style={styles.option}>Easy</option>
              <option value="med" style={styles.option}>Medium</option>
              <option value="hard" style={styles.option}>Hard</option>
            </select>
          </div>
          {showAttempts && (
            <>
              {(!pastAttempts || filteredAttempts.length === 0) ? (
                <p>No attempts to show</p>
              ) : (
                <div className="attempts-display">
                  <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>User ID</th>
                          <th style={styles.th}>Diff</th>
                          <th style={styles.th}>Attempt Num</th>
                          <th style={styles.th}>Q1 Score</th>
                          <th style={styles.th}>Q1 Stars</th>
                          <th style={styles.th}>Q1 Time</th>
                          <th style={styles.th}>Q2 Score</th>
                          <th style={styles.th}>Q2 Stars</th>
                          <th style={styles.th}>Q2 Time</th>
                          <th style={styles.th}>Q3 Score</th>
                          <th style={styles.th}>Q3 Stars</th>
                          <th style={styles.th}>Q3 Time</th>
                          <th style={styles.th}>Q4 Score</th>
                          <th style={styles.th}>Q4 Stars</th>
                          <th style={styles.th}>Q4 Time</th>
                          <th style={styles.th}>Total Score</th>
                          <th style={styles.th}>Avg Score</th>
                          <th style={styles.th}>Total Time</th>
                          <th style={styles.th}>Avg Time</th>
                          <th style={styles.th}>Total Stars</th>
                          <th style={styles.th}>Avg Stars</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAttempts.map((attempt, index) => (
                          <tr key={index}>
                            <td style={styles.td}>{attempt.userid}</td>
                            <td style={styles.td}>{mapDifficulty(attempt.diff)}</td>
                            <td style={styles.td}>{attempt.attemptnum}</td>
                            <td style={styles.td}>{displayNulls(attempt.q1score)}</td>
                            <td style={styles.td}>{displayNulls(attempt.q1stars)}</td>
                            <td style={styles.td}>{displayNulls(attempt.q1time)}</td>
                            <td style={styles.td}>{displayNulls(attempt.q2score)}</td>
                            <td style={styles.td}>{displayNulls(attempt.q2stars)}</td>
                            <td style={styles.td}>{displayNulls(attempt.q2time)}</td>
                            <td style={styles.td}>{displayNulls(attempt.q3score)}</td>
                            <td style={styles.td}>{displayNulls(attempt.q3stars)}</td>
                            <td style={styles.td}>{displayNulls(attempt.q3time)}</td>
                            <td style={styles.td}>{displayNulls(attempt.q4score)}</td>
                            <td style={styles.td}>{displayNulls(attempt.q4stars)}</td>
                            <td style={styles.td}>{displayNulls(attempt.q4time)}</td>
                            <td style={styles.td}>{displayNulls(attempt.totalscore)}</td>
                            <td style={styles.td}>{displayNulls(attempt.avgscore)}</td>
                            <td style={styles.td}>{displayNulls(attempt.totaltime)}</td>
                            <td style={styles.td}>{displayNulls(attempt.avgtime)}</td>
                            <td style={styles.td}>{displayNulls(attempt.totalstars)}</td>
                            <td style={styles.td}>{displayNulls(attempt.avgstars)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
          {/* renderDebugInfo() */}
        </div>
      );
};

export default ViewStats;