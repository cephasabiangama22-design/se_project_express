# WTWR (What to Wear?) — Backend

## About the Project

This project is the backend server for the WTWR (What to Wear?) application. The backend is responsible for storing and managing user and clothing item data and providing API endpoints that the frontend application can use.
The server was built using Node.js, Express.js, MongoDB, and Mongoose. MongoDB is used to store application data, while Mongoose is used to create schemas, validate data, and communicate with the database.
The backend allows users and clothing items to be created and retrieved. Clothing items can also be deleted, liked, and disliked.

## Description

This project continues the development of the WTWR weather-based clothing application by creating the backend server and database for the application.
The server provides REST API endpoints that allow the application to work with users and clothing items.
User information is stored in MongoDB and includes a user's name and avatar. Clothing items contain information such as the item's name, weather type, image URL, owner, likes, and creation date.
The application uses Mongoose models to define how user and clothing item information should be structured before it is stored in MongoDB.
The backend is separated into models, controllers, and routes to keep the code organized and make the application easier to maintain and expand.

## Functionality

The backend provides functionality for managing users and clothing items.
Users can be created by sending a POST request containing a name and avatar URL. The application can also retrieve all users or retrieve a specific user using the user's ID.
Clothing items can be created using a POST request. Each clothing item contains a name, weather category, image URL, owner, likes, and creation date.
The application can retrieve all clothing items stored in the database.
Clothing items can also be deleted using their MongoDB document ID.
Users can like clothing items. When a user likes an item, the user's ID is added to the item's likes array.
Users can also remove their like from a clothing item. When this happens, the user's ID is removed from the likes array.
The application also includes error handling for invalid IDs, missing resources, invalid data, and server errors.

## Technologies and Techniques

The project uses Node.js, Express.js, MongoDB, Mongoose, JavaScript, Validator, ESLint, Prettier, and Nodemon.

### Node.js

Node.js is used to run JavaScript on the server and provides the environment for the WTWR backend.

### Express.js

Express.js is used to create the web server and API routes.
The server runs on port 3001 by default.
Express middleware is used to process incoming JSON data:

### MongoDB

MongoDB is used as the database for the application.

### Mongoose

Mongoose is used to communicate between the Node.js application and MongoDB.
Mongoose schemas define the structure and validation requirements for users and clothing items.

### Validator

The validator package is used to validate URLs stored in the database, such as user avatar URLs and clothing item image URLs.

### Nodemon

Nodemon is used during development to automatically restart the server when changes are made to the project's JavaScript files.

### ESLint and Prettier

ESLint and Prettier are used to help maintain consistent formatting and JavaScript coding standards throughout the project.
The project uses the Airbnb ESLint configuration.

- ## Final Project Deployment Link

[GitHub Repository](https://github.com/cephasabiangama22-design/se_project_express.git)

### Project Pitch Video

https://www.loom.com/share/cc634abce8e34790828b33d757fad271
