
# Task Tracker API

The Task Tracker API provides endpoints for managing users, tasks, comments, and teams. This document provides detailed explanations, request structures, and response formats for each endpoint.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
    - [User Management](#user-management)
        - [Register a New User](#register-a-new-user)
        - [Login a User](#login-a-user)
        - [Update User Profile](#update-user-profile)
    - [Task Management](#task-management)
        - [Create New Task](#create-new-task)
        - [Update Task Details](#update-task-details)
    - [Team Management](#team-management)
        - [Create a New Team](#create-a-new-team)
- [Error Handling](#error-handling)
- [Authorization](#authorization)
- [Postman Collection](#postman-collection)

## Getting Started

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install`.
3. Start the server with `npm start`, ensuring it runs on `http://localhost:8080`.

---

## API Endpoints

### User Management

| Endpoint               | Method | Description           | Authentication |
|------------------------|--------|-----------------------|----------------|
| `/users/register`      | POST   | Register a new user   | No             |
| `/users/login`         | POST   | Log in an existing user| No            |
| `/users/update`        | PUT    | Update user profile   | Yes (JWT)      |
| `/users/logout`        | POST   | Log out a user        | Yes (JWT)      |

#### Register a New User
- **URL**: `/users/register`
- **Method**: POST
- **Request Body**:
        ```json
        {
            "username": "Sriram",
            "email": "kgsriram99@gmail.com",
            "password": "Sriram@218",
            "role": "ScrumMaster",
            "profileInfo": [{
                "firstName": "Sriram",
                "lastName": "Gopinath",
                "bio": "I'm a Software Engineer by profession and cricketer by passion.",
                "dob": "1999-08-21",
                "gender": "Male",
                "experience": "4.1 years",
                "designation": "Software Developer 1"
            }]
        }
        ```
- **Response**:
    - **Success**: 201 Created
    - **Error**: 400 Bad Request (if required fields are missing)

---

#### Login a User
- **URL**: `/users/login`
- **Method**: POST
- **Request Body**:
        ```json
        {
            "email": "manasa@tcs.com",
            "password": "manasa@deva"
        }
        ```
- **Response**:
    - **Success**: 200 OK, returns JWT token
    - **Error**: 401 Unauthorized (if credentials are incorrect)

---

#### Update User Profile
- **URL**: `/users/update`
- **Method**: PUT
- **Headers**: 
    - `Authorization`: Bearer `<token>`
- **Request Body**:
        ```json
        {
            "email": "kgsriram99@gmail.com",
            "profileInfo": [
                {
                    "firstName": "Sriram",
                    "lastName": "Gopinath",
                    "bio": "I'm a Software Engineer by profession and cricketer by passion.",
                    "dob": "1999-08-21",
                    "gender": "Male",
                    "experience": "4.1 years",
                    "designation": "Software Developer 1"
                }
            ]
        }
        ```
- **Response**:
    - **Success**: 200 OK
    - **Error**: 401 Unauthorized (if token is invalid)

---

### Task Management

| Endpoint                        | Method | Description                | Authentication |
|---------------------------------|--------|----------------------------|----------------|
| `/tasks/assigned/:id`           | GET    | Fetch assigned tasks       | Yes (JWT)      |
| `/tasks/create`                 | POST   | Create a new task          | Yes (JWT)      |
| `/tasks/update/:id`             | PUT    | Update a task's details    | Yes (JWT)      |
| `/tasks/getAllTasks?search=query` | GET    | Fetch all tasks (filter, search) | Yes (JWT)      |
| `/tasks/:taskId/comment`        | POST   | Add a comment to a task    | Yes (JWT)      |
| `/tasks/:taskId/attachment`     | POST   | Attach a file to a task    | Yes (JWT)      |

#### Create New Task
- **URL**: `/tasks/create`
- **Method**: POST
- **Headers**: 
    - `Authorization`: Bearer `<token>`
- **Request Body**:
        ```json
        {
            "taskname": "Show DiscountLevel in Cart",
            "description": "Display discount levels in Cart page",
            "dueDate": "2024-09-26",
            "priority": "High",
            "status": "Not Started"
        }
        ```
- **Response**:
    - **Success**: 201 Created
    - **Error**: 400 Bad Request (missing fields)

#### Update Task Details
- **URL**: `/tasks/update/:id`
- **Method**: PUT
- **Headers**: 
    - `Authorization`: Bearer `<token>`
- **Request Body**:
        ```json
        {
            "taskName": "Task 3",
            "description": "Assign a task to another team member.",
            "status": "In Progress",
            "priority": "Medium",
            "dueDate": "2024-10-20",
            "assignedTo": "anitha@tcs.com"
        }
        ```
- **Response**:
    - **Success**: 200 OK
    - **Error**: 404 Not Found (if task ID not found)

---

### Team Management

| Endpoint               | Method | Description           | Authentication |
|------------------------|--------|-----------------------|----------------|
| `/teams/createTeam`    | POST   | Create a new team     | Yes (JWT)      |

#### Create a New Team
- **URL**: `/teams/createTeam`
- **Method**: POST
- **Headers**:
    - `Authorization`: Bearer `<token>`
- **Request Body**:
        ```json
        {
            "name": "team purple",
            "members": ["kgsriram99@gmail.com", "anitha@tcs.com"]
        }
        ```
- **Response**:
    - **Success**: 201 Created
    - **Error**: 400 Bad Request (if required fields are missing)

---

## Error Handling

Each endpoint returns HTTP status codes to indicate success or failure.

| Status Code | Description                 |
|-------------|-----------------------------|
| 200 OK      | Request succeeded           |
| 201 Created | Resource created            |
| 400 Bad Request | Validation failed       |
| 401 Unauthorized | Authentication required|
| 404 Not Found | Resource not found        |
| 500 Internal Server Error | Server error  |

---

## Authorization

Pass the JWT token in the `Authorization` header as shown below:

```http
Authorization: Bearer <token>
```

## Postman Collection Link

For further testing, please refer to the [Postman Collection](https://warped-capsule-415893.postman.co/workspace/New-Team-Workspace~f157aff2-2606-47bc-b3d7-06e9756e22af/collection/36964876-d7f0c61c-9a7d-4254-b4ad-c5bc895ea255) for sample requests and responses.
