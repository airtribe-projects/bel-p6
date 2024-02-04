class Validator {
    static validateCourseInfo(courseInfo) {
        if(courseInfo.hasOwnProperty("course") &&
        courseInfo.hasOwnProperty("courseId") &&
        courseInfo.hasOwnProperty("cohort") &&
        courseInfo.hasOwnProperty("college") &&
        courseInfo.hasOwnProperty("semester") &&
        courseInfo.hasOwnProperty("instructor") &&
        courseInfo.hasOwnProperty("averageRating") &&
        courseInfo.hasOwnProperty("studentsVoted")) {
            return {
                "status": true,
                "message": "Course has been validated"
            };
        } else {
            return {
                "status": false,
                "message": "Course Info is malformed, please provide me all the parameters"
            };
        }
    }
}

module.exports = Validator;