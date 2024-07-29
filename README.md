# To-Do List Application (Backend)

## Introduction

This To-Do List application allows users to manage their tasks efficiently. Users can register, log in, create, update, delete, and view their to-do items. The backend is built with Node.js, Express.js, MongoDB, and Supabase for authentication. The frontend is built with React and is styled using Bootstrap.

## Features

- User Registration
- User Login
- Create To-Do Items
- Retrieve To-Do Items
- Update To-Do Items
- Delete To-Do Items
- Session Management


## Installation

1. Install Dependencies:
```sh 
npm install
```
2. Create a `.env` file with the following contents:
```sh
    PORT=your_port
    MONGODB_URI=your_mongodb_url
    JWT_SECRET=your_jwt_secret
    SUPABASE_KEY=your_supabase_key
    SUPABASE_URL=your_supabase_url
```
3. Start the server:
```sh
    npm start
```

## API Endpoints

### User Routes

#### Register a new user
- **URL:** `/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword",
    "name": "username"
  }
- Success Response:
    - Code: 201
    - Content:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "_id": "userId",
        "email": "user@example.com",
        "name": "username",
        "password": "hashedpassword",
        "__v": 0
      }
    }
- Error Response:
    - Code: 400
    - Content:
    ```json
    {
        "error": "Error message"
    }

#### Log in an existing user
- **URL:** `/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
- Success Response:
    - Code: 201
    - Content:
    ```json
    {
        "message": "Signed In Successfully!",
        "token": "jwtToken"
    }
- Error Response:
    - Code: 400
    - Content:
    ```json
    {
        "error": "Invalid credentials"
    }


### To-Do Routes

#### Create a new to-do item
- **URL:** `/todos`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwtToken"
  }
- **Body:**
  ```json
  {
    "title": "New To-Do"
  }
- Success Response:
    - Code: 201
    - Content:
    ```json
    {
        "message": "Todo created successfully.",
        "todo": {
            "userId": "userId",
            "title": "New To-Do",
            "_id": "todoId",
            "__v": 0
        }
    }
- Error Response:
    - Code: 400
    - Content:
    ```json
    {
        "error": "Error message"
    }

#### Retrive all to-do items for the logged-in user
- **URL:** `/todos`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwtToken"
  }
- Success Response:
    - Code: 201
    - Content:
    ```json
    [
        {
          "_id": "todoId",
          "userId": "userId",
          "title": "To-Do Title",
          "__v": 0
        }
    ]
- Error Response:
    - Code: 400
    - Content:
    ```json
    {
        "error": "Error message"
    }

#### Update to-do item by ID
- **URL:** `/todos/:id`
- **Method:** `PUT`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwtToken"
  }
- **Body:**
  ```json
  {
    "title": "Updated Title",
    "completed": true
  }
- Success Response:
    - Code: 201
    - Content:
    ```json
    {
        "_id": "todoId",
        "userId": "userId",
        "title": "Updated Title",
        "completed": true,
        "__v": 0
    }
- Error Response:
    - Code: 400
    - Content:
    ```json
    {
        "error": "To-do item not found"
    }

#### Delete a to-do item by ID
- **URL:** `/todos/:id`
- **Method:** `DELETE`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwtToken"
  }
- Success Response:
    - Code: 201
    - Content:
    ```json
    {
        "message": "To-do item deleted"
    }
- Error Response:
    - Code: 400
    - Content:
    ```json
    {
        "error": "To-do item not found"
    }

### Session Routes

#### Retrive all user sessions
- **URL:** `/sessions`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwtToken"
  }
- Success Response:
    - Code: 201
    - Content:
    ```json
    [
        {
          "_id": "sessionId",
          "userId": "userId",
          "ipAddress": "userIpAddress",
          "__v": 0
        }
    ]
- Error Response:
    - Code: 400
    - Content:
    ```json
    {
        "error": "Error message"
    }


## Usage

After starting the server, you can access the backend API by navigating to `http://localhost:5000/api/` in your web browser or using a tool like Postman to test the API endpoints.
   

## Deployment

The backend is deployed on Render. You can access the live backend at `https://todo-app-backend-a3nu.onrender.com`.




