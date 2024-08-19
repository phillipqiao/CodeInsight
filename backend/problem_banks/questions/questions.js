/*
 unit tests
*/
//npm init -y
//npm install chai mocha --save-dev
//add "type": "module", to package.json

// npm test  // to run 

// node.js will fail because attempts to execute the test file directly as a standalone Node.js script 
	// however, test files relies on Mocha's testing framework 

//"scripts": {
//	"test": "mocha 'questions.js'"
//},      // mocha automatically looks for test files in test.js, so have this in package.json
		  // if question.js is the actual test. 
		  // Note, can add multiple different files to test, e.g. "test": "mocha 'questions.js' 'question2.js'"

// "devDependencies": {
//	"chai": "^5.1.1",
//	"mocha": "^10.6.0"
//},      // also have this in package.json

import { expect } from 'chai';
// const { expect } = require('chai');
	// to use this, change file to .cjs and remove  "type": "module", from package.json
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