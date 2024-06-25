const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URI;

const connectDb = () => {
    try {
        return mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
    }
}

module.exports = connectDb;