//Unit tests for backend/router.js
// Pre-defined user stats
// (1,'john_doe', 'john.doe@example.com', 'password123'),
// (2,'jane_smith', 'jane.smith@example.com', 'securepass456'),
// (3,'alice_jones', 'alice.jones@example.com', 'mypassword789');

const expect = chai.expect;

const baseURL = 'http://localhost:3010';
const testUser = {id: 4,username:'abc',email:'abc@gmail.com', password:'password1234'};


describe('GET /users', () => {
    it('should get all users', async () => {
      try {
        const res = await axios.get('http://localhost:3010/users');
        expect(res.status).to.equal(200);
        expect(res.data).to.be.an('array');
        res.data.forEach(user => {
          expect(user).to.have.property('id');
          expect(user).to.have.property('username');
        });
      } catch (error) {
        throw new Error(error);
      }
    });
})  

describe('GET /users/:id', () => {
    it('should get users by id', async () => {
      try {
        const res = await axios.get('http://localhost:3010/users');
        expect(res.status).to.equal(200);
        expect(res.data).to.be.an('array');
      } catch (error) {
        throw new Error(error);
      }
    });

    it('should get users by id 1', async () => {
        try {
          const res = await axios.get('http://localhost:3010/users/1');
          expect(res.status).to.equal(200);
        } catch (error) {
          throw new Error(error);
        }
      });


})  

