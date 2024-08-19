DROP TABLE IF EXISTS userAttempts;
DROP TABLE IF EXISTS questionAttempts; 
DROP TABLE IF EXISTS userStats; 

-- KEEPS TRACK OF HOW MANY ATTEMPTS FOR EACH QUESTION FOR A SINGLE USER, and TOTAL STARS 
CREATE TABLE userAttempts (
   userId INT PRIMARY KEY, 
   
   easyAttempts INT, 
   medAttempts INT, 
   hardAttempts INT,
   
   FOREIGN KEY (userId) REFERENCES users(id)
); 

-- INIT EMPTY, EACH TIME A USER COMPLETES AN ATTEMPT, ADD AN ENTRY TO THIS. 
CREATE TABLE questionAttempts (
   userId INT,
   diff INT, -- 1 = easy, 2 = med, 3 = hard
   attemptNum INT,
   
   q1score INT,
   q1stars INT, 
   q1time FLOAT,  
   q2score INT,
   q2stars INT, 
   q2time FLOAT,
   q3score INT,
   q3stars INT, 
   q3time FLOAT,  
   q4score INT,
   q4stars INT, 
   q4time FLOAT, 
   
   totalScore FLOAT,
   avgScore FLOAT, 
   
   totalTime FLOAT, 
   avgTime FLOAT,
   
   totalStars FLOAT,
   avgStars FLOAT, 

   PRIMARY KEY (userId, diff, attemptNum),
   FOREIGN KEY (userId) REFERENCES users(id) 
); 

-- THIS TABLE WILL BE REFRESHED EVERY TIME THE USER PRESSES A BUTTON 
-- CALCULATED AND UPDATED DYNAMICALLY EACH TIME 
-- SECOND THOUGHT, MIGHT BE EASIER TO DYNAMICALLY RECALCULATE FROM QUESTION ATTEMPTS EACH TIME 

-- CREATE TABLE userStats (
   
--    userId INT PRIMARY KEY, 

--    pointsearned FLOAT, 
--    avgScore FLOAT, 
--    medianscore FLOAT, 

--    starsEarned FLOAT, 
--    avgStars FLOAT,
--    medianStars FLOAT, 

--    totalTime FLOAT, 
--    avgTime FLOAT, 
--    medianTime FLOAT,

--    FOREIGN KEY (userId) REFERENCES users(id) 
-- ); 


INSERT INTO userAttempts (userId,easyAttempts, medAttempts, hardAttempts)
VALUES
(1, 3, 2, 2),
(2, 1, 1, 1),
(3, 0, 0, 1);

-- PLAY DATA FOR JOHN 
INSERT INTO questionAttempts (userId,diff,attemptNum,q1score,q1stars,q1time,q2score,q2stars,q2time,q3score,q3stars,q3time,
q4score,q4stars,q4time,totalScore,avgScore,totalTime,avgTime,totalStars,avgStars)
VALUES
(1,1,1,  8,2,61,7,2,63,5,1,70,10,3,50, 30,7.5,    244,61,  8,2),
(1,1,2,  9,2,61,8,2,63,6,1,70,10,3,50, 33,8.25,   244,61,  8,2),
(1,1,3,  7,2,61,6,1,63,4,1,70,9, 2,50, 26,6.5,    244,61,  6,1.5),
(1,2,1,  9,2,61,7,2,63,5,1,70,10,3,50, 31,7.75,   244,61,  8,2),
(1,2,2,  7,2,61,7,2,63,5,1,70,10,3,50, 29,7.25,   244,61,  8,2),
(1,3,1,  7,2,61,6,2,63,5,1,70,10,3,50, 28,7,      244,61,  8,2),
(1,3,2,  9,2,61,9,2,63,6,1,70,10,3,50, 34,8.5,    244,61,  8,2);

-- PLAY DATA FOR JANE 
INSERT INTO questionAttempts (userId,diff,attemptNum,q1score,q1stars,q1time,q2score,q2stars,q2time,q3score,q3stars,q3time,
q4score,q4stars,q4time,totalScore,avgScore,totalTime,avgTime,totalStars,avgStars)
VALUES
(2,1,1,  8,2,61,7,2,63,5,1,70,10,3,51, 30,7.5,    245,61.25,  8,2),
(2,2,1,  7,2,61,7,2,63,5,1,70,10,3,51, 29,7.25,   245,61.25,  8,2),
(2,3,1,  9,2,61,7,2,63,5,1,70,10,3,51, 31,7.75,   245,61.25,  8,2); 

-- PLAY DATA FOR ALICE 
INSERT INTO questionAttempts (userId,diff,attemptNum,q1score,q1stars,q1time,q2score,q2stars,q2time,q3score,q3stars,q3time,
q4score,q4stars,q4time,totalScore,avgScore,totalTime,avgTime,totalStars,avgStars)
VALUES
(3,3,1,  8,2,61,7,2,63,5,1,70,10,3,60, 30,7.5,   254,63.5,  8,2);


-- INSERT INTO userStats (userId, pointsearned,avgScore,medianscore,starsEarned,avgStars,medianStars,totalTime,avgTime,medianTime)
-- VALUES
-- (1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
-- (2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
-- (3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);