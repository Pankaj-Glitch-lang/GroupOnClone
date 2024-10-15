# GroupOnClone
<img width="750" alt="Screenshot 2024-10-15 194240" src="https://github.com/user-attachments/assets/88f8bfff-6e1c-4ac6-b52d-fd6a267af6f7">


## Introduction
This project is a full-stack Groupon clone, designed to replicate core functionalities of the Groupon platform, allowing users to browse and purchase deals. The project includes user authentication, product management, cart functionality, and a dynamic front-end using React and Chakra UI.

## Installation
### Step-by-Step Guide to Set Up Locally

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

Install Backend Dependencies

Navigate to the backend directory and install dependencies:

cd GrouponBackend/full-stack-backend
npm install

Install Frontend Dependencies
Navigate to the frontend directory and install dependencies:

cd frontend
npm install

# Set Up Environment Variables
Create a .env file in the backend folder and add your environment variables:

    MONGO_URI=your_mongo_database_url
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_API_KEY=your_cloudinary_key

# Run the Backend
In the backend directory, run:
npm run start

# Run the Frontend
In the frontend directory, run:
npm run dev

## Usage

1. **Access the Application**:  
   Open your browser and go to `http://localhost:5173` for the frontend.

2. **User Authentication**:  
   Users can sign up, log in, and view their profile. Once logged in, users can browse products, add them to the cart, and proceed to checkout.

3. **Admin Panel**:  
   Administrators have access to manage deals, products, and user data.

## Folder Structure

```bash
/GrouponBackend
|-- /full-stack-backend
|   |-- /controllers
|   |-- /models
|   |-- /routes
|   |-- index.js
|
/frontend
|-- /src
|   |-- /components
|   |-- /pages
|   |-- /context
|   |-- App.js

controllers/: Backend logic handling requests.
models/: MongoDB models for users, products, and orders.
routes/: API routes for authentication, product management, etc.
components/: Reusable React components.
pages/: React pages for different views like Home, Product, Cart, etc.
context/: Global state management using Context API.

# Features/Modules
User Authentication: Sign-up, login, and token-based authentication.
Product Listings: Browse and search deals and products.
Cart Functionality: Add products to cart, update quantities, and proceed to checkout.
Dynamic Pages: Drag-and-drop functionality for customizing layouts.
Admin Management: Manage users, products, and deals through an admin panel.
Configuration
Ensure the following environment variables are set in the .env file in the backend:

MONGO_URI: MongoDB connection string.
JWT_SECRET: Secret key for JWT authentication.
CLOUDINARY_API_KEY: API key for Cloudinary image management.