describe('User Route POST request', () => {
    before((done) => {
        // Check if the user already exists
        axios.get(`${baseURL}/users/${testUser.id}`)
            .then((response) => {
                if (response.status === 200) {
                    // User exists, delete it
                    return axios.delete(`${baseURL}/users/${testUser.id}`);
                } else {
                    // User does not exist, continue
                    done();
                }
            })
            .then(() => {
                done();
            })
            .catch((error) => {
                // If the user does not exist, we will get an error, which we can ignore
                if (error.response && error.response.status === 404) {
                    done();
                } else {
                    done(error);
                }
            });
    });

    it('should post the data and return the created user object', (done) => {
        axios.post(`${baseURL}/users`, testUser)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('object'); // Expecting an object, not an array
                expect(response.data.id).to.equal(testUser.id);
                expect(response.data.username).to.equal(testUser.username);
                expect(response.data.email).to.equal(testUser.email);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});


describe('User Route PUT request', () => {
    const userId = 4;
    const newUser = { id: userId, username: 'newUser', email: 'newUser@example.com', password: 'newPassword123' };
    const updatedUser = { username: 'updatedUser', email: 'updatedUser@example.com', password: 'updatedPassword123' };

    before((done) => {
        // Check if the user already exists
        axios.get(`${baseURL}/users/${userId}`)
            .then((response) => {
                if (response.status === 200) {
                    done();
                } else {
                    throw new Error('User does not exist');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    // User does not exist, create it
                    axios.post(`${baseURL}/users`, newUser)
                        .then((response) => {
                            if (response.status === 200) {
                                done();
                            } else {
                                throw new Error('Failed to create user');
                            }
                        })
                        .catch((err) => {
                            done(err);
                        });
                } else {
                    done(error);
                }
            });
    });

    it('should change the data and return the updated user object', (done) => {
        axios.put(`${baseURL}/users/${userId}`, updatedUser)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('object'); // Expecting an object, not an array
                expect(response.data.id).to.equal(userId);
                expect(response.data.username).to.equal(updatedUser.username);
                expect(response.data.email).to.equal(updatedUser.email);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});


describe('User Route DELETE request', () => {
    it('should DELETE the data', (done) => {
        const userId = 3
        axios.delete(`${baseURL}/users/${userId}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});

describe('Login Route', () => {
    it('should return success and user data for valid credentials', (done) => {
        const userCredentials = { username: 'testuser', password: 'testpassword' };
        axios.post(`${baseURL}/login`, userCredentials)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('success');
                done();
            })
            .catch((error) => done(error));
    });

    it('should return failure message for invalid credentials', (done) => {
        const invalidCredentials = { username: 'wronguser', password: 'wrongpassword' };
        axios.post(`${baseURL}/login`, invalidCredentials)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('success').eql(false);
                expect(response.data).to.have.property('message').eql('Invalid username or password');
                done();
            })
            .catch((error) => done(error));
    });


});

describe('Question Bank Route', () => {
    it('should get the question for the given id', (done) => {
        const id = 1; // Replace with a valid ID for testing
        axios.get(`${baseURL}/questionBank/${id}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('object');
                expect(response.data).to.have.property('id').eql(id);
                done();
            })
            .catch((error) => done(error));
    });

    it('should return 500 for invalid id', (done) => {
        const invalidId = 'invalid_id'; // Use a non-numeric or invalid ID
        axios.get(`${baseURL}/questionBank/${invalidId}`)
            .then((response) => {
                done(new Error('Expected request to fail'));
            })
            .catch((error) => {
                expect(error.response.status).to.equal(500);
                done();
            });
    });

});




describe('Question Bank GET All Route', () => {
    it('should get all questions from the question bank', (done) => {
        axios.get(`${baseURL}/questionBank`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                response.data.forEach(question => {
                    expect(question).to.be.an('object');
                    expect(question).to.have.property('id');
                    expect(question).to.have.property('val');
                    expect(question).to.have.property('diff');
                });
                done();
            })
            .catch((error) => done(error));
    });

});

describe('Question Bank GET by Difficulty Route', () => {
    it('should get all questions with the specified difficulty', (done) => {
        const difficulty = 1; 
        axios.get(`${baseURL}/questionBank/difficulty/${difficulty}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                response.data.forEach(question => {
                    expect(question).to.be.an('object');
                    expect(question).to.have.property('id');
                    expect(question).to.have.property('val');
                    expect(question).to.have.property('diff').eql(difficulty);
                });
                done();
            })
            .catch((error) => done(error));
    });

});

describe('Test Bank GET Route', () => {
    it('should get all entries for the given id from the test bank', (done) => {
        const id = 1; 
        axios.get(`${baseURL}/testBank/${id}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                response.data.forEach(entry => {
                    expect(entry).to.be.an('object');
                    expect(entry).to.have.property('id').eql(id);
                });
                done();
            })
            .catch((error) => done(error));
    });

    it('should return 500 for invalid id', (done) => {
        const invalidId = 'invalid_id';
        axios.get(`${baseURL}/testBank/${invalidId}`)
            .then((response) => {
                done(new Error('Expected request to fail'));
            })
            .catch((error) => {
                expect(error.response.status).to.equal(500);
                done();
            });
    });

});



describe('Answer Key Route', () => {
    it('should get the answer key for the given id', (done) => {
        const id = 1; // Answer key for easy1
        axios.get(`${baseURL}/answerKey/${id}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                expect(response.data[0]).to.have.property('id').eql(id);
                done();
            })
            .catch((error) => done(error));
    });
})


describe('UserAttempts Route', () => {
    it('should get the user attempt for the given id', (done) => {
        const userId = 1; 
        axios.get(`${baseURL}/userAttempts/${userId}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                expect(response.data[0].userid).eql(userId);
                done();
            })
            .catch((error) => done(error));
    });
})

describe('UserAttempts Route', () => {
    it('should get the user attempt for the given id', (done) => {
        const userId = 1; 
        axios.get(`${baseURL}/userAttempts/${userId}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                expect(response.data[0].userid).eql(userId);
                done();
            })
            .catch((error) => done(error));
    });
})

describe('UserAttempts for easy questions Route', () => {
    it('should update easyattempts for a specific user', (done) => {
        const userId = 4; 
        const easyAttempts = 0;
        axios.put(`${baseURL}/userAttempts/easy/${userId}`, { easyAttempts })
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('object');
                expect(response.data).to.have.property('userid').eql(userId);
                expect(response.data).to.have.property('easyattempts').eql(easyAttempts);
                done();
            })
            .catch((error) => done(error));
    });
})
describe('UserAttempts for medium questions Route', () => {
    it('should update medAttempts for a specific user', (done) => {
        const userId = 4; 
        const medAttempts = 0;
        axios.put(`${baseURL}/userAttempts/med/${userId}`, { medAttempts })
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('object');
                expect(response.data).to.have.property('userid').eql(userId);
                expect(response.data).to.have.property('medattempts').eql(medAttempts);
                done();
            })
            .catch((error) => done(error));
    });
})
describe('UserAttempts for hard questions Route', () => {
    it('should update hardAttempts for a specific user', (done) => {
        const userId = 4; 
        const hardAttempts = 0;
        axios.put(`${baseURL}/userAttempts/hard/${userId}`, { hardAttempts })
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('object');
                expect(response.data).to.have.property('userid').eql(userId);
                expect(response.data).to.have.property('hardattempts').eql(hardAttempts);
                done();
            })
            .catch((error) => done(error));
    });
});

describe('GET /questionAttempts/:userId', () => {
    it('should get all question attempts for the given userId', (done) => {
        const userId = 1; 
        axios.get(`${baseURL}/questionAttempts/${userId}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                expect(response.data[0]).to.have.property('userid').eql(userId);
                done();
            })
            .catch((error) => done(error));
    });
});


