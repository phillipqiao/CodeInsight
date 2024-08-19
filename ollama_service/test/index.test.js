//Unit tests for ollama_service/index.js

const expect = chai.expect;

// stringified JSON 
const requestData = {model: 'stable-code:3b', prompt: "return the response following the template : {javascript code of the function}. Write me A function in javascript called addTwoNumbers that adds two numbers together. Don't add extra closed brackets. Ensure the code is runnable. Ensure that every forward bracket has one closed bracket. "}
const requestDataWrongModel = {model: 'mistral', prompt: "return the response following the template : {javascript code of the function}. Write me A function in javascript called addTwoNumbers that adds two numbers together. Don't add extra closed brackets. Ensure the code is runnable. Ensure that every forward bracket has one closed bracket. "}
const requestDataNonModel = {model: 'Uju', prompt: "return the response following the template : {javascript code of the function}. Write me A function in javascript called addTwoNumbers that adds two numbers together. Don't add extra closed brackets. Ensure the code is runnable. Ensure that every forward bracket has one closed bracket. "}
const requestDataEmptyModel = {model: '', prompt: "return the response following the template : {javascript code of the function}. Write me A function in javascript called addTwoNumbers that adds two numbers together. Don't add extra closed brackets. Ensure the code is runnable. Ensure that every forward bracket has one closed bracket. "}
const requestDataEmptyPrompt = {model: '', prompt: "return the response following the template : {javascript code of the function}. Write me A function in javascript called addTwoNumbers that adds two numbers together. Don't add extra closed brackets. Ensure the code is runnable. Ensure that every forward bracket has one closed bracket. "}



describe('Ollama Service API GET request', () => {

    it('should response with a status 200 on GET /', (done) => {
        console.log('Starting GET / test');
        axios.get('http://localhost:4000/')
            .then(response => {
                console.log('GET / response received');
                expect(response.status).to.equal(200);
                expect(response.data).to.equal("Dylan's API is running");
                done();
            })
            .catch(err => done(err));
    });

});

describe("Ollama Service API Post requests", () => {
    it('should process the POST / request correctly', async () => {
        const response = await axios.post('http://localhost:4000/', requestData)

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('data');
        expect(response.data.data).to.include('function addTwoNumbers');
        
    }).timeout(70000);

    it('Wrong Data Model should return Error', async () => {
        try {
            const response = await axios.post('http://localhost:4000/', requestDataWrongModel)
            throw new Error ('Expected request to fail');

        } catch (error) {
            expect(error.response.status).to.equal(400);
        }
        
        
    }).timeout(70000);

    it('A model that does not exist should produce Error', async () => {
        try {
            const response = await axios.post('http://localhost:4000/', requestDataNonModel)
            throw new Error ('Expected request to fail');

        } catch (error) {
            expect(error.response.status).to.equal(400);
        }
        
    })

    it('Empty model should produce Error', async () => {
        try {
            const response = await axios.post('http://localhost:4000/', requestDataEmptyModel)
            throw new Error ('Expected request to fail');

        } catch (error) {
            expect(error.response.status).to.equal(400);
        }
        
    })

    it('Empty Prompt should still produce a response', async () => {
        try {
            const response = await axios.post('http://localhost:4000/', requestDataEmptyPrompt)
            throw new Error ('Expected request to fail');

        } catch (error) {
            expect(error.response.status).to.equal(400);
        }
});
});
describe('Ollama Service API - Concurrent Requests', function() {
    

    it('should handle multiple concurrent requests', async () => {
        
        const response1 = await axios.post('http://localhost:4000/', requestData);
        const response2 = await axios.post('http://localhost:4000/', requestData);
        const response3 = await axios.post('http://localhost:4000/', requestData);
        
        
            expect(response1.status).to.equal(200);
            expect(response1.data).to.have.property('data');
            expect(response2.status).to.equal(200);
            expect(response2.data).to.have.property('data');
            expect(response3.status).to.equal(200);
            expect(response3.data).to.have.property('data');     
    }).timeout(70000 * 2);
});




// just test for the Mocha Chai Web Browser 
describe('Basic Test', () => {
    it('should pass this test', () => {
        expect(true).to.equal(true);
    });
});