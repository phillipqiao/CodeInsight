const axios = require('axios');

// THIS code is a staging group for integrating backend w/ frontend. It is NOT INTERESTING expect to the student in charge of backend 

async function getUserById(id) {
    try {
        const response = await axios.get(`http://localhost:3010/users/${id}`);
        const user = response.data;
        
        if (user) {
            const username = user.username;
            const password = user.password;
            console.log(`Username: ${username}, Password: ${password}`);
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error("Error fetching user with ID 1:", error.message);
    }
}

async function createUser(user) {
    try {
        const response = await axios.post('http://localhost:3010/users', user);
        console.log('User created successfully:', response.data);
    } catch (error) {
        console.error('Error creating user:', error.message);
    }
}

async function deleteUser(id) {
    try {
        const response = await axios.delete(`http://localhost:3010/users/${id}`);
        console.log('User deleted successfully:', response.data);
    } catch (error) {
        console.error('Error deleting user:', error.message);
    }
}



const newUser = {
    id: 49,
    username: 'RobertWang',
    email: 'RobertWang@example.com',
    password: 'securepassword765'
};

// sample calls 

createUser(newUser);

getUserById(1);

deleteUser(49);