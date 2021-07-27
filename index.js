const express = require('express');
const configureMongoose = require('./config/mongoose-config');
const authenticationRoutes = require('./routes/authentication');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');
const commentRoutes = require('./routes/comments');

// All of our user defined middlewares
const { authProtection, isSuperAdmin } = require('./middlewares/authStrategy');

// Configuring our Mongo database with mongoose
configureMongoose();

const app = express();

// Our body-parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All of our authentication routes
app.use('/api/auth', authenticationRoutes);
// All of our user routes
app.use('/api/users', [authProtection, isSuperAdmin], userRoutes);
// All of our blog routes
app.use('/api/blogs', blogRoutes);
// All of our comment routes
app.use('/api/blogs/:blogId/comments', commentRoutes);

// Initialising our dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server up and running at http://localhost:${PORT}`);
});
