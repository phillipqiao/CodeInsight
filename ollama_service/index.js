// index.js
import express from 'express';
import axios from "axios";
import cors from "cors";

const app = express();

// For parsing application/json
app.use(express.json());

// Avoid CORS protection
app.use(cors());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const url = process.env.OLLAMA_API_URL || 'http://ollama:11434/api/generate';

const headers = {
    "Content-Type": "application/json"
};


// Root route to ensure the server is running
app.get('/', (req, res) => {
    res.send("Dylan's API is running");
});


app.post('/', async (req, res) => {
    const item = req.body;
    const regex = /```javascript\s*([\s\S]*?)\s*```/;


    const payload = {
        "model": item.model,
        "prompt": item.prompt,
        "stream": false,
        "options": {
         "top_p": 0.1,
         "max_tokens": 100,
         "num_keep": 1,
         "seed": 910,
         "temperature": 0.1
        }
   
    };
   
    try {
        const response = await axios.post(url, payload, { headers: headers });
        const codeMatch = response.data.response.match(regex);
        const extractedCode = codeMatch[1].trim();

        let fixedSyntaxCode = "";


        let openCount = 0;
        let closeCount = 0;
   
        for (let char of extractedCode) {
            if (char === '(') openCount++;
            if (char === ')') closeCount++;
         }
   
         if (closeCount > openCount) {
            let lastCloseIndex = extractedCode.lastIndexOf(')');
            fixedSyntaxCode = extractedCode.slice(0, lastCloseIndex) + extractedCode.slice(lastCloseIndex + 1);
        } else {
            fixedSyntaxCode = extractedCode;
        }
        
       
        res.json({ "data": fixedSyntaxCode });
        // res.json({ "data": extractedCode });

    } catch (error) {
        // console.error("error:", error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
});


app.listen(4000, () => {
    console.log(`Server running at http://localhost:4000`);
});

