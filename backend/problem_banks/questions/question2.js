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
});
