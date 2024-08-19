function generateRandomFunction(difficulty) {
    // These are lambda functions 
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomBoolean = () => Math.random() < 0.5;
    const randomElement = arr => arr[random(0, arr.length - 1)];
    const sample = (arr, n) => {
        const result = [];
        const indices = new Set();
        while (result.length < n) {
            const index = random(0, arr.length - 1);
            if (!indices.has(index)) {
                indices.add(index);
                result.push(arr[index]);
            }
        }
        return result;
    };

    // Initialize function string
    let functionString = "function foo(";

    // Generate random number of inputs
    const numInputs = random(1, 10);
    const inputVars = [];
    const varTypes = ["int", "short", "char", "long"];
    for (let i = 0; i < numInputs; i++) {
        const varName = String.fromCharCode('a'.charCodeAt(0) + i); // 'a'.charCodeAT(0) is asscii, val 61 
        const varType = randomElement(varTypes);
        inputVars.push(`${varType} ${varName}`);
    }
    functionString += inputVars.join(", ") + ") {\n";

    // Generate random number of lines
    
    // adjust number of lines according to difficulty
    if (difficulty == "hard") {
        numLines = random(10, 20);
    } else if (difficulty == "medium") {
        numLines = random(5, 10);
    } else {
        numLines = random(3, 5);
    }

    for (let i = 0; i < numLines; i++) {
        let line = "";
        if (randomBoolean()) {
            const varName = String.fromCharCode('a'.charCodeAt(0) + numInputs + i);
            const varType = randomElement(varTypes);
            const varValue = randomElement(["'6'", "'a'", "10", "20L", "30"]);
            line = `${varType} ${varName} = ${varValue};`;
            inputVars.push(`${varType} ${varName}`);
        } else {
            const numVarsInLine = random(2, Math.min(3, inputVars.length));
            const varsInLine = sample(inputVars, numVarsInLine);
            const operation = randomElement(["+", "-", "*", "/", "%"]);
            line = `${varsInLine[0].split(" ")[1]} ${operation} ${varsInLine[1].split(" ")[1]};`;
        }
        functionString += "    " + line + "\n";
    }

    // Add return statement
    const returnVar = randomElement(inputVars);
    functionString += `    return ${returnVar.split(" ")[1]};\n`;

    // Close the function body
    functionString += "}";

    // Output the final function string
    console.log(functionString);
}

// Generate and print the random function
generateRandomFunction('easy');

