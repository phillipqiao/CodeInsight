import { expect } from 'chai';

function isValidFunction(A, B) {
    let index = 0;
    const length = A.length;

    // Helper function to skip whitespace
    function skipWhitespace() {
        while (index < length && /\s/.test(A[index])) {
            index++;
        }
    }

    // Helper function to parse arguments inside the parentheses
    function parseArguments() {
        skipWhitespace();
        if (A[index] !== '(') {
            console.log("Expected '(', found", A[index]);
            return false;
        }
        index++;
        skipWhitespace();
        if (B === 0) {
            if (A[index] === ')') {
                index++;
                return true;
            } else {
                console.log("Expected ')', found", A[index]);
                return false;
            }
        }
        if (B === -1) {
            while (index < length && A[index] !== ')') {
                index++;
            }
            if (A[index] === ')') {
                index++;
                while(A[index] !== '{'){
                    index++; 
                }
                return true;
            }
            console.log("Expected ')', found", A[index]);
            return false;
        }
        let argCount = 0;
        let inArg = false;
        while (index < length && A[index] !== ')') {
            if (A[index] === ',') {
                if (inArg) {
                    argCount++;
                    inArg = false;
                } else {
                    console.log("Unexpected comma at index", index);
                    return false;
                }
            } else if (!/\s/.test(A[index])) {
                if (!inArg) {
                    inArg = true;
                }
            }
            index++;
        }
        if (inArg) argCount++; // To count the last argument
        console.log("Argument count:", argCount);
        if (argCount !== B) {
            console.log("Argument count mismatch. Expected:", B, "Found:", argCount);
            return false;
        }
        if (A[index] === ')') {
            index++;
            return true;
        }
        console.log("Expected ')', found", A[index]);
        return false;
    }

    // Helper function to find the return statement within braces
    function findReturn() {
        const returnRegex = /\breturn\b/;
        let braceCount = 1; // We assume we start after the first '{'
        let foundReturn = false;
        while (index < length && braceCount > 0) {
            if (A[index] === '{') {
                braceCount++;
            } else if (A[index] === '}') {
                braceCount--;
            } else if (braceCount > 0 && returnRegex.test(A.substring(index))) {
                foundReturn = true;
            }
            index++;
        }
        return braceCount === 0 && foundReturn; // Ensure all braces are closed and return statement found
    }

    // Main parsing logic
    while (index < length) {
        skipWhitespace();
        if (A.substring(index, index + 8) === 'function') {
            console.log("Found function at index:", index);
            index += 8;
            skipWhitespace();
            // Skip over function name and whitespace until '(' is found
            while (index < length && (A[index] === '_'|| /\s/.test(A[index]) || A[index] === '$' || /[a-zA-Z0-9]/.test(A[index]))) {
                index++;
            }
            if (!parseArguments()) {
                console.log("Failed to parse arguments at index:", index);
                return false;
            }
            skipWhitespace();
            if (A[index] !== '{') {
                console.log("No opening brace after arguments at index:", index);
                return false;
            }
            index++;
            if (!findReturn()) {
                console.log("No return statement found or mismatched braces within function at index:", index);
                return false;
            }
            return true; // Function is valid
        }
        index++;
    }
    return false;
}




