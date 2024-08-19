/*
 unit tests
*/
//npm init -y
//npm install chai mocha --save-dev
//add "type": "module", to package.json
//npm test
import { expect } from 'chai';

function easy1(a,b){
	return a + b;
}

function easy2(a,b){
	return a - b;
}

function easy3(a,b){
	return a - (a%b);
}

function easy4(a,b){
	return (a > b) && (a + b < 3 * b);
}

describe('easy', () => {

	const easy1ans = [10,8,2,198,0,74,200,5,-5,0];

	describe('questions from easy 1', () => {

		it('test 1 for easy 1', () => {
			expect(easy1(5,5)).to.eql(easy1ans[0]);
		});
		
		it('test 2 for easy 1', () => {
			expect(easy1(4,4)).to.eql(easy1ans[1]);
		});

		it('test 3 for easy 1', () => {
			expect(easy1(2,0)).to.eql(easy1ans[2]);
		});
		
		it('test 4 for easy 1', () => {
			expect(easy1(99,99)).to.eql(easy1ans[3]);
		});
		it('test 5 for easy 1', () => {
			expect(easy1(0,0)).to.eql(easy1ans[4]);
		});

		it('test 6 for easy 1', () => {
			expect(easy1(42,32)).to.eql(easy1ans[5]);
		});
		
		it('test 7 for easy 1', () => {
			expect(easy1(50,150)).to.eql(easy1ans[6]);
		});
		it('test 8 for easy 1', () => {
			expect(easy1(3,2)).to.eql(easy1ans[7]);
		});
		it('test 9 for easy 1', () => {
			expect(easy1(-3,-2)).to.eql(easy1ans[8]);
		});
		it('test 10 for easy 1', () => {
			expect(easy1(-2,2)).to.eql(easy1ans[9]);
		});
	});

	const easy2ans = [0,0,2,0,1,10,100,2,-1,-4]
	
	describe('questions from easy 2', () => {

		it('test 1 for easy 2', () => {
			expect(easy2(5,5)).to.eql(easy2ans[0]);
		});
		
		it('test 2 for easy 2', () => {
			expect(easy2(4,4)).to.eql(easy2ans[1]);
		});

		it('test 3 for easy 2', () => {
			expect(easy2(2,0)).to.eql(easy2ans[2]);
		});
		
		it('test 4 for easy 2', () => {
			expect(easy2(99,99)).to.eql(easy2ans[3]);
		});
		it('test 5 for easy 2', () => {
			expect(easy2(100,99)).to.eql(easy2ans[4]);
		});

		it('test 6 for easy 2', () => {
			expect(easy2(42,32)).to.eql(easy2ans[5]);
		});
		
		it('test 7 for easy 2', () => {
			expect(easy2(200,100)).to.eql(easy2ans[6]);
		});
		it('test 8 for easy 2', () => {
			expect(easy2(4,2)).to.eql(easy2ans[7]);
		});
		it('test 9 for easy 2', () => {
			expect(easy2(-3,-2)).to.eql(easy2ans[8]);
		});
		it('test 10 for easy 2', () => {
			expect(easy2(-2,2)).to.eql(easy2ans[9]);
		});
		
	});

	const easy3ans = [5,4,2,10,9,32,2,-2,-2,-2]
	
	describe('questions from easy 3', () => {

		it('test 1 for easy 3', () => {
			expect(easy3(5,5)).to.eql(easy3ans[0]);
		});
		
		it('test 2 for easy 3', () => {
			expect(easy3(5,4)).to.eql(easy3ans[1]);
		});

		it('test 3 for easy 3', () => {
			expect(easy3(2,1)).to.eql(easy3ans[2]);
		});
		
		it('test 4 for easy 3', () => {
			expect(easy3(10,2)).to.eql(easy3ans[3]);
		});
		it('test 5 for easy 3', () => {
			expect(easy3(10,3)).to.eql(easy3ans[4]);
		});

		it('test 6 for easy 3', () => {
			expect(easy3(42,32)).to.eql(easy3ans[5]);
		});
		
		it('test 7 for easy 3', () => {
			expect(easy3(2,-2)).to.eql(easy3ans[6]);
		});
		it('test 8 for easy 3', () => {
			expect(easy3(-2,-2)).to.eql(easy3ans[7]);
		});
		it('test 9 for easy 3', () => {
			expect(easy3(-3,-2)).to.eql(easy3ans[8]);
		});
		it('test 10 for easy 3', () => {
			expect(easy3(-2,2)).to.eql(easy3ans[9]);
		});
		
	});

	const easy4ans = [true,false,false,false,true,false,true,false,true,false]
	
	describe('questions from easy 4', () => {

		it('test 1 for easy 4', () => {
			expect(easy4(6,5)).to.eql(easy4ans[0]);
		});
		
		it('test 2 for easy 4', () => {
			expect(easy4(0,0)).to.eql(easy4ans[1]);
		});

		it('test 3 for easy 4', () => {
			expect(easy4(3333333,0)).to.eql(easy4ans[2]);
		});
		
		it('test 4 for easy 4', () => {
			expect(easy4(200,99)).to.eql(easy4ans[3]);
		});
		it('test 5 for easy 4', () => {
			expect(easy4(199,100)).to.eql(easy4ans[4]);
		});

		it('test 6 for easy 4', () => {
			expect(easy4(22,1)).to.eql(easy4ans[5]);
		});
		
		it('test 7 for easy 4', () => {
			expect(easy4(3,2)).to.eql(easy4ans[6]);
		});
		it('test 8 for easy 4', () => {
			expect(easy4(0,-1)).to.eql(easy4ans[7]);
		});
		it('test 9 for easy 4', () => {
			expect(easy4(5,3)).to.eql(easy4ans[8]);
		});
		it('test 10 for easy 4', () => {
			expect(easy4(1,0)).to.eql(easy4ans[9]);
		});
		
	});


});

