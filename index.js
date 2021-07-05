const express = require('express');
const configureMongoose = require('./config/mongoose-config');
const authenticationRoutes = require('./routes/authentication');
const blogRoutes = require('./routes/blogs');

// Configuring our Mongo database with mongoose
configureMongoose();

const app = express();

// Our body-parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All of our authentication routes
app.use('/api/auth', authenticationRoutes);
// All of our blogs routes
app.use('/api/blogs', blogRoutes);

// Initialising our dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server up and running at http://localhost:${PORT}`);
});
