import React, { useContext } from 'react';
import "./modal.css";
import { TimerContext } from '../pages/TimerContext';


function PauseModal({ setOpenModal }) {

  const { timer, startTimer } = useContext(TimerContext);

  const handleResumeSubmit = () => {
    setOpenModal(false);
    startTimer();
  };

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Assessment Paused</h1>
        </div>

        <div className="body">
          <p className="time-used"> Time Used : {formatTime(timer)} </p>
        </div>

        <div className="body">
          <p>Please Click the "Resume" button to Continue!</p>
        </div>
        <div className="footer">
          <button
            onClick={handleResumeSubmit}
            id="resumeBtn"
          >
            Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default PauseModal;