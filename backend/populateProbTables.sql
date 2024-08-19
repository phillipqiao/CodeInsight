DROP TABLE IF EXISTS testBank; 
DROP TABLE IF EXISTS answerKey; 
DROP TABLE IF EXISTS questionBank;
-- DROP TABLE IF EXISTS userStats;

CREATE TABLE questionBank (
    id INT PRIMARY KEY,
    val VARCHAR(700),
    diff INT, -- 1 = easy, 2 = med, 3 = hard 
    qName VARCHAR(255) UNIQUE,
    argnum INT 
);

INSERT INTO questionBank (id, val, diff,qName,argnum) 
VALUES 
    (1, 'function easy1(a,b){ return a + b; }', 1, 'easy1',2),
    (2, 'function easy2(a,b){ return a - b; }', 1, 'easy2',2);


 -- (101,'function hard1(a){ 
    --                 return a.filter(b => b % 2 === 0); 
    --             }' ,3,'hard1',-1),
   

INSERT INTO questionBank (id, val, diff,qName,argnum)
VALUES
    (11,'function med1(a){ 
                return a === a.split("").reverse().join(""); 
                }',2,'med1',1),
    (12,'function med2(a){ if (a <= 1) { return false; } 
    for (let i = 2; i <= Math.sqrt(a); i++) 
		if (a % i === 0) 
             return false; 		 
	return true; }' ,2,'med2',1),
    (101,'function hard1(a){ 
                      let it = a.length;
                      for(let i=0; i<it; i++) {
                        for(let j=0; j< a.length; j++ )
                            if(Math.abs(a[j])%2 === 1){
                                a.splice(j,1)
                                break;
                            }
                        };
                return a; 
                }' ,3,'hard1',-1),
    (102,'function hard2(a){ if (a === 0 || a === 1) { 
        return 1; 
        } else { return a * hard2(a - 1); 
               } 
        }' ,3,'hard2',1);


CREATE TABLE answerKey(
    id INT PRIMARY KEY, 
    qName VARCHAR(255),
    val VARCHAR(500),
    FOREIGN KEY (id) REFERENCES questionBank(id),
    FOREIGN KEY (qName) REFERENCES questionBank(qName)  
);




CREATE TABLE testBank (
    id INT,
    val VARCHAR(500),
    qName VARCHAR(255), 
    tName VARCHAR(255) PRIMARY KEY, 
    fcall VARCHAR(255), 
    FOREIGN KEY (id) REFERENCES questionBank(id),
    FOREIGN KEY (qName) REFERENCES questionBank(qName) 
);


-- COPY testBank(id, val) FROM 'unitTests.csv' DELIMITER ',' CSV HEADER;
-- Unable to COPY values into postGreSQL 

INSERT INTO testBank (id, val,qName,tName,fcall) VALUES 
(1, 'if (easy1(5,5) === 10){ return 1; } else { return 0; }; ', 'easy1','test1_easy1, Input: list = {5,5}, Expected Output: 10,','easy1(5,5);'),
(1, 'if (easy1(4,4) === 8){ return 1; } else { return 0; }; ', 'easy1','test2_easy1, Input: list = {4,4}, Expected Output: 8,','easy1(4,4);'),
(1, 'if (easy1(2,0) === 2){ return 1; } else { return 0; };','easy1','test3_easy1, Input: list = {2,0}, Expected Output: 2,','easy1(2,0);'),
(1, 'if (easy1(99,99) === 198){ return 1; } else { return 0; };','easy1','test4_easy1, Input: list = {99,99}, Expected Output: 198,','easy1(99,99);'),
(1, 'if (easy1(0,0) === 0){ return 1; } else { return 0; };','easy1','test5_easy1, Input: list = {0,0}, Expected Output: 0,','easy1(0,0);'),
(1, 'if (easy1(42,32) === 74){ return 1; } else { return 0; };','easy1','test6_easy1, Input: list = {42,32}, Expected Output: 74,','easy1(42,32);'),
(1, 'if (easy1(50,150) === 200){ return 1; } else { return 0; };','easy1','test7_easy1, Input: list = {50,150}, Expected Output: 200,','easy1(50,150);'),
(1, 'if (easy1(3,2) === 5){ return 1; } else { return 0; };','easy1','test8_easy1, Input: list = {3,2}, Expected Output: 5,','easy1(3,2);'),
(1, 'if (easy1(-3,-2) === -5){ return 1; } else { return 0; };','easy1','test9_easy1, Input: list = {-3,-2}, Expected Output: -5,','easy1(-3,-2);'),
(1, 'if (easy1(-2,2) === 0){ return 1; } else { return 0; };','easy1','test10_easy1, Input: list = {-2,2}, Expected Output: 0,','easy1(-2,2);'),
(2, 'if (easy2(5,5) === 0){ return 1; } else { return 0; };','easy2','test1_easy2, Input: list = {5,5}, Expected Output: 0,','easy2(5,5);'),
(2, 'if (easy2(4,4) === 0){ return 1; } else { return 0; };','easy2','test2_easy2, Input: list = {4,4}, Expected Output: 0,','easy2(4,4);'),
(2, 'if (easy2(2,0) === 2){ return 1; } else { return 0; };','easy2','test3_easy2, Input: list = {2,0}, Expected Output: 2,','easy2(2,0);'),
(2, 'if (easy2(99,99) === 0){ return 1; } else { return 0; };','easy2','test4_easy2, Input: list = {99,99}, Expected Output: 0,','easy2(99,99);'),
(2, 'if (easy2(100,99) === 1){ return 1; } else { return 0; };','easy2','test5_easy2, Input: list = {100,99}, Expected Output: 1,','easy2(100,99);'),
(2, 'if (easy2(42,32) === 10){ return 1; } else { return 0; };','easy2','test6_easy2, Input: list = {42,32}, Expected Output: 10,','easy2(42,32);'),
(2, 'if (easy2(200,100) === 100){ return 1; } else { return 0; };','easy2','test7_easy2, Input: list = {200,100}, Expected Output: 100,','easy2(200,100);'),
(2, 'if (easy2(4,2) === 2){ return 1; } else { return 0; };','easy2','test8_easy2, Input: list = {4,2}, Expected Output: 2,','easy2(4,2);'),
(2, 'if (easy2(-3,-2) === -1){ return 1; } else { return 0; };','easy2','test9_easy2, Input: list = {-3,-2}, Expected Output: -1,','easy2(-3,-2);'),
(2, 'if (easy2(-2,2) === -4){ return 1; } else { return 0; };','easy2','test10_easy2, Input: list = {-2,2}, Expected Output: -4,','easy2(-2,2);');