function med1(a){

	return a === a.split("").reverse().join(""); 
}

function med2(a){
	if (a <= 1) return false;
	for (let i = 2; i <= Math.sqrt(a); i++) 
		if (a % i === 0) 
			return false;  
	return true;
}

function med3(a) {
  const b = a.split(' ');
  let c = '';

  for (let i = 0; i < b.length; i++) {
    if (b[i].length > c.length) {
      c = b[i];
    }
  }

  return c;
}


function med4(a){
	return function(b){
		return function(c){
			return function(d){
				return a + b + c + d;
			};
		};
	};
}



describe('med', () => {
	
	const med1ans = [true,false,true,true,false,true,true,false,true,false];
	describe('questions from med 1', () => {

		it('test 1 for med 1', () => {
			expect(med1('aba')).to.eql(med1ans[0]);
		});
		
		it('test 2 for med 1', () => {
			expect(med1('baa')).to.eql(med1ans[1]);
		});

		it('test 3 for med 1', () => {
			expect(med1('racecar')).to.eql(med1ans[2]);
		});
		
		it('test 4 for med 1', () => {
			expect(med1('bbb')).to.eql(med1ans[3]);
		});
		it('test 5 for med 1', () => {
			expect(med1('abc')).to.eql(med1ans[4]);
		});

		it('test 6 for med 1', () => {
			expect(med1('')).to.eql(med1ans[5]);
		});
		
		it('test 7 for med 1', () => {
			expect(med1('gg')).to.eql(med1ans[6]);
		});
		it('test 8 for med 1', () => {
			expect(med1('yolo')).to.eql(med1ans[7]);
		});
		it('test 9 for med 1', () => {
			expect(med1('f')).to.eql(med1ans[8]);
		});
		it('test 10 for med 1', () => {
			expect(med1('y1miy')).to.eql(med1ans[9]);
		});

	});
	const med2ans = [true,false,true,true,false,true,false,false,true,false];
	describe('questions from med 2', () => {

		it('test 1 for med 2', () => {
			expect(med2(2)).to.eql(med2ans[0]);
		});
		
		it('test 2 for med 2', () => {
			expect(med2(1)).to.eql(med2ans[1]);
		});

		it('test 3 for med 2', () => {
			expect(med2(3)).to.eql(med2ans[2]);
		});
		
		it('test 4 for med 2', () => {
			expect(med2(5)).to.eql(med2ans[3]);
		});
		it('test 5 for med 2', () => {
			expect(med2(4)).to.eql(med2ans[4]);
		});

		it('test 6 for med 2', () => {
			expect(med2(7)).to.eql(med2ans[5]);
		});
		
		it('test 7 for med 2', () => {
			expect(med2(0)).to.eql(med2ans[6]);
		});
		it('test 8 for med 2', () => {
			expect(med2(8)).to.eql(med2ans[7]);
		});
		it('test 9 for med 2', () => {
			expect(med2(11)).to.eql(med2ans[8]);
		});
		it('test 10 for med 2', () => {
			expect(med2(12)).to.eql(med2ans[9]);
		});

	});
	const med3ans = ["sentence","test","","test","abc","this-is-a-sentence","increase","1234567890","raindrops","[1,2,3,4,"];
	describe('questions from med 3', () => {

		it('test 1 for med 3', () => {
			expect(med3("test sentence")).to.eql(med3ans[0]);
		});
		
		it('test 2 for med 3', () => {
			expect(med3("test")).to.eql(med3ans[1]);
		});

		it('test 3 for med 3', () => {
			expect(med3("")).to.eql(med3ans[2]);
		});
		
		it('test 4 for med 3', () => {
			expect(med3("test best")).to.eql(med3ans[3]);
		});
		it('test 5 for med 3', () => {
			expect(med3("abc de fgh")).to.eql(med3ans[4]);
		});

		it('test 6 for med 3', () => {
			expect(med3("this-is-a-sentence")).to.eql(med3ans[5]);
		});
		
		it('test 7 for med 3', () => {
			expect(med3("the words increase")).to.eql(med3ans[6]);
		});
		it('test 8 for med 3', () => {
			expect(med3("rest of the sentence doesnt matter 1234567890")).to.eql(med3ans[7]);
		});
		it('test 9 for med 3', () => {
			expect(med3("raindrops on roses, and whiskers on kittens")).to.eql(med3ans[8]);
		});
		it('test 10 for med 3', () => {
			expect(med3("[1,2,3,4, ,6,7,8,9]")).to.eql(med3ans[9]);
		});

	});
	const med4ans = [0,10,0,-10,10000,3,-1,1,30,4];
	describe('questions from med 4', () => {
		
		it('test 1 for med 4', () => {
			expect(med4(0)(0)(0)(0)).to.eql(med4ans[0]);
		});
		
		it('test 2 for med 4', () => {
			expect(med4(1)(2)(3)(4)).to.eql(med4ans[1]);
		});

		it('test 3 for med 4', () => {
			expect(med4(1)(-1)(2)(-2)).to.eql(med4ans[2]);
		});
		
		it('test 4 for med 4', () => {
			expect(med4(-1)(-2)(-3)(-4)).to.eql(med4ans[3]);
		});
		
		it('test 5 for med 4', () => {
			expect(med4(1000)(2000)(3000)(4000)).to.eql(med4ans[4]);
		});

		it('test 6 for med 4', () => {
			expect(med4(1)(0)(2)(0)).to.eql(med4ans[5]);
		});
		
		it('test 7 for med 4', () => {
			expect(med4(1)(-1.5)(2)(-2.5)).to.eql(med4ans[6]);
		});
		
		it('test 8 for med 4', () => {
			expect(med4(0.25)(0.25)(0.25)(0.25)).to.eql(med4ans[7]);
		});
		
		it('test 9 for med 4', () => {
			expect(med4(3)(6)(9)(12)).to.eql(med4ans[8]);
		});
		
		it('test 10 for med 4', () => {
			expect(med4(1)(1)(1)(1)).to.eql(med4ans[9]);
		});

	});
	
});

