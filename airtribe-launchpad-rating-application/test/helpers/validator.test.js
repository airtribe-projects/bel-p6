const expect = require('chai').expect;
const validator = require('../../src/helpers/validator');

let courseDetails = {
    "course": "test",
    "courseId": 100,
    "cohort": 1,
    "college": "LPU",
    "semester": 2,
    "instructor": "test",
    "studentsVoted": 0,
    "averageRating": 0
};

describe("Testing the validate course info functionality", function() {
    it('1. validating the course info - validates the course successfully and returns some response', function(done) {
        let response = validator.validateCourseInfo(courseDetails);
        expect(response.status).equal(true);
        expect(response.message).equal("Course has been validated");
        done();
    });

    it('2. Validating the course info - validates fails if one of the properties is not defined', function(done) {
        delete courseDetails['course'];
        let response = validator.validateCourseInfo(courseDetails);
        expect(response.status).equal(false);
        expect(response.message).equal("Course Info is malformed, please provide me all the parameters");
        done();
    });
});