INSERT INTO testBank (id, val,qName, tName,fcall) VALUES 
(11, 'if (med1("aba") === true) { return 1; } else { return 0; };', 'med1', 'test1_med1, Input: "aba", Expected Output: true,','med1("aba");'),
(11, 'if (med1("baa") === false) { return 1; } else { return 0; };', 'med1', 'test2_med1, Input: "baa", Expected Output: false,','med1("baa");'),
(11, 'if (med1("racecar") === true) { return 1; } else { return 0; };', 'med1', 'test3_med1, Input: "racecar", Expected Output: true,','med1("racecar");'),
(11, 'if (med1("bbb") === true) { return 1; } else { return 0; };', 'med1', 'test4_med1, Input: "bbb", Expected Output: true,','med1("bbb");'),
(11, 'if (med1("abc") === false) { return 1; } else { return 0; };', 'med1', 'test5_med1, Input: "abc", Expected Output: false,','med1("abc");'),
(11, 'if (med1("") === true) { return 1; } else { return 0; };', 'med1', 'test6_med1, Input: "", Expected Output: true,','med1("");'),
(11, 'if (med1("gg") === true) { return 1; } else { return 0; };', 'med1', 'test7_med1, Input: "gg", Expected Output: true,','med1("gg");'),
(11, 'if (med1("yolo") === false) { return 1; } else { return 0; };', 'med1', 'test8_med1, Input: "yolo", Expected Output: false,','med1("yolo");'),
(11, 'if (med1("f") === true) { return 1; } else { return 0; };', 'med1', 'test9_med1, Input: "f", Expected Output: true,','med1("f");'),
(11, 'if (med1("y1miy") === false) { return 1; } else { return 0; };', 'med1', 'test10_med1, Input: "y1miy", Expected Output: false,','med1("y1miy");'),
(12, 'if (med2(2) === true) { return 1; } else { return 0; };', 'med2', 'test1_med2, Input: 2, Expected Output: true,','med2(2);'),
(12, 'if (med2(1) === false) { return 1; } else { return 0; };', 'med2', 'test2_med2, Input: 1, Expected Output: false,','med2(1);'),
(12, 'if (med2(3) === true) { return 1; } else { return 0; };', 'med2', 'test3_med2, Input: 3, Expected Output: true,','med2(3);'),
(12, 'if (med2(5) === true) { return 1; } else { return 0; };', 'med2', 'test4_med2, Input: 5, Expected Output: true,','med2(5);'),
(12, 'if (med2(4) === false) { return 1; } else { return 0; };', 'med2', 'test5_med2, Input: 4, Expected Output: false,','med2(4);'),
(12, 'if (med2(7) === true) { return 1; } else { return 0; };', 'med2', 'test6_med2, Input: 7, Expected Output: true,','med2(7);'),
(12, 'if (med2(0) === false) { return 1; } else { return 0; };', 'med2', 'test7_med2, Input: 0, Expected Output: false,','med2(0);'),
(12, 'if (med2(8) === false) { return 1; } else { return 0; };', 'med2', 'test8_med2, Input: 8, Expected Output: false,','med2(8);'),
(12, 'if (med2(11) === true) { return 1; } else { return 0; };', 'med2', 'test9_med2, Input: 11, Expected Output: true,','med2(11);'),
(12, 'if (med2(12) === false) { return 1; } else { return 0; };', 'med2', 'test10_med2, Input: 12, Expected Output: false,','med2(12);'),
(101,'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;}; 

         if (arraysEqual(hard1([1,2,3,4,5]), [2, 4])) { return 1; } else { return 0; };', 'hard1', 'test1_hard1, Input: [1,2,3,4,5], Expected Output: [2, 4],','hard1([1,2,3,4,5]);'),
(101,'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;}; 
         
         if (arraysEqual(hard1([]), [])) { return 1; } else { return 0; };', 'hard1', 'test2_hard1, Input: [], Expected Output: [],','hard1([]);'),
(101,'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;}; 
         
         if (arraysEqual(hard1([3,3,3]), [])) { return 1; } else { return 0; };', 'hard1', 'test3_hard1, Input: [3,3,3], Expected Output: [],','hard1([3,3,3]);'),
(101,'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;}; 
         
         if (arraysEqual(hard1([4,4,4,4]), [4,4,4,4])) { return 1; } else { return 0; };', 'hard1', 'test4_hard1, Input: [4,4,4,4], Expected Output: [4,4,4,4],','hard1([4,4,4,4]);'),
(101,'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;}; 
         
         if (arraysEqual(hard1([0,0,0]), [0,0,0])) { return 1; } else { return 0; };', 'hard1', 'test5_hard1, Input: [0,0,0], Expected Output: [0,0,0],','hard1([0,0,0]);'),
(101,'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;}; 
         
         if (arraysEqual(hard1([2]), [2])) { return 1; } else { return 0; };', 'hard1', 'test6_hard1, Input: [2], Expected Output: [2],','hard1([2]);'),
(101,'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;}; 
         
         if (arraysEqual(hard1([3,2]), [2])) { return 1; } else { return 0; };', 'hard1', 'test7_hard1, Input: [3,2], Expected Output: [2],','hard1([3,2]);'),
(101,'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;}; 
         
         if (arraysEqual(hard1([6,7,8]), [6,8])) { return 1; } else { return 0; };', 'hard1', 'test8_hard1, Input: [6,7,8], Expected Output: [6,8],','hard1([6,7,8]);'),
(101,'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;}; 
         
         if (arraysEqual(hard1([0,-1,-3,-5]), [0])) { return 1; } else { return 0; };', 'hard1', 'test9_hard1, Input: [0,-1,-3,-5], Expected Output: [0],','hard1([0,-1,-3,-5]);'),
(101,'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;}; 
         
         if (arraysEqual(hard1([-9,-1,1]), [])) { return 1; } else { return 0; };', 'hard1', 'test10_hard1, Input: [-9,-1,1], Expected Output: [],','hard1([-9,-1,1]);'),
(102,'if (hard2(0) === 1) { return 1; } else { return 0; };', 'hard2', 'test1_hard2, Input: 0, Expected Output: 1,','hard2(0);'),
(102,'if (hard2(1) === 1) { return 1; } else { return 0; };', 'hard2', 'test2_hard2, Input: 1, Expected Output: 1,','hard2(1);'),
(102,'if (hard2(6) === 720 ) { return 1; } else { return 0; };', 'hard2', 'test3_hard2, Input: 6, Expected Output: 720,','hard2(6);'),
(102,'if (hard2(3) === 6) { return 1; } else { return 0; };', 'hard2', 'test4_hard2, Input: 3, Expected Output: 6,','hard2(3);'),
(102,'if (hard2(5) === 120) { return 1; } else { return 0; };', 'hard2', 'test5_hard2, Input: 5, Expected Output: 120,','hard2(5);'),
(102,'if (hard2(2) === 2) { return 1; } else { return 0; };', 'hard2', 'test6_hard2, Input: 2, Expected Output: 2,','hard2(2);'),
(102,'if (hard2(4) === 24) { return 1; } else { return 0; };', 'hard2', 'test7_hard2, Input: 4, Expected Output: 24,','hard2(4);'),
(102,'if (hard2(7) === 5040) { return 1; } else { return 0; };', 'hard2', 'test8_hard2, Input: 7, Expected Output: 5040,','hard2(7);'),
(102,'if (hard2(8) === 40320) { return 1; } else { return 0; };', 'hard2', 'test9_hard2, Input: 8, Expected Output: 40320,','hard2(8);'),
(102,'if (hard2(9) === 362880) { return 1; } else { return 0; };', 'hard2', 'test10_hard2, Input: 9, Expected Output: 362880,','hard2(9);');


SELECT * 
FROM testbank