describe('GET /questionAttempts', () => {
    it('should get all question attempts', (done) => {
        axios.get(`${baseURL}/questionAttempts`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                expect(response.data[0]).to.have.property('userid').eql(1);//the first attempt was by user 1
                done();
            })
            .catch((error) => done(error));
    });
});

describe('GET /questionAttempts/columns/:column', () => {
    it('should get a specific column from all question attempts', (done) => {
        const column = "diff";
        axios.get(`${baseURL}/questionAttempts/column/${column}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                if (response.data.length > 0) {
                    expect(response.data[0]).to.have.property(column);
                }
                done();
            })
            .catch((error) => done(error));
    });
});


describe('GET /questionAttempts/filter/:diff', () => {
    it('should get questions attempts by difficulty', (done) => {
        const diff = 1;
        axios.get(`${baseURL}/questionAttempts/filter/${diff}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                expect(response.data[0].diff).to.eql(diff);
                
                done();
            })
            .catch((error) => done(error));
    });
});

describe('GET /questionAttempts/filter/:diff/column/:column', () => {
    it('should get a specific column from question attempts by difficulty', (done) => {
        const diff = 1;
        const column = "userId"
        axios.get(`${baseURL}/questionAttempts/filter/${diff}/column/${column}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                expect(response.data[0]).to.have.property("userid");
                
                done();
            })
            .catch((error) => done(error));
    });
});

describe('GET /questionAttempts/:userId/:diff', () => {
    it('should get all question attempts for a specific user id and diff', (done) => {
        const userId = 1; 
        const diff = 1;
        axios.get(`${baseURL}/questionAttempts/${userId}/${diff}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                expect(response.data[0]).to.have.property('userid').eql(userId);
                done();
            })
            .catch((error) => done(error));
    });
});

describe('GET /questionAttempts/:userId/:attemptNum', () => {
    it('should get all question attempts for a specific user id and attemptNum', (done) => {
        const userId = 1; 
            const attemptNum = 1; 
            axios.get(`${baseURL}/questionAttemptsNum/${userId}/${attemptNum}`)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.data).to.be.an('array');
                    if (response.data.length > 0) {
                        expect(response.data[0]).to.have.property('userid', userId);
                        expect(response.data[0]).to.have.property('attemptnum', attemptNum);
                    }
                    done();
                })
                .catch((error) => done(error));
    });
});

describe('GET /sumStars/:userId', () => {
    it('should get the sum of stars earned by a user', (done) => {
        const userId = 1; 
        axios.get(`${baseURL}/sumStars/${userId}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('object');
                expect(response.data).to.have.property('sumStars');
                expect(response.data.sumStars).to.be.a('number');
                done();
            })
            .catch((error) => done(error));
    });

});

describe('POST /questionAttempts', () => {
    it('should insert a new question attempt and return the inserted data', (done) => {
        const newAttempt = {
            userId: 4, 
            diff: 1,
            attemptNum: Math.floor(Math.random() * 10000),
            q1score: 10, q1stars: 2, q1time: 30,
            q2score: 9, q2stars: 3, q2time: 25,
            q3score: 10, q3stars: 3, q3time: 20,
            q4score: 5, q4stars: 3, q4time: 15,
            totalScore: 34, avgScore: 17.5,
            totalTime: 90, avgTime: 22.5,
            totalStars: 14, avgStars: 3.5
        };

        axios.post(`${baseURL}/questionAttempts`, newAttempt)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('object');
                console.log(response.data);
                done();
            })
            .catch((error) => done(error));
    });
});




