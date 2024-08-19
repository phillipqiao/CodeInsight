import React, { createContext, useState, useEffect } from 'react';

const TimerContext = createContext();

//Timer feature for adding up total time used for a 4-question assessment
const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [archivedTimes, setArchivedTimes] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimer(0);
  };

  const archiveCurrentTime = () => {
    setArchivedTimes((prevTimes) => [...prevTimes, timer]);
    resetTimer();
  };


  return (
    <TimerContext.Provider value={{ timer, startTimer, pauseTimer, resetTimer, archiveCurrentTime, archivedTimes }}>
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };