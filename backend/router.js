
// ROUTER FUNCTIONS FOR QUERYING THE DATABASE 

//---------------------------------------------------------------------------
const express = require('express');
const pool = require("./db")
const router = express.Router(); 
const axios = require('axios'); 
//---------------------------------------------------------------------------


//Function to get a user by ID 
async function getUserById(id) { 
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows; 
    } catch (err) {
        console.error('Error fetching user with ID $[id}:', err.message); 
        throw err; 
    }
}

// Function to call the /users route 
async function callUsersRoute() {
    try {
        const response = await axios.get('http://localhost:3010/users');
        console.log("All users:", response.data);
    } catch (error) {
        console.error("Error fetching users:", error.message);
    }
}

// Route to get all rows from the "users" table
router.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
        // console.log("try the router.get all users ",result.rows)  // print out twice? 
            // proves that this promises is running
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Route to get a single user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Route to add a new user
router.post('/users', async (req, res) => {
    try {
        const { id, username, email, password } = req.body;

        // Insert into users table
        const result = await pool.query(
            'INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, username, email, password]
        );

        const newUser = result.rows[0];

        // If the user insertion is successful, proceed to check and insert into userAttempts
        if (newUser) {
            // Check if user ID exists in userAttempts table
            const attemptCheck = await pool.query(
                'SELECT * FROM userAttempts WHERE userId = $1',
                [id]
            );

            // If user ID exists in userAttempts, drop the entry
            if (attemptCheck.rows.length > 0) {
                await pool.query(
                    'DELETE FROM userAttempts WHERE userId = $1',
                    [id]
                );
            }

            // Insert new entry into userAttempts with attempts set to 0
            await pool.query(
                'INSERT INTO userAttempts (userId, easyAttempts, medAttempts, hardAttempts) VALUES ($1, 0, 0, 0)',
                [id]
            );
        }

        console.log(newUser);
        res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        console.log(`Updating user with id ${id}:`, { username, email, password });
        
        const result = await pool.query(
            'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [username, email, password, id]
        );
        
        if (result.rowCount === 0) {
            console.log(`User with id ${id} not found`);
            return res.status(404).json({ error: 'User not found' });
        }
        
        console.log(`User updated successfully:`, result.rows[0]);
        res.json(result.rows[0]); // Return the updated user object
    } catch (err) {
        console.error('Error updating user:', err.message);
        res.status(500).send("Server Error");
    }
});


// UPDATED Route to delete a user and handle dependencies
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if there are any entries in questionAttempts for the user
        const questionAttemptsResult = await pool.query('SELECT COUNT(*) FROM questionAttempts WHERE userId = $1', [id]);
        const questionAttemptsCount = parseInt(questionAttemptsResult.rows[0].count);

        // Check if there are any entries in userAttempts for the user
        const userAttemptsResult = await pool.query('SELECT COUNT(*) FROM userAttempts WHERE userId = $1', [id]);
        const userAttemptsCount = parseInt(userAttemptsResult.rows[0].count);

        if (questionAttemptsCount > 0 || userAttemptsCount > 0) {
            // Start a transaction
            const client = await pool.connect();
            try {
                await client.query('BEGIN');

                // Delete from questionAttempts if entries exist
                if (questionAttemptsCount > 0) {
                    await client.query('DELETE FROM questionAttempts WHERE userId = $1', [id]);
                }

                // Delete from userAttempts if entries exist
                if (userAttemptsCount > 0) {
                    await client.query('DELETE FROM userAttempts WHERE userId = $1', [id]);
                }

                // Delete the user
                await client.query('DELETE FROM users WHERE id = $1', [id]);

                await client.query('COMMIT');
                res.send("User and related data deleted successfully");
            } catch (err) {
                await client.query('ROLLBACK');
                console.error('Error deleting user and related data:', err.message);
                res.status(500).send("Server Error");
            } finally {
                client.release();
            }
        } else {
            // If no related entries, just delete the user
            await pool.query('DELETE FROM users WHERE id = $1', [id]);
            res.send("User deleted successfully");
        }
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).send("Server Error");
    }
});

// Route to handle login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            res.json({ success: true, user: result.rows[0] });
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).send("Server Error");
    }
});


//--------------------------------------------------------------------------------------------------------------
// questionBank routes 

