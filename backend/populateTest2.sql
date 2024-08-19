-- For the 2nd batch of insert statements. 
-- RUN backend\populateProbTables.sql FIRST, before running this to update/refresh tables 

-- (103, 'function hard3(a,b){ 
--                 if (b == 0) { return b; } 
-- 	            return hard3(a,b-1) + a(b); }', 3, 'hard3',2),

--  (13, 'function med3(a) { const b = a.split('' '');
--             let c = '''';
--         for (let i = 0; i < b.length; i++) {
--             if (b[i].length > c.length) {
--                 c = b[i];
--             }
--         } return c;}', 2, 'med3',1),    

INSERT INTO questionBank (id, val, diff,qName,argnum) 
VALUES 
    (3, 'function easy3(a,b){ return a - (a%b); }', 1, 'easy3',2),
    (4, 'function easy4(a,b){ return (a > b) && (a + b < 3 * b); }', 1, 'easy4',2),
    (13, 'function med3(a) {  return Boolean(a);}', 2, 'med3',1),
    (14, 'function med4(a){
	        return function(b){
		        return function(c){
			        return function(d){
				        return a + b + c + d; }; }; }; }', 2, 'med4', -1),
    (103, 'function hard3(a,b){ 
               return a.concat(b); }', 3, 'hard3',2),
    (104, 'function hard4(a){
	        return a.reduce((b,c) =>[...b,(b.length ==0)? c: b[b.length - 1]+ c],[]);}', 3, 'hard4',1);

-- (103,'hard3','a function takes two arguments, a is a function and b is a number. If b is zero, it returns 
--      zero. Otherwise, it calls itself recursively with a and b-1, and adds the result of calling a with b as an argument. '),
-- (13,'med3','a function in javascript called foo that takes a string and returns the longest group of characters
--     that is not separated by a space. '),

INSERT INTO answerKey (id,qName,val) VALUES 
(1,'easy1','a function in javascript called foo that takes two numbers, and adds them '),
(2,'easy2','a function in javascript called foo that takes two numbers, and subtracts them '),
(3,'easy3','a function in javascript called foo that takes two numbers, 
    and subtracts first number modulus second number from the first number'),
(4,'easy4','a function in javascript called foo that takes two numbers, 
        and returns true if the first number is greater than the second, and the first number 
        plus the second number is less than three times the second number.'),
(11,'med1','a function in javascript called foo that takes one word and returns true if its a palindrome.
    Ensure that an empty string is considered a Palindrome. '),
(12,'med2','a function in javascript called foo that takes one number and returns true if its a prime number. '),
(13,'med3','a function in javascript called foo that takes an input and returns whether the input value is considered true or false in a boolean context. 
                Returns true if the input is considered true, and false if the input is considered false. '),
(14,'med4','a function takes one argument and returns a function that takes a second argument. This second function 
    returns a function that takes a third argument, and this third function returns a function that takes a fourth 
    argument and returns the sum of all four arguments. '),
(101,'hard1','a function in JavaScript called foo that takes an array as input and filters out all the odd numbers, returning an 
  array of only the even numbers. '),
(102,'hard2','a function in javascript called foo that takes a number and returns its factorial. '),
(103,'hard3','a function in javascript called foo takes two arguments, a is an array and b is an array, and returns a new array that is the result of concatenating b to the end of a.'),
(104,'hard4','a function in javascript called foo that takes a list of number and 
        returns a list of number that tracks the total sum of all preceding elements in each spot. '); 



INSERT INTO testBank (id, val,qName,tName, fcall) VALUES 
(3, 'if(easy3(5,5)===5){return 1;} else {return 0;};', 'easy3', 'test1_easy3, Input: list = {5,5}, Expected Output: 5,','easy3(5,5);'),
(3, 'if(easy3(5,4)===4){return 1;} else {return 0;};', 'easy3', 'test2_easy3, Input: list = {5,4}, Expected Output: 4,','easy3(5,4);'),
(3, 'if(easy3(2,1)===2){return 1;} else {return 0;};', 'easy3', 'test3_easy3, Input: list = {2,1}, Expected Output: 2','easy3(2,1);'),
(3, 'if(easy3(10,2)===10){return 1;} else {return 0;};', 'easy3', 'test4_easy3, Input: list = {10, 2}, Expected Output: 10,','easy3(10,2);'),
(3, 'if(easy3(10,3)===9){return 1;} else {return 0;};', 'easy3', 'test5_easy3, Input: list = {10, 3}, Expected Output: 9,','easy3(10,3);'),
(3, 'if(easy3(42,32)===32){return 1;} else {return 0;};', 'easy3', 'test6_easy3, Input: list = {42, 32}, Expected Output: 32,','easy3(42,32);'),
(3, 'if(easy3(2,-2)===2){return 1;} else {return 0;};', 'easy3', 'test7_easy3, Input: list = {2, -2}, Expected Output: 2,','easy3(2,-2);'),
(3, 'if(easy3(-2,-2)===-2){return 1;} else {return 0;};', 'easy3', 'test8_easy3, Input: list = {-2, -2}, Expected Output: -2,','easy3(-2,-2);'),
(3, 'if(easy3(-3,-2)===-2){return 1;} else {return 0;};', 'easy3', 'test9_easy3, Input: list = {-3, -2}, Expected Output: -2,','easy3(-3,-2);'),
(3, 'if(easy3(-2,-2)===-2){return 1;} else {return 0;};', 'easy3', 'test10_easy3, Input: list = {-2, -2}, Expected Output: -2,','easy3(-2,-2);');

INSERT INTO testBank (id, val,qName,tName, fcall) VALUES
(4, 'if(easy4(6,5)===true){return 1;} else {return 0;};', 'easy4', 'test1_easy4, Input: list = {6, 5}, Expected Output: true,','easy4(6,5);'),
(4, 'if(easy4(0,0)===false){return 1;} else {return 0;};', 'easy4', 'test2_easy4, Input: list = {0, 0}, Expected Output: false,','easy4(0,0);'),
(4, 'if(easy4(3333333,0)===false){return 1;} else {return 0;};', 'easy4', 'test3_easy4, Input: list = {3333333, 0}, Expected Output: false,','easy4(3333333,0);'),
(4, 'if(easy4(200,99)===false){return 1;} else {return 0;};', 'easy4', 'test4_easy4, Input: list = {200, 99}, Expected Output: false,','easy4(200,99);'),
(4, 'if(easy4(199,100)===true){return 1;} else {return 0;};', 'easy4', 'test5_easy4, Input: list = {199, 100}, Expected Output: true,','easy4(199,100);'),
(4, 'if(easy4(22,1)===false){return 1;} else {return 0;};', 'easy4', 'test6_easy4, Input: list = {22, 1}, Expected Output: false,','easy4(22,1);'),
(4, 'if(easy4(3,2)===true){return 1;} else {return 0;};', 'easy4', 'test7_easy4, Input: list = {3, 2}, Expected Output: true,','easy4(3,2);'),
(4, 'if(easy4(0,-1)===false){return 1;} else {return 0;};', 'easy4', 'test8_easy4, Input: list = {0, -1}, Expected Output: false,','easy4(0,-1);'),
(4, 'if(easy4(5,3)===true){return 1;} else {return 0;};', 'easy4', 'test9_easy4, Input: list = {5, 3}, Expected Output: true,','easy4(5,3);'),
(4, 'if(easy4(1,0)===false){return 1;} else {return 0;};', 'easy4', 'test10_easy4, Input: list = {1, 0}, Expected Output: false,','easy4(1,0);');  



-- (13, 'if(med3("test sentence") === "sentence"){return 1;} else {return 0;};', 'med3', 'test1_med3, Input: "test sentence", Expected Output: "sentence",','med3("test sentence");'),
-- (13, 'if(med3("test") === "test"){return 1;} else {return 0;};', 'med3', 'test2_med3, Input: "test", Expected Output: "test",','med3("test");'),
-- (13, 'if(med3("") === ""){return 1;} else {return 0;};', 'med3', 'test3_med3, Input: "", Expected Output: "",','med3("");'),
-- (13, 'if(med3("test best") === "test"){return 1;} else {return 0;};', 'med3', 'test4_med3, Input: "test best", Expected Output: "test",','med3("test best");'),
-- (13, 'if(med3("abc de fgh") === "abc"){return 1;} else {return 0;};', 'med3', 'test5_med3, Input: "abc de fgh", Expected Output: "abc",','med3("abc de fgh");'),
-- (13, 'if(med3("this-is-a-sentence") === "this-is-a-sentence"){return 1;} else {return 0;};', 'med3', 'test6_med3, Input: "this-is-a-sentence", Expected Output: "this-is-a-sentence",','med3("this-is-a-sentence");'),
-- (13, 'if(med3("the words increase") === "increase"){return 1;} else {return 0;};', 'med3', 'test7_med3, Input: "the words increase", Expected Output: "increase",','med3("the words increase");'),
-- (13, 'if(med3("rest of the sentence doesnt matter 1234567890") === "1234567890"){return 1;} else {return 0;};', 'med3', 'test8_med3, Input: "rest of the sentence doesnt matter 1234567890", Expected Output: "1234567890",','med3("rest of the sentence doesnt matter 1234567890");'),
-- (13, 'if(med3("raindrops on roses, and whiskers on kittens") === "raindrops"){return 1;} else {return 0;};', 'med3', 'test9_med3, Input: "raindrops on roses, and whiskers on kittens", Expected Output: "raindrops",','med3("raindrops on roses, and whiskers on kittens");'),
-- (13, 'if(med3("[1,2,3,4, ,6,7,8,9]") === "[1,2,3,4,"){return 1;} else {return 0;};', 'med3', 'test10_med3, Input: "[1,2,3,4, ,6,7,8,9]", Expected Output: "[1,2,3,4,",','med3("[1,2,3,4, ,6,7,8,9]");');



INSERT INTO testBank (id, val,qName,tName, fcall) VALUES
(13, 'if(med3(10) === true){return 1;} else {return 0;};', 'med3', 'test1_med3, Input: 10, Expected Output: true,','med3(10);'),
(13, 'if(med3(1) === true){return 1;} else {return 0;};', 'med3', 'test2_med3, Input: 1, Expected Output: true,','med3(1);'),
(13, 'if(med3("test") === true){return 1;} else {return 0;};', 'med3', 'test3_med3, Input: "test", Expected Output: true,','med3("test");'),
(13, 'if(med3(0) === false){return 1;} else {return 0;};', 'med3', 'test4_med3, Input: 0, Expected Output: false,','med3(0);'),
(13, 'if(med3(true) === true){return 1;} else {return 0;};', 'med3', 'test5_med3, Input: true, Expected Output: true,','med3(true);'),
(13, 'if(med3(1>2) === false){return 1;} else {return 0;};', 'med3', 'test6_med3, Input: 1>2, Expected Output: false,','med3(1>2);'),
(13, 'if(med3(null) === false){return 1;} else {return 0;};', 'med3', 'test7_med3, Input: null, Expected Output: false,','med3(null);'),
(13, 'if(med3(-1) === true){return 1;} else {return 0;};', 'med3', 'test8_med3, Input: -1, Expected Output: true,','med3(-1);'),
(13, 'if(med3("") === false){return 1;} else {return 0;};', 'med3', 'test9_med3, Input: "", Expected Output: false,','med3("");'),
(13, 'if(med3(3 * 2 + 1.11) === true){return 1;} else {return 0;};', 'med3', 'test10_med3, Input: 3 * 2 + 1.11, Expected Output: true,','med3(3 * 2 + 1.11);');


INSERT INTO testBank (id, val,qName,tName, fcall) VALUES
(14, 'if(med4(0)(0)(0)(0) === 0){return 1;} else {return 0;};', 'med4', 'test1_med4, Input: list = {0, 0, 0, 0}, Expected Output: 0,','med4(0)(0)(0)(0);'),
(14, 'if(med4(1)(2)(3)(4) === 10){return 1;} else {return 0;};', 'med4', 'test2_med4, Input: list = {1, 2, 3, 4}, Expected Output: 10,','med4(1)(2)(3)(4);'),
(14, 'if(med4(1)(-1)(2)(-2) === 0){return 1;} else {return 0;};', 'med4', 'test3_med4, Input: list = {1, -1, 2, -2}, Expected Output: 0,','med4(1)(-1)(2)(-2);'),
(14, 'if(med4(-1)(-2)(-3)(-4) === -10){return 1;} else {return 0;};', 'med4', 'test4_med4, Input: list = {-1, -2, -3, -4}, Expected Output: -10,','med4(-1)(-2)(-3)(-4);'),
(14, 'if(med4(1000)(2000)(3000)(4000) === 10000){return 1;} else {return 0;};', 'med4', 'test5_med4, Input: list = {1000, 2000, 3000, 4000}, Expected Output: 10000,','med4(1000)(2000)(3000)(4000);'),
(14, 'if(med4(1)(0)(2)(0) === 3){return 1;} else {return 0;};', 'med4', 'test6_med4, Input: list = {1, 0, 2, 0}, Expected Output: 3,','med4(1)(0)(2)(0);'),
(14, 'if(med4(1)(-1.5)(2)(-2.5) === -1){return 1;} else {return 0;};', 'med4', 'test7_med4, Input: list = {1, -1.5, 2, -2.5}, Expected Output: -1,','med4(1)(-1.5)(2)(-2.5);'),
(14, 'if(med4(0.25)(0.25)(0.25)(0.25) === 1){return 1;} else {return 0;};', 'med4', 'test8_med4, Input: list = {0.25, 0.25, 0.25, 0.25}, Expected Output: 1,','med4(0.25)(0.25)(0.25)(0.25);'),
(14, 'if(med4(3)(6)(9)(12) === 30){return 1;} else {return 0;};', 'med4', 'test9_med4, Input: list = {3, 6, 9, 12}, Expected Output: 30,','med4(3)(6)(9)(12);'),
(14, 'if(med4(1)(1)(1)(1) === 4){return 1;} else {return 0;};', 'med4', 'test10_med4, Input: list = {1, 1, 1, 1}, Expected Output: 4,','med4(1)(1)(1)(1);');






-- OLD HARD 3, DOES NOT WORK WITH OLLAMA
-- (103, 'if(hard3(function(a){return a + 1;}, 1) === 2){return 1;} else {return 0;};', 'hard3', 'test1_hard3, Input: list = {function(a){return a + 1;}, 1}, Expected Output: 2,','hard3(function(a){return a + 1;}, 1);'),
-- (103, 'if(hard3(function(a){return a;}, 0) === 0){return 1;} else {return 0;};', 'hard3', 'test2_hard3, Input: list = {function(a){return a;}, 0}, Expected Output: 0,','hard3(function(a){return a;}, 0);'),
-- (103, 'if(hard3(function(a){return a * 2;}, 2) === 6){return 1;} else {return 0;};', 'hard3', 'test3_hard3, Input: list = {function(a){return a * 2;}, 2}, Expected Output: 6,','hard3(function(a){return a * 2;}, 2);'),
-- (103, 'if(hard3((a) => a % 3, 3) === 3){return 1;} else {return 0;};', 'hard3', 'test4_hard3, Inputs: list = {(a) => a % 3, 3}, Expected Output: 3,','hard3((a) => a % 3, 3);'),
-- (103, 'if(hard3((a) => a - a, 1000) === 0){return 1;} else {return 0;};', 'hard3', 'test5_hard3, Inputs: list = {(a) => a - a, 1000}, Expected Output: 0,','hard3((a) => a - a, 1000);'),
-- (103, 'if(hard3((a) => (a % 4 === 0) ? a : 0, 12) === 24){return 1;} else {return 0;};', 'hard3', 'test6_hard3, Inputs: list = {(a) => (a % 4 === 0) ? a : 0, 12}, Expected Output: 24,','hard3((a) => (a % 4 === 0) ? a : 0, 12);'),
-- (103, 'if(hard3((a) => a, 4) === 10){return 1;} else {return 0;};', 'hard3', 'test7_hard3, Inputs: list = {(a) => a, 4}, Expected Output: 10,','hard3((a) => a, 4);'),
-- (103, 'if(hard3((a) => -a, 4) === -10){return 1;} else {return 0;};', 'hard3', 'test8_hard3, Inputs: list = {(a) => -a, 4}, Expected Output: -10,','hard3((a) => -a, 4);'),
-- (103, 'if(hard3((a) => a / a, 4) === 4){return 1;} else {return 0;};', 'hard3', 'test9_hard3, Inputs: list = {(a) => a / a, 4}, Expected Output: 4,','hard3((a) => a / a, 4);'),
-- (103, 'if(hard3((a) => a + a % 3, 5) === 21){return 1;} else {return 0;};', 'hard3', 'test10_hard3, Inputs: list = {(a) => a + a % 3, 5}, Expected Output: 21,','hard3((a) => a + a % 3, 5);');


INSERT INTO testBank (id, val,qName,tName, fcall) VALUES
(103, 'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;};
         
         if (arraysEqual(hard3([1,2],[3,4]), [1,2,3,4])){return 1;} else {return 0;};', 'hard3', 'test1_hard3, Input: list = {[1,2],[3,4]}, Expected Output: [1,2,3,4],','hard3([1,2],[3,4]);'),
(103, 'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;};
         
         if (arraysEqual(hard3([1,2],[3]), [1,2,3])){return 1;} else {return 0;};', 'hard3', 'test2_hard3, Input: list = {[1,2],[3]}, Expected Output: [1,2,3],','hard3([1,2],[3]);'),
(103, 'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;};
         
         if (arraysEqual(hard3([1],[3,4]), [1,3,4])){return 1;} else {return 0;};', 'hard3', 'test3_hard3, Input: list = {[1],[3,4]}, Expected Output: [1,3,4],','hard3([1],[3,4]);'),
(103, 'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;};
         
         if (arraysEqual(hard3([1,2],[]), [1,2])){return 1;} else {return 0;};', 'hard3', 'test4_hard3, Inputs: list = {[1,2],[]}, Expected Output: [1,2],','hard3([1,2],[]);'),
(103, 'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;};
         
         if (arraysEqual(hard3(["a","b"],["c","d"]), ["a","b","c","d"])){return 1;} else {return 0;};', 'hard3', 'test5_hard3, Inputs: list = {["a","b"],["c","d"]}, Expected Output: ["a","b","c","d"],','hard3(["a","b"],["c","d"]);'),
(103, 'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;};
         
         if (arraysEqual(hard3([true],[false]), [true,false])){return 1;} else {return 0;};', 'hard3', 'test6_hard3, Inputs: list = {[true],[false]}, Expected Output: [true,false],','hard3([true],[false]);'),
(103, 'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;};
         
         if (arraysEqual(hard3([],[false]), [false])){return 1;} else {return 0;};', 'hard3', 'test7_hard3, Inputs: list = {[],[false]}, Expected Output: [false],','hard3([],[false]);'),
(103, 'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;};
         
         if (arraysEqual(hard3([true,false],[true]), [true,false,true])){return 1;} else {return 0;};', 'hard3', 'test8_hard3, Inputs: list = {[true,false],[true]}, Expected Output: [true,false,true],','hard3([true,false],[true]);'),
(103, 'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;};
         
         if (arraysEqual(hard3([44,"a"],["b"]), [44,"a","b"])){return 1;} else {return 0;};', 'hard3', 'test9_hard3, Inputs: list = {[44,"a"],["b"]}, Expected Output: [44,"a","b"],','hard3([44,"a"],["b"]);'),
(103, 'function arraysEqual(arr1, arr2) { if (arr1.length !== arr2.length) { return false; } 
         for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) { return false; } } return true;};
         
         if (arraysEqual(hard3([1,2],["a","b"]), [1,2,"a","b"])){return 1;} else {return 0;};', 'hard3', 'test10_hard3, Inputs: list = {[1,2],["a","b"]}, Expected Output: [1,2,"a","b"],','hard3([1,2],["a","b"]);');



INSERT INTO testBank (id, val,qName,tName,fcall) VALUES
(104, 'if(hard4([10,15,20,25,30]).toString() === [10,25,45,70,100].toString()){return 1;} else {return 0;};', 'hard4', 'test1_hard4, Input: [10,15,20,25,30], Expected Output: [10,25,45,70,100],','hard4([10,15,20,25,30]);'),
(104, 'if(hard4([0]).toString() === [0].toString()){return 1;} else {return 0;};', 'hard4', 'test2_hard4, Input: [0], Expected Output: [0],','hard4([0]);'),
(104, 'if(hard4([1,1,1,1]).toString() === [1,2,3,4].toString()){return 1;} else {return 0;};', 'hard4', 'test3_hard4, Input: [1,1,1,1], Expected Output: [1,2,3,4],','hard4([1,1,1,1]);'),
(104, 'if(hard4([3,-3,3,-3]).toString() === [3,0,3,0].toString()){return 1;} else {return 0;};', 'hard4', 'test4_hard4, Input: [3,-3,3,-3], Expected Output: [3,0,3,0],','hard4([3,-3,3,-3]);'),
(104, 'if(hard4([0,0,0,0]).toString() === [0,0,0,0].toString()){return 1;} else {return 0;};', 'hard4', 'test5_hard4, Input: [0,0,0,0], Expected Output: [0,0,0,0],','hard4([0,0,0,0]);'),
(104, 'if(hard4([0,5,10]).toString() === [0,5,15].toString()){return 1;} else {return 0;};', 'hard4', 'test6_hard4, Input: [0,5,10], Expected Output: [0,5,15],','hard4([0,5,10]);'),
(104, 'if(hard4([]).toString() === [].toString()){return 1;} else {return 0;};', 'hard4', 'test7_hard4, Input: [], Expected Output: [],','hard4([]);'),
(104, 'if(hard4([5,0,0]).toString() === [5,5,5].toString()){return 1;} else {return 0;};', 'hard4', 'test8_hard4, Input: [5,0,0], Expected Output: [5,5,5],','hard4([5,0,0]);'),
(104, 'if(hard4([0.5,0.5,0.5]).toString() === [0.5,1,1.5].toString()){return 1;} else {return 0;};', 'hard4', 'test9_hard4, Input: [0.5,0.5,0.5], Expected Output: [0.5,1,1.5],','hard4([0.5,0.5,0.5]);'),
(104, 'if(hard4([-0.5,-0.5,-0.5]).toString() === [-0.5,-1,-1.5].toString()){return 1;} else {return 0;};', 'hard4', 'test10_hard4, Input: [-0.5,-0.5,-0.5], Expected Output: [-0.5,-1,-1.5],','hard4([-0.5,-0.5,-0.5]);');
