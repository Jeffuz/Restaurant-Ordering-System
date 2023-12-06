# Restaurant Ordering System

## Overview

The Restaurant Ordering System is a web-based application that enables customers to easily browse menus and place orders while empowering restaurants to efficiently manage orders.

## Technologies

- **Frontend:**
  - React.js
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - MongoDB

- **Authentication:**
  - Firebase

## Features

- **Customer Side:**
  - Interactive menu 
  - Ability to add, remove, and customize items in the shopping cart.

- **Admin Side:**
  - Menu management (add, edit, delete items, set details, and availability).
  - Order processing and order status tracking.

## Setup
1. Git clone the repository.
2. Open terminal.
3. In terminal run the following lines one after another:
npm install
cd client
npm install
cd -
cd server
npm install

4. In the client folder, create a .env file and paste 
```
REACT_APP_FIREBASE_API_KEY=AIzaSyBmg1FePefLn5wnzyWf7Gtzu1C2KhgQk4A
REACT_APP_FIREBASE_AUTH_DOMAIN=restaurant-ordering-syst-379a8.firebaseapp.com
REACT_APP_FIREBASE_DB_URL=https://restaurant-ordering-syst-379a8-default-rtdb.firebaseio.com/
REACT_APP_FIREBASE_PROJECT_ID=restaurant-ordering-syst-379a8
REACT_APP_FIREBASE_STORAGE_BUCKET=restaurant-ordering-syst-379a8.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=745676889053
REACT_APP_FIREBASE_APP_ID=1:745676889053:web:aecff702d43b6481403434
REACT_APP_FIREBASE_MEASUREMENT_ID=G-8DVJ520486
```

5. In the server folder, create a .env file and paste 
```
DB_URL=mongodb+srv://user02:F3Nmo4GwITYYuRIw@restaurant-ordering-sys.wiy8h0z.mongodb.net/
```

## How to Run Code
1. Open terminal.
2. Split the terminal.
3. In one of the terminals run:
cd server
node server.js
4. In another one of the terminals run:
cd client
npm start
