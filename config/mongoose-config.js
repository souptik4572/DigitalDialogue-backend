if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/Digital-Dialogue';

const configureMongoose = () => {
	mongoose.connect(
		DATABASE_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		},
		() => {
			console.log('Successfully connected to MongoDB');
		}
	);
};

module.exports = configureMongoose;
