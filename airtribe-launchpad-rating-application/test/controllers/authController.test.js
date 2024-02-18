process.env.NODE_ENV = 'test';
const server = require('../../src/app');
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const { sign } = require('jsonwebtoken');
chai.use(chaiHttp);


describe('verifies the signup flow with actual mongdo db calls', () => {
    let signupBody = {
        fullName: 'test',
        email: "test123@gmail.com",
        role: 'admin',
        password: 'test1234'
    };
    it('successful signup', (done) => {
        chai.request(server).post('/register').send(signupBody).end((err, res) => {
            expect(res.status).equal(200);
            expect(res.body.message).equal('User created successfully');
            done();
        });
    });

    it('Fails signup because of email validation', (done) => {
        signupBody.email = "test@123@gmail.com";
        chai.request(server).post('/register').send(signupBody).end((err, res) => {
            expect(res.status).equal(500);
            expect(res.body.message._message).equal('User validation failed');
            done();
        });
    });
});

describe('Verifies the signin flow with actual mongdo db', () => {
    beforeEach((done) => {
        let signupBody = {
            fullName: 'test',
            email: "test123@gmail.com",
            role: 'admin',
            password: 'test1234'
        };
        chai.request(server).post('/register').send(signupBody).end((err, res) => {
            done();
        });
    });

    it("successful signin", (done) => {
        let signinBody = {
            email: "test123@gmail.com",
            password: 'test1234'
        }
        chai.request(server).post('/login').send(signinBody).end((err, res) => {
            expect(res.status).equal(200);
            expect(res.body.message).equal('Login Successful');
            console.log(res.body);
            expect(res.body).to.have.property('accessToken');
            done();
        });
    });

    it("fails signin in case of invalid password", (done) => {
        let signinBody = {
            email: "test123@gmail.com",
            password: 'test12345'
        }
        chai.request(server).post('/login').send(signinBody).end((err, res) => {
            expect(res.status).equal(401);
            expect(res.body.message).equal('Invalid password');
            console.log(res.body);
            expect(res.body.accessToken).to.be.undefined;
            done();
        });
    });


    it("fails signin in case the user is not found", (done) => {
        let signinBody = {
            email: "test123456@gmail.com",
            password: 'test12345'
        }
        chai.request(server).post('/login').send(signinBody).end((err, res) => {
            expect(res.status).equal(404);
            expect(res.body.message).equal('User not found');
            console.log(res.body);
            expect(res.body.accessToken).to.be.undefined;
            done();
        });
    });

});

