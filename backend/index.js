const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = process.env.PORT || 3010; 

// const testRoutes = require('./test'); // Import routes from test.js 
const { router: testRoutes, getUserById, callUsersRoute } = require('./router'); // Import routes and function from test.js

app.use(cors());
app.use(express.json()); // MiddleWare to parse JSON bodies 
app.use(testRoutes);     // use the routes defined in test.js 

// Route for the root path 
app.get('/',(req,res) => {
   res.send('Welcome to Roberts API');// can write stuff to the localhost 
    
}); 

app.listen(port, async () => {  // must add async to use await 
    console.log("server has started on port 3010")

    // example query of the users table 
    try {             // await only for async function?
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [1] );
        console.log("User with ID 1:", result.rows);    

    } catch (err) {
        console.error("Error fetching user with ID 1:", err.message);
    }

    try {
        const user = await getUserById(1);
        console.log("User with ID 1:", user);
    } catch (err) {
        console.error("Error fetching user with ID 1:", err.message);
    }

    await callUsersRoute();

})