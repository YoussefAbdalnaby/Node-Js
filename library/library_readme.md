# Library Management System

A web-based library management system built with Node.js, Express, and MongoDB. This application allows users to register, login, and manage their personal book collections.

## Features

- **User Authentication**
  - User registration and login
  - Session-based authentication
  - Password hashing with bcrypt
  - Protected routes

- **Book Management**
  - Add new books with images
  - View all books in the library
  - View detailed book information
  - Manage personal book collection
  - Update book information
  - Delete books

- **User Interface**
  - Responsive web design
  - EJS templating engine
  - Bootstrap styling
  - Flash messages for user feedback

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Express-session, bcrypt
- **File Upload**: Multer
- **Templating**: EJS
- **Frontend**: Bootstrap, jQuery
- **Flash Messages**: Connect-flash

## Prerequisites

Before running this application, make sure you have:

- Node.js (v12 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create environment variables for your MongoDB connection:
   ```
   MONGO_USERNAME=your_mongodb_username
   MONGO_PASSWORD=your_mongodb_password
   MONGO_DBNAME=library
   ```

4. **Create required directories**
   ```bash
   mkdir -p assets/images
   mkdir -p images/uploads
   ```

5. **Start the application**
   ```bash
   npm start
   # or for development with nodemon
   nodemon index.js
   ```

The application will run on `http://localhost:3000`

## Project Structure

```
library/
├── controllers/           # Route controllers
├── models/               # Database models
├── routers/             # Route definitions
├── views/               # EJS templates
├── assets/              # Static files
├── package.json
└── index.js            # Main application file
```

## API Endpoints

### Authentication Routes
- `GET /register` - Registration page
- `POST /register` - Register new user
- `GET /login` - Login page
- `POST /login` - User login
- `POST /logout` - User logout

### Book Routes
- `GET /` - Home page (requires authentication)
- `GET /books` - View all books (requires authentication)
- `GET /details/:id` - View book details (requires authentication)
- `GET /addBook` - Add book page (requires authentication)
- `POST /addBook` - Add new book (requires authentication)
- `GET /mybooks` - View user's books (requires authentication)
- `POST /mybooks/delete/:id` - Delete book (requires authentication)
- `GET /mybooks/update/:id` - Update book page (requires authentication)
- `POST /mybooks/updatebook/:id` - Update book (requires authentication)

### API Routes
- `POST /api` - Register user via API

## Database Schema

### Users Collection
- name: String
- email: String
- password: String (hashed)

### Books Collection
- title: String
- description: String
- author: String
- price: Number
- image: String
- userId: String

## Usage

1. **Register**: Create a new account on the registration page
2. **Login**: Access your account using your credentials
3. **Add Books**: Use the "Add Book" feature to add books to your collection
4. **Browse**: View all books in the library or just your personal collection
5. **Manage**: Update or delete books from your collection

## File Upload

The application supports image uploads for books:
- Images are stored in `assets/images/` directory
- Supported formats: All image formats supported by browsers
- File naming: Timestamp + original filename

## Security Features

- Password hashing using bcrypt
- Session-based authentication
- Protected routes with authentication middleware
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Licensed by Youssef Abdalnaby