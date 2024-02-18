const expect = require('chai').expect;
const User = require('../../src/models/User');
const bcrypt = require('bcrypt');
const sinon = require('sinon');

describe("Creating the doucments in mongo db without mocking", () => {
    it('Creates a new user successfuly', (done) => {
        const user = new User({
            fullName: 'test',
            email: 'test123@gmail.com',
            role: 'admin',
            password: bcrypt.hashSync('test1234', 8)
        });
        user.save().then(user => {
            expect(user.fullName).equal('test');
            done();
        }).catch(err => {
            console.log(err);
            done();
        });
        
    });

    it('Validates the email of the user and fail for incorrect email', (done) => {
        const user = new User({
            fullName: 'test',
            email: 'test@123@gmail.com',
            role: 'admin',
            password: bcrypt.hashSync('test1234', 8)
        });
        user.save().catch(err => {
            expect(err._message).equal("User validation failed");
            done();
        });
    });

    it('validates the uniqueness of the email', (done) => {
        done();
    });

    it('Validates the role of the user', (done) => {
        const user = new User({
            fullName: 'test',
            email: 'test123@gmail.com',
            role: 'some random role',
            password: bcrypt.hashSync('test1234', 8)
        });
        user.save().catch(err => {
            expect(err._message).equal("User validation failed");
            done();
        });
    });
});

describe("Creating the documents in mongodb with mocking", () => {
    let saveStub;
    const user = new User({
        fullName: 'test',
        email: 'test@123@gmail.com',
        role: 'admin',
        password: bcrypt.hashSync('test1234', 8)
    });

    beforeEach(() => {
        saveStub = sinon.stub(User.prototype, 'save');
    });

    afterEach(() => {
        saveStub.restore();
    });

    it('Creates a new user successfuly', async () => {
        const mockUser = {_id: 123, fullName: "test user", email: "test12345555555555@gmail.com"};
        saveStub.resolves(mockUser);
        const result = await user.save();
        expect(result).to.deep.equal(mockUser);
        expect(saveStub.calledOnce).to.be.true;
        
    });

    it("Validates the email; of the user and fails the validation", async () => {
        user.email = 'test@123@gmail.com';
        let mockError = new Error("User validation failed");
        saveStub.rejects(mockError);

        try {
            await user.save();
        } catch (err) {
            expect(err).to.equal(mockError);
            expect(saveStub.calledOnce).to.be.true;
        }
    });
});