function hard1(a){
	return a.filter(b => b % 2 === 0);

}

function hard2(a){
	if (a === 0 || a === 1) {
		return 1;
	}else {
		return a * hard2(a - 1);
	}
}

function hard3(a,b){
	
	if (b == 0)
 		return b;
	
	return hard3(a,b-1) + a(b);
}

function hard4(a){
	return a.reduce((b,c) =>[...b,(b.length ==0)? c: b[b.length - 1]+ c],[]);
}


describe('hard', () => {
	
	const hard1ans = [[2,4],[],[],[4,4,4,4],[0,0,0],[2],[2],[6, 8],[0],[]];
	describe('questions from hard 1', () => {

		it('test 1 for hard 1', () => {
			expect(hard1([1,2,3,4,5])).to.eql(hard1ans[0]);
		});
		
		it('test 2 for hard 1', () => {
			expect(hard1([])).to.eql(hard1ans[1]);
		});

		it('test 3 for hard 1', () => {
			expect(hard1([3,3,3])).to.eql(hard1ans[2]);
		});
		
		it('test 4 for hard 1', () => {
			expect(hard1([4,4,4,4])).to.eql(hard1ans[3]);
		});
		it('test 5 for hard 1', () => {
			expect(hard1([0,0,0])).to.eql(hard1ans[4]);
		});

		it('test 6 for hard 1', () => {
			expect(hard1([2])).to.eql(hard1ans[5]);
		});
		
		it('test 7 for hard 1', () => {
			expect(hard1([3,2])).to.eql(hard1ans[6]);
		});
		it('test 8 for hard 1', () => {
			expect(hard1([6,7,8])).to.eql(hard1ans[7]);
		});
		it('test 9 for hard 1', () => {
			expect(hard1([0,-1,-3,-5])).to.eql(hard1ans[8]);
		});
		it('test 10 for hard 1', () => {
			expect(hard1([-9,-1,1])).to.eql(hard1ans[9]);
		});

	});
	
	const hard2ans = [1,1,720,6,120,2,24,5040,40320,362880];
	describe('questions from hard 2', () => {

		it('test 1 for hard 2', () => {
			expect(hard2(0)).to.eql(hard2ans[0]);
		});
		
		it('test 2 for hard 2', () => {
			expect(hard2(1)).to.eql(hard2ans[1]);
		});

		it('test 3 for hard 2', () => {
			expect(hard2(6)).to.eql(hard2ans[2]);
		});
		
		it('test 4 for hard 2', () => {
			expect(hard2(3)).to.eql(hard2ans[3]);
		});
		it('test 5 for hard 2', () => {
			expect(hard2(5)).to.eql(hard2ans[4]);
		});

		it('test 6 for hard 2', () => {
			expect(hard2(2)).to.eql(hard2ans[5]);
		});
		
		it('test 7 for hard 2', () => {
			expect(hard2(4)).to.eql(hard2ans[6]);
		});
		it('test 8 for hard 2', () => {
			expect(hard2(7)).to.eql(hard2ans[7]);
		});
		it('test 9 for hard 2', () => {
			expect(hard2(8)).to.eql(hard2ans[8]);
		});
		it('test 10 for hard 2', () => {
			expect(hard2(9)).to.eql(hard2ans[9]);
		});

	});

	const hard3ans = [2,0,6,3,0,24,10,-10,4,21];
	describe('questions from hard 3', () => {
		
		it('test 1 for hard 3', () => {
			expect(hard3( function(a){return a + 1;}, 1)).to.eql(hard3ans[0]);
		});
		
		it('test 2 for hard 3', () => {
			expect(hard3(function(a){return a;}, 0)).to.eql(hard3ans[1]);
		});

		it('test 3 for hard 3', () => {
			expect(hard3(function(a){return a * 2;}, 2)).to.eql(hard3ans[2]);
		});
		
		it('test 4 for hard 3', () => {
			expect(hard3((a)=> a%3, 3)).to.eql(hard3ans[3]);
		});
		
		it('test 5 for hard 3', () => {
			expect(hard3((a)=> a - a, 1000)).to.eql(hard3ans[4]);
		});

		it('test 6 for hard 3', () => {
			expect(hard3((a)=> (a%4 ==0)? a : 0, 12)).to.eql(hard3ans[5]);
		});
		
		it('test 7 for hard 3', () => {
			expect(hard3((a)=> a,4)).to.eql(hard3ans[6]);
		});
		
		it('test 8 for hard 3', () => {
			expect(hard3((a)=> -a,4)).to.eql(hard3ans[7]);
		});
		
		it('test 9 for hard 3', () => {
			expect(hard3((a)=> a/a, 4)).to.eql(hard3ans[8]);
		});
		
		it('test 10 for hard 3', () => {
			expect(hard3((a) => a + a%3, 5)).to.eql(hard3ans[9]);
		});

	});
	
	const hard4ans = [ [10,25,45,70,100],[0],[1,2,3,4],[3,0,3,0],[0,0,0,0],[0,5,15],[],[5,5,5],[0.5,1,1.5],[-0.5,-1,-1.5]];
	describe('questions from hard 4', () => {
			
		it('test 1 for hard 4', () => {
			expect(hard4([10,15,20,25,30])).to.eql(hard4ans[0]);
		});
		
		it('test 2 for hard 4', () => {
			expect(hard4([0])).to.eql(hard4ans[1]);
		});
		
		it('test 3 for hard 4', () => {
			expect(hard4([1,1,1,1])).to.eql(hard4ans[2]);
		});
		
		it('test 4 for hard 4', () => {
			expect(hard4([3,-3,3,-3])).to.eql(hard4ans[3]);
		});
		
		it('test 5 for hard 4', () => {
			expect(hard4([0,0,0,0])).to.eql(hard4ans[4]);
		});

		it('test 6 for hard 4', () => {
			expect(hard4([0,5,10])).to.eql(hard4ans[5]);
		});
		
		it('test 7 for hard 4', () => {
			expect(hard4([])).to.eql(hard4ans[6]);
		});
		
		it('test 8 for hard 4', () => {
			expect(hard4([5,0,0])).to.eql(hard4ans[7]);
		});
		
		it('test 9 for hard 4', () => {
			expect(hard4([0.5,0.5,0.5])).to.eql(hard4ans[8]);
		});
		
		it('test 10 for hard 4', () => {
			expect(hard4([-0.5,-0.5,-0.5])).to.eql(hard4ans[9]);
		});
	
	});
});
