const mongoose = require('mongoose');

before((done) => {
    try {
        mongoose.connect("mongodb://localhost:27017/usersTestdb", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        done();
        console.log("Connected to the db");
    } catch (err) {
        conosole.log("Connection to the db failed");
    };
});


beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});

afterEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});

after(done => {
    mongoose.disconnect();
    done();
});