# Welcome to MetChat, a chat-webapplication for collection of conversation data

This is a webapplication developed as chat. The purpose of this chat is to collect conaversation data, to be used in AI research.

This project is developed as part of a bachelor's thesis for OsloMet - Oslo Metropolitan University.

## To run this project you need to install Node.js

Use this link to install: [Node.js](https://nodejs.org/en)

## Commands tha can be run from this root folder:

### Installing dependencies:

**cd server && npm install && cd ../client && npm install**

- Installs all packages specified in the package.json file for both the client and server.

### Running backend:

**cd server && npm run back**

- Runs server side.

### Running frontend:

**cd client && npm start**

- Runs client side.

## Link to documentation:

[Sluttrapport](https://docs.google.com/document/d/1gGjynaqrZl73bSMSA6fjgzKabltbjRZdIuUADuQDyY4/edit?usp=sharing)

## Admin access:

To log in as an admin and access the admin pages, follow these steps:

    1. Open your web browser and navigate to the login page of the application.
    2. Enter the username and password assigned to the administrator in the application's database.
    3. Click on the "Log in"  to submit the login request
    4. When you are logged in as an admin, you will be redirected to the main page of the  application
    5. In the browser's address bar, change the URL from: like http://localhost:3000/kontakter to http://localhost:3000/admin/samtaler.
    6. Press Enter or refresh the page to load the admin pages.
