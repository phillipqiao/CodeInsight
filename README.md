# **_CodeInsight_**

#### - _Team Members (Starfish): Phillip Qiao, Cathryn Guo, Hongchen Yu, Dylan Chiu, Robert Wang_

### Project Intentions:

Develop a web application to assess users’ code comprehension skills by having them describe code
samples in plain English. This description is then used to generate code via the open-source Large
Language Model (LLM) Ollama, which is subsequently tested for functional equivalence against the
original code sample. The generated code is considered functional equivalent if it passes all the
test cases and the student can move on to the next question; otherwise, the student is presented
with the generated code and the failed test cases as feedback, and they will be asked to correct
their description and explain their reasons of corrections. CodeInsight aims to measure students'
code comprehension and help researchers study novice programmers’ learning curves

### Docker Compose:

run in terminal:

docker-compose build

docker compose up

### Link to test suite:

Code version for the user questions is in question3.js

Path: backend -> problem_bank -> questions -> questions.js, question2.js, question3.js

Link to Front-end Test Documentation:

https://docs.google.com/document/d/1MHYzr9qogwVF-LXgiA6Vt8eG9PuJti_fkVnsT5kG_E4/edit

Link to Back-end Test Documentation: 

https://github.students.cs.ubc.ca/CPSC310-2024S/Project-Groups-03-Lab-A/blob/main/backend/test.html

Link to Ollama Service Test Documentation: 

https://github.students.cs.ubc.ca/CPSC310-2024S/Project-Groups-03-Lab-A/blob/main/ollama_service/test.html


### Unique Features:

1. In our project, we've designed a versatile problem bank feature that caters to users with varying levels of expertise and learning goals. Users can select the difficulty level at the beginning of each assessment attempt. There are 3 difficulty levels to choose from: Easy, Medium, and Hard.

2. We have also implemented a star-earning scoring system to give users a sense of accomplishment. Each assessment consists of four questions, with each question being worth up to three stars. Users can earn a maximum of twelve stars per assessment by successfully passing as many test cases as possible.

3. One of our unique features is the implementation of a timer that tracks the time spent on each question during the first attempt. This timer automatically pauses when users view their results or refine their answers, ensuring that their time score accurately reflects active problem-solving. Additionally, we offer a 'Pause' button on the assessment page, allowing users to take a break without impacting their recorded time, making the experience flexible and user-friendly.

4. Another unique feature we've implemented is a history system that allows users to view their past attempts, including scores, time usage, and stars earned. This feature provides users with insights into their progress and improvement in solving code comprehension questions over time.

5. A standout feature of our project is the ability for users to compare their performance against other students, providing a unique perspective on their knowledge relative to their peers. This feature includes a statistics calculator, accessible from the 'View Past Attempts' button on the Account page. It allows users to calculate various statistics, such as average score, average time, average stars, and question-specific datas, for all their attempts or filtered by difficulty level. Additionally, users can view class-wide statistics using the 'Class stats' button along with 'Filter Data' and 'Select Stat to Calculate' dropdown options. These statistics update dynamically, offering real-time insights and making this comparison tool a unique feature of our project.
