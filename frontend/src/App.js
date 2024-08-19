import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/loginRegister/loginRegister';
import Home from './components/pages/Home';
import AssessmentPage from './components/pages/AssessmentPage';
import ResultPage1 from './components/pages/ResultPage1';
import { TimerProvider } from './components/pages/TimerContext';
import AccountPage from './components/pages/AccountPage';
import ViewStats from './components/pages/viewStats';

function App() {
  return (
      <Router>
        <TimerProvider>
          <Routes>
              <Route path="/" element={<LoginRegister />} />
              <Route path="/home" element={<Home />} />
              <Route path="/start-assessment" element={<AssessmentPage />} />
              <Route path="/result1" element={<ResultPage1 />} />
              <Route path="/AccountPage" element={<AccountPage />} />
              <Route path="/ViewStats" element={<ViewStats />} />
          </Routes>
          </TimerProvider>
      </Router>
  );
}

export default App;