describe('isValidFunction Tests', () => {

    it('should return true for a valid function with correct number of arguments', () => {
        const code = `
        function foo(a, b) {
            if (a > b) {
                return a + b;
            } else {
                return b - a;
            }
        }`;
        const argsCount = 2;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

    it('should return true for a valid function with no arguments', () => {
        const code = `
        function bar() {
            return 42;
        }`;
        const argsCount = 0;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

    it('should return false for a function with missing return statement', () => {
        const code = `
        function baz(a) {
            console.log(a);
        }`;
        const argsCount = 1;
        expect(isValidFunction(code, argsCount)).to.be.false;
    });

    it('should return false for a function with incorrect number of arguments', () => {
        const code = `
        function qux(a, b, c) {
            return a + b + c;
        }`;
        const argsCount = 2;
        expect(isValidFunction(code, argsCount)).to.be.false;
    });

    it('should return true for a function with nested function', () => {
        const code = `
        function outer(a) {
            function inner(b) {
                return b;
            }
            return inner(a);
        }`;
        const argsCount = 1;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

    it('should return true for a valid function with 3 arguments', () => {
        const code = `
        function addThree(a, b, c) {
            return a + b + c;
        }`;
        const argsCount = 3;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

    it('should return true for a valid function with 1 argument and single-line return', () => {
        const code = `
        function square(x) { return x * x; }`;
        const argsCount = 1;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

    it('should return false for a function with no return statement inside a block', () => {
        const code = `
        function noReturnInBlock(a) {
            if (a > 0) {
                console.log(a);
            }
        }`;
        const argsCount = 1;
        expect(isValidFunction(code, argsCount)).to.be.false;
    });

    it('should return true for a function with spaced out return statement', () => {
        const code = `
        function spacedReturn(a) {
            if (a > 0) {
                return
                a;
            }
        }`;
        const argsCount = 1;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

    it('should return true for a function with different formatting', () => {
        const code = `
        function formatted(a, b) {
            if (a > b) return a; else return b;
        }`;
        const argsCount = 2;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

    it('should return true for a function with nested blocks and return statement', () => {
        const code = `
        function nestedReturn(a) {
            if (a > 0) {
                if (a < 10) {
                    return a * 2;
                }
            }
            return a;
        }`;
        const argsCount = 1;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

    it('should return false for an invalid function with mismatched braces', () => {
        const code = `
        function mismatchedBraces(a) {
            if (a > 0) {
                return a;
        }`;
        const argsCount = 1;
        expect(isValidFunction(code, argsCount)).to.be.false;
    });

    it('should return true for a valid function with multiple returns', () => {
        const code = `
        function multipleReturns(a) {
            if (a > 0) {
                return a;
            } else {
                return -a;
            }
        }`;
        const argsCount = 1;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

    it('should return true for a function with inline comment', () => {
        const code = `
        function commented(a, b) {
            // This is a comment
            return a + b; // Return the sum
        }`;
        const argsCount = 2;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

   
    it('should return false for a function with argument having default value', () => {
        const code = `
        function defaultArg(a, b = 5) {
            return a + b;
        }`;
        const argsCount = 1;
        expect(isValidFunction(code, argsCount)).to.be.false;
    });

    // NOT IN SCOPE OF THIS PROJECT
    // it('should return true for a valid function with spread/rest parameter', () => {
    //     const code = `
    //     function sumAll(...args) {
    //         return args.reduce((sum, val) => sum + val, 0);
    //     }`;
    //     const argsCount = 0;
    //     expect(isValidFunction(code, argsCount)).to.be.true;
    // });

    // it('should return true for a valid function with destructuring parameter', () => {
    //     const code = `
    //     function destructure({a, b}) {
    //         return a + b;
    //     }`;
    //     const argsCount = 1;
    //     expect(isValidFunction(code, argsCount)).to.be.true;
    // });

    it('should return true for a valid function with complex body and early return', () => {
        const code = `
        function complex(a, b) {
            if (a === b) return 0;
            let result = a + b;
            if (result > 10) {
                return result;
            }
            return -1;
        }`;
        const argsCount = 2;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

    it('should return true for a function with incorrect syntax', () => {
        const code = 'function foo(a)(b)(c) asdiaghiua { return -1;}';
        const argsCount = -1;
        expect(isValidFunction(code, argsCount)).to.be.true;
    });

    it('should return false for a function with no return statement or mismatched braces', () => {
        const code = 'No return statement found or mismatched braces within function at index:';
        const argsCount = -1;
        expect(isValidFunction(code, argsCount)).to.be.false;
    });

    
});