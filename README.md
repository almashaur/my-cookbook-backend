# my-cookbook-backend

## Cookbook APi

This is the backend API for the MY-Cookbook application. The API supports both user authentication and recipe management. It follows the Postman Collection schema version 2.1.0 and is designed for easy testing using tools like Postman.

## Table of content
- [Base URL](#base-url)
- [User Authentication](#user-authentication)
  - [Register User](#register-user)
  - [Login User](#login-user)
  - [Get User Profile](#get-user-profile)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
- [Recipe Management](#recipe-management)
  - [Create Recipe (Protected)](#create-recipe-protected)
  - [Get All Recipes](#get-all-recipes)
  - [Get Single Recipe](#get-single-recipe)
  - [Get User's Recipes (Protected)](#get-users-recipes-protected)
  - [Update Recipe (Protected)](#update-recipe-protected)
  - [Delete Recipe (Protected)](#delete-recipe-protected)
- [Setup and Usage](#setup-and-usage)

## Base URL
All endpoints use the following base URL (set this variable in your API client)

## User Authentication

### Register User

- **Method:** POST  
- **Endpoint:** `/api/users/register`  
- **Headers:**  
  - `Content-Type: application/json`  
- **Body:**

  ```json
  {
      "username": "testuser",
      "password": "password123"
  }

## User Authentication

### Login User

- **Method:** POST  
- **Endpoint:** `/api/users/login`  
- **Headers:**  
  - `Content-Type: application/json`  
- **Body:**

  ```json
  {
      "username": "testuser",
      "password": "password123"
  }

### Get User Profile
- **Method:** GET
- **Endpoint:** `/api/users/:id`
- **Headers:**
  - `Authorization: Bearer {{token}}`
  
### Update User

- **Method:** PUT  
- **Endpoint:** `/api/users/:id`  
- **Headers:**  
  - `Content-Type: application/json`  
- **Body:**

  ```json
  {
      "username": "testuser",
      "password": "password123"
  }

### Delete User
- **Method:** DELETE
- **Endpoint:** `/api/users/:id`
- **Headers:**
  - `Authorization: Bearer {{token}}`
 


## Recipe Management

### Create Single Recipe (Protected)
- **Method:** POST
- **Endpoint:** `/api/recipes/create`
- **Headers:**
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`  

- **Body:**

  ```json
  {
      "recipeName": "Spaghetti Bolognese",
      "instructions": "Boil pasta, cook sauce...",
      "ingredients": [
          {
              "ingredientName": "Tomato",
              "amount": "2 cups",
              "alternatives": "Canned tomato"
          },
          {
              "ingredientName": "Beef",
              "amount": "200g",
              "alternatives": "Chicken"
          }
      ],
      "level": "beginner",
      "cuisine": "Italian",
      "tools": [
          "Pan",
          "Spoon"
      ],
      "image": "image_url",
      "serves": 2
  }

### Get All Reccipes
- **Method:** GET
- **endpoint:** `/api/recipes`

### Get Single Recipe
- **Method:** GET
- **Endpoint:** `/api/recipes/:id`

### Get User's Recipes (Protected)
- **Method:** GET
- **Endpoint:** `/api/recipes/user/:id`
- **Headers:**
  - `Authorization: Bearer {{token}}`
 
### Update Recipe
- Method: PUT
- Endpoint: `/api/recipes/:id`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body:**
  ```json
  {
      "recipeName": "Updated Recipe Name",
      "instructions": "New instructions...",
      "ingredients": [
          {
              "ingredientName": "New Ingredient",
              "amount": "1 cup",
              "alternatives": "Alternative"
          }
      ],
      "level": "intermediate",
      "cuisine": "Italian",
      "tools": [
          "Knife",
          "Bowl"
      ],
      "image": "new_image_url",
      "serves": 4
  }

### Delete Recipe
- **Method:** DELETE
- **Endpoint:** `/api/recipes/:id`
- **Headers:**
  - `Authorization: Bearer {{token}}`

## Setup and Usage
**Base URL:** Replace the `base_url` variable with your API's base URL in your API client.
**Authentication:** For protected endpoints, include a valid JWT token in the Authorization header using the format Bearer token.
**Testing:** Use your preferred API testing tool (e.g., Postman) to import this collection and test each endpoint.
**Postman Collection:** This API follows the Postman Collection schema (v2.1.0). You can import the JSON file directly into Postman for a ready-to-use test suite.










  
