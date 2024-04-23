
const fs = require('fs');
const request = require('supertest');
const chai = require('chai');
const app = require('../app');

const expect = chai.expect;

describe('Record Controller API Tests', () => {
    let server;

    before((done) => {
        server = app.listen(3000, () => {
            console.log('Test server running on port 3000');
            done();
        });
    });

    after((done) => {
        server.close(done);
    });

    let data;

    // Read the content of the data.json file before each test suite
    beforeEach(() => {
        data = JSON.parse(fs.readFileSync('./data/dataset.json', 'utf8'));
    });

    // Test case for adding a new record
    it('should add a new record', async () => {
        const newRecord = {
            name: 'Test User',
            salary: 50000,
            department: 'Test Department',
            sub_department: 'Test Sub-Department'
        };

        const res = await request(app)
            .post('/records')
            .send(newRecord);
        
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message').to.equal('Record added successfully');
        expect(res.body.record).to.have.property('name').to.equal('Test User');

        // Update the data.json file with the new record
        data.push(res.body.record);
        fs.writeFileSync('./data/dataset.json', JSON.stringify(data, null, 2));
    });

it('should delete a record', async () => {
    // Your logic to add a record and retrieve its name...
    const recordNameToDelete = "Test User"; // Assuming you have the name of the record to delete

    const res = await request(app)
        .delete(`/records/${recordNameToDelete}`);
    
    expect(res.status).to.equal(200); // Update assertion to expect 200 status code
    expect(res.body).to.have.property('message').to.equal('Record deleted successfully');
});
    it('should fetch summary statistics for salary over the entire dataset', async () => {
        const res = await request(app)
            .get('/records/summary');
        
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('mean');
        expect(res.body).to.have.property('min');
        expect(res.body).to.have.property('max');
    });

    // Test case for fetching summary statistics for salary for records with "on_contract" true
    it('should fetch summary statistics for salary for records with "on_contract" true', async () => {
        const res = await request(app)
            .get('/records/summary/on-contract');
        
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('mean');
        expect(res.body).to.have.property('min');
        expect(res.body).to.have.property('max');
    });

    // Test case for fetching summary statistics for salary for each department
    it('should fetch summary statistics for salary for each department', async () => {
        const res = await request(app)
            .get('/records/summary/by-department');
        
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('Engineering');
        expect(res.body['Engineering']).to.have.property('mean');
        expect(res.body['Engineering']).to.have.property('min');
        expect(res.body['Engineering']).to.have.property('max');
    });

    // Test case for fetching summary statistics for salary for each department and sub-department combination
    it('should fetch summary statistics for salary for each department and sub-department combination', async () => {
        const res = await request(app)
            .get('/records/summary/by-department-sub-department');
        
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('Engineering_Platform');
        expect(res.body['Engineering_Platform']).to.have.property('mean');
        expect(res.body['Engineering_Platform']).to.have.property('min');
        expect(res.body['Engineering_Platform']).to.have.property('max');
    });

});