// Route to get a single question by ID
router.get('/questionBank/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM questionBank WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Route to add a new question
router.post('/questionBank', async (req, res) => {
    try {
        const { id, val, diff } = req.body;
        const result = await pool.query(
            'INSERT INTO questionBank (id, val, diff) VALUES ($1, $2, $3) RETURNING *',
            [id, val, diff]
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Route to update a question
router.put('/questionBank/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { val, diff } = req.body;
        await pool.query(
            'UPDATE questionBank SET val = $1, diff = $2 WHERE id = $3',
            [val, diff, id]
        );
        res.send("Question updated successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Route to delete a question
router.delete('/questionBank/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM questionBank WHERE id = $1', [id]);
        res.send("Question deleted successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Route to get all questions
router.get('/questionBank', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM questionBank');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Route to get all questions with a specific difficulty level
// Should return the SAME order each time due to ORDER BY id. 
router.get('/questionBank/difficulty/:diff', async (req, res) => {
    try {
        const { diff } = req.params;
        const result = await pool.query('SELECT * FROM questionBank WHERE diff = $1 ORDER BY id', [diff]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching questions by difficulty:', err.message);
        res.status(500).send("Server Error");
    }
});


//------------------------------------------------------------------------------------------------------------
// testBank route 

// Route to get test by ID
router.get('/testBank/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM testBank WHERE id = $1', [id]);
        // res.json(result.rows[0]); 
        res.json(result.rows);      // return all rows 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Route to add a new test
router.post('/testBank', async (req, res) => {
    try {
        const { id, val } = req.body;
        const result = await pool.query(
            'INSERT INTO testBank (id, val) VALUES ($1, $2) RETURNING *',
            [id, val]
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Route to update a test  DO NOT USE b/c no unique key  
router.put('/testBank/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { val } = req.body;
        await pool.query(
            'UPDATE testBank SET val = $1 WHERE id = $2',
            [val, id]
        );
        res.send("Test updated successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Route to delete a test
router.delete('/testBank/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { val } = req.body; 
        await pool.query('DELETE FROM testBank WHERE id = $1 and val = $2', [id, val]);
        res.send("Test deleted successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// to delete, url is http://localhost:3010/testBank/1
// and json is 
//{
//    "val" : "tombro"
//}

// Route to get all tests
router.get('/testBank', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM testBank');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//------------------------------------------------------------------------------------------------------------
//Answer Key Route 

router.get('/answerKey/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM answerKey WHERE id = $1', [id]);
        // res.json(result.rows[0]); 
        res.json(result.rows);      // return all rows 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



//------------------------------------------------------------------------------------------------------------
// userAttempts route 

// Route to get all attempts for a specific user by userId
router.get('/userAttempts/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await pool.query('SELECT * FROM userAttempts WHERE userId = $1', [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Route to update easyAttempts for a specific user
router.put('/userAttempts/easy/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { easyAttempts } = req.body;

        const query = 'UPDATE userAttempts SET easyAttempts = $1 WHERE userId = $2 RETURNING *';
        const values = [easyAttempts, userId];

        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error('Error updating easyAttempts:', err.message);
        res.status(500).send('Server Error');
    }
});


// Route to update medAttempts for a specific user
router.put('/userAttempts/med/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { medAttempts } = req.body;

        const query = 'UPDATE userAttempts SET medAttempts = $1 WHERE userId = $2 RETURNING *';
        const values = [medAttempts, userId];

        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error('Error updating medAttempts:', err.message);
        res.status(500).send('Server Error');
    }
});

// Route to update hardAttempts for a specific user
router.put('/userAttempts/hard/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { hardAttempts } = req.body;

        const query = 'UPDATE userAttempts SET hardAttempts = $1 WHERE userId = $2 RETURNING *';
        const values = [hardAttempts, userId];

        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error('Error updating hardAttempts:', err.message);
        res.status(500).send('Server Error');
    }
});





//------------------------------------------------------------------------------------------------------------

// questionAttempts route

// Route to get all question attempts for a specific user by userId, sorted by diff and attemptNum
router.get('/questionAttempts/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const query = 'SELECT * FROM questionAttempts WHERE userId = $1 ORDER BY diff ASC, attemptNum ASC'; 
        const result = await pool.query(query, [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching question attempts:', err.message);
        res.status(500).send("Server Error");
    }
});

// Route to get all question attempts
router.get('/questionAttempts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM questionAttempts');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching all question attempts:', err.message);
        res.status(500).send('Server Error');
    }
});

// Route to get a specific column from all question attempts
router.get('/questionAttempts/column/:column', async (req, res) => {
    try {
        const { column } = req.params;
        const validColumns = [
            'userId', 'diff', 'attemptNum', 
            'q1score', 'q1stars', 'q1time', 
            'q2score', 'q2stars', 'q2time', 
            'q3score', 'q3stars', 'q3time', 
            'q4score', 'q4stars', 'q4time', 
            'totalScore', 'avgScore', 
            'totalTime', 'avgTime', 
            'totalStars', 'avgStars'
        ];

        if (!validColumns.includes(column)) {
            return res.status(400).send('Invalid column name');
        }

        const query = `SELECT ${column} FROM questionAttempts`;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching specific column from question attempts:', err.message);
        res.status(500).send('Server Error');
    }
});


// Route to get question attempts by difficulty
router.get('/questionAttempts/filter/:diff', async (req, res) => {
    try {
        const { diff } = req.params;
        const result = await pool.query('SELECT * FROM questionAttempts WHERE diff = $1', [diff]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching question attempts by difficulty:', err.message);
        res.status(500).send('Server Error');
    }
});

// Route to get a specific column from question attempts by difficulty
router.get('/questionAttempts/filter/:diff/column/:column', async (req, res) => {
    try {
        const { diff, column } = req.params;
        const validColumns = [
            'userId', 'diff', 'attemptNum', 
            'q1score', 'q1stars', 'q1time', 
            'q2score', 'q2stars', 'q2time', 
            'q3score', 'q3stars', 'q3time', 
            'q4score', 'q4stars', 'q4time', 
            'totalScore', 'avgScore', 
            'totalTime', 'avgTime', 
            'totalStars', 'avgStars'
        ];

        if (!validColumns.includes(column)) {
            return res.status(400).send('Invalid column name');
        }

        const query = `SELECT ${column} FROM questionAttempts WHERE diff = $1`;
        const result = await pool.query(query, [diff]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching specific column from question attempts by difficulty:', err.message);
        res.status(500).send('Server Error');
    }
});



// Route to get all question attempts for a specific user by userId and diff, sorted by attemptNum
router.get('/questionAttempts/:userId/:diff', async (req, res) => {
    try {
        const { userId, diff } = req.params;
        const result = await pool.query('SELECT * FROM questionAttempts WHERE userId = $1 AND diff = $2 ORDER BY attemptNum ASC', [userId, diff]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching question attempts:', err.message);
        res.status(500).send("Server Error");
    }
});

// Route to get all question attempts for a specific user by userId and attemptNum, sorted by diff
router.get('/questionAttemptsNum/:userId/:attemptNum', async (req, res) => {
    try {
        const { userId, attemptNum } = req.params;
        const result = await pool.query('SELECT * FROM questionAttempts WHERE userId = $1 AND attemptNum = $2 ORDER BY diff ASC', [userId, attemptNum]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching question attempts:', err.message);
        res.status(500).send("Server Error");
    }
});

// Route to get the sum of stars earned by a user from questionAttempts
router.get('/sumStars/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const query = 'SELECT SUM(totalStars) AS sumStars FROM questionAttempts WHERE userId = $1';
        const result = await pool.query(query, [userId]);
        
        if (result.rows.length > 0) {
            res.json({ sumStars: result.rows[0].sumstars });
        } else {
            res.json({ sumStars: 0 });
        }
    } catch (err) {
        console.error('Error fetching sum of stars:', err.message);
        res.status(500).send('Server Error');
    }
});

// Route to insert a new question attempt
router.post('/questionAttempts', async (req, res) => {
    try {
        const {
            userId,
            diff,
            attemptNum,
            q1score, q1stars, q1time,
            q2score, q2stars, q2time,
            q3score, q3stars, q3time,
            q4score, q4stars, q4time,
            totalScore, avgScore,
            totalTime, avgTime,
            totalStars, avgStars
        } = req.body;

        const query = `
            INSERT INTO questionAttempts (
                userId, diff, attemptNum,
                q1score, q1stars, q1time,
                q2score, q2stars, q2time,
                q3score, q3stars, q3time,
                q4score, q4stars, q4time,
                totalScore, avgScore,
                totalTime, avgTime,
                totalStars, avgStars
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
            RETURNING *;
        `;

        const values = [
            userId, diff, attemptNum,
            q1score, q1stars, q1time,
            q2score, q2stars, q2time,
            q3score, q3stars, q3time,
            q4score, q4stars, q4time,
            totalScore, avgScore,
            totalTime, avgTime,
            totalStars, avgStars
        ];

        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting question attempt:', err.message);
        res.status(500).send('Server Error');
    }
});



//------------------------------------------------------------------------------------------------------------

// test 
// router.get('/users'); //compiles 
// router.get('/users/:id', 1) //error
//

module.exports = {
    router,
    getUserById,
    callUsersRoute 
};

//---------------------------------------------------------------------------
