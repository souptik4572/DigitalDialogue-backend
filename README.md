[![forthebadge made-with-javascript](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

# DigitalDialogue Backend

A robust backend API for a full-stack MERN (MongoDB, Express, React, Node.js) blogging platform that enables users to create, read, update, and delete blog posts while fostering community engagement through likes and comments.

The API docs are published [here](https://documenter.getpostman.com/view/14121536/TzsbM7xg) using Postman.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [User Roles & Permissions](#user-roles--permissions)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

DigitalDialogue Backend is a comprehensive API server that manages user authentication, blog management, and community interactions. It uses MongoDB for data persistence and JWT for secure authentication, with role-based access control to manage different user permissions.

## ✨ Features

- **User Authentication**: Secure registration and login with JWT token mechanism
- **Blog Management**: Create, read, update, and delete blog posts with rich metadata
- **Blog Interactions**: Like/unlike blogs and track user engagement
- **Comment System**: Add, edit, and delete comments on blogs
- **User Management**: Admin capabilities to manage user roles and designations
- **Role-Based Access Control**: Three-tier user hierarchy (Super Admin, Admin, Reader)
- **CORS Support**: Cross-origin resource sharing for frontend integration
- **Static File Serving**: Built-in support for serving public assets
- **Error Handling**: Comprehensive error management and logging

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | N/A | JavaScript runtime |
| **Express.js** | ^5.1.0 | Web framework for API routes |
| **MongoDB** | N/A | NoSQL database for data persistence |
| **Mongoose** | ^8.17.0 | MongoDB object modeling |
| **JWT** | ^9.0.2 | Secure token-based authentication |
| **bcryptjs** | ^3.0.2 | Password hashing and security |
| **CORS** | ^2.8.5 | Cross-origin resource sharing middleware |
| **dotenv** | ^17.2.1 | Environment variable management |
| **nodemon** | N/A | Development auto-reload utility |

## 📁 Project Structure

```
DigitalDialogue-backend/
├── config/
│   ├── env-config.js           # Environment variable configuration
│   └── mongoose-config.js      # MongoDB connection setup
├── constants/
│   └── userTypes.js            # User role constants (SUPER_ADMIN, ADMIN, READER)
├── controllers/
│   ├── authentication.js       # Auth logic (register, login)
│   ├── blogs.js               # Blog CRUD operations
│   ├── comments.js            # Comment management
│   └── user.js                # User administration
├── middlewares/
│   ├── authStrategy.js        # JWT verification and role protection
│   └── ownerStrategy.js       # Resource ownership validation
├── models/
│   ├── User.js                # User schema definition
│   ├── Blog.js                # Blog schema definition
│   └── Comment.js             # Comment schema definition
├── routes/
│   ├── authentication.js       # Auth endpoints
│   ├── blogs.js               # Blog endpoints
│   ├── comments.js            # Comment endpoints
│   └── users.js               # User management endpoints
├── public/
│   ├── index.html             # Default landing page
│   └── style.css              # Basic styling
├── index.js                    # Application entry point
├── package.json               # Project dependencies
└── README.md                  # This file
```

## 💾 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/souptik4572/DigitalDialogue-backend.git
   cd DigitalDialogue-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File**
   Create a `.env` file in the root directory with the required variables (see Environment Setup section)

4. **Verify Installation**
   ```bash
   npm start
   ```
   You should see: `Server up and running at http://localhost:3000`

## 🔧 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Node Environment
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/digitaldialogue
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/digitaldialogue

# Server Port
PORT=3000

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key_here

# Database Name (if not using full MongoDB URI)
DB_NAME=digitaldialogue
```

### Important Notes:
- Keep `JWT_SECRET` secure and unique for production
- Use environment-specific URIs for development vs. production
- Never commit `.env` file to version control

## 🚀 Running the Server

### Development Mode (with auto-reload)
```bash
npm run devStart
```
Uses nodemon to automatically restart the server on file changes.

### Production Mode
```bash
npm start
```
Standard node server startup.

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| PUT | `/auth/register` | Register a new user | ❌ |
| POST | `/auth/login` | Login and receive JWT token | ❌ |

### Blog Routes (`/api/blogs`)

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|----------------|---------------|
| GET | `/blogs` | Fetch all blogs | ❌ | - |
| GET | `/blogs/:blogId` | Get a specific blog | ❌ | - |
| PUT | `/blogs` | Create a new blog | ✅ | Admin+ |
| PATCH | `/blogs/:blogId` | Edit a blog | ✅ | Admin (Owner) |
| DELETE | `/blogs/:blogId` | Delete a blog | ✅ | Admin (Owner) |
| PATCH | `/blogs/:blogId/like` | Like/unlike a blog | ✅ | Reader+ |

### Comment Routes (`/api/blogs/:blogId/comments`)

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|----------------|---------------|
| GET | `/comments` | Get all comments on a blog | ❌ | - |
| PUT | `/comments` | Create a new comment | ✅ | Reader+ |
| PATCH | `/comments/:commentId` | Edit a comment | ✅ | Owner |
| DELETE | `/comments/:commentId` | Delete a comment | ✅ | Owner |

### User Management Routes (`/api/users`) - Admin Only

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|----------------|---------------|
| GET | `/users` | Fetch all users | ✅ | Super Admin |
| PATCH | `/users/:userId/changedesignation` | Change user role | ✅ | Super Admin |
| DELETE | `/users/:userId` | Delete a user | ✅ | Super Admin |

## 👥 User Roles & Permissions

The application implements a three-tier role-based access control system:

### 1. **SUPER_ADMIN**
   - Full system access
   - Manage all users (view, change role, delete)
   - Create, edit, and delete any blog
   - Access to all administrative functions

### 2. **ADMIN**
   - Create, edit, and delete their own blogs
   - Like/unlike blogs
   - Comment on blogs
   - Cannot edit/delete other users' content
   - Cannot perform user management

### 3. **READER** (Default)
   - Read all published blogs
   - Like/unlike blogs
   - Comment on blogs
   - Cannot create or edit blogs
   - Limited to their own comments management

## 💾 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  password: String (required, hashed),
  userType: String (enum: SUPER_ADMIN, ADMIN, READER, default: READER)
}
```

### Blog Collection
```javascript
{
  _id: ObjectId,
  image: String (default: Pexels placeholder image URL),
  title: String (required),
  content: String (required),
  likes: Number (default: 0),
  usersWhoLiked: [ObjectId] (references to User),
  comments: [ObjectId] (references to Comment),
  createdOn: Date (default: Date.now),
  updatedOn: Date (default: Date.now),
  createdBy: ObjectId (reference to User)
}
```

### Comment Collection
```javascript
{
  _id: ObjectId,
  text: String (required),
  createdOn: Date (default: Date.now),
  createdBy: ObjectId (reference to User),
  associatedBlog: ObjectId (reference to Blog)
}
```

## 🔐 Authentication

### JWT Token Flow

1. **Registration**: User creates account → Password hashed with bcryptjs → User stored in database
2. **Login**: User provides credentials → Server validates → JWT token generated and returned
3. **Protected Routes**: Client includes token in Authorization header → Middleware validates token → Access granted/denied

### Security Features

- Passwords hashed using bcryptjs (industry standard)
- JWT tokens for stateless authentication
- Token validation on protected routes
- Role-based route protection
- Ownership verification for resource modifications

### Using JWT Tokens

Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token_here>
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

**Author**: Souptik Sarkar  
**Repository**: [GitHub](https://github.com/souptik4572/DigitalDialogue-backend)  
**Issues**: [GitHub Issues](https://github.com/souptik4572/DigitalDialogue-backend/issues)
