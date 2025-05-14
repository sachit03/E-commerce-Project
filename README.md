# 🛒 E-Commerce Backend API

This is a full-featured e-commerce backend built using **Node.js**, **Express**, **Sequelize (MySQL)**, and integrated with **Stripe** for secure payment processing. It supports user authentication, product listings, shopping cart, order creation, addresses, and Stripe webhooks for reliable payment confirmation.

---

## 🚀 Features

- User & Admin Authentication (JWT-based)
- Product Management (Admin)
- Add to Cart / View Cart / Update Cart
- Address Management (Billing & Shipping)
- Place Order from Cart
- Stripe Payment Integration
- Stripe Webhook Support
- Sequelize + MySQL DB Integration
- MVC Folder Structure

---

## 📦 Tech Stack

- Node.js, Express.js
- Sequelize ORM + MySQL
- JWT Authentication
- Stripe Payments & Webhooks
- Multer (for profile picture uploads)
- Dotenv, UUID

---

## 📁 Project Structure

├── config/ # Sequelize DB config
├── controllers/ # Business logic
├── middleware/ # JWT, auth middleware
├── model/ # Sequelize models
├── routes/ # Route declarations
├── uploads/ # Multer file storage
├── .env
├── index.js # App entry point
├── package.json

---

## 🔐 Environment Variables (`.env`)

```env
PORT=8000
DB_NAME=your_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
🛠 Setup & Run
Install dependencies

bash
Copy
Edit
npm install
Create .env file (copy from above)

Set up your MySQL database

Run migrations/sync DB

js
Copy
Edit
// Sync inside index.js (optional):
sequelize.sync({ alter: true });
Start the server

bash
Copy
Edit
npm start
💳 Stripe Integration
Flow:
User places an order → backend creates Stripe PaymentIntent


Stripe calls your /webhook endpoint (via Stripe CLI)

On payment_intent.succeeded, order is marked as paid

Local Webhook Testing:
Install Stripe CLI:

bash
Copy
Edit
npm install -g stripe
Start listening for events:

bash
Copy
Edit
stripe listen --forward-to localhost:8000/webhook
Get STRIPE_WEBHOOK_SECRET from the CLI output and place it in .env.

📬 API Endpoints
🛍 Products
POST /api/product (admin)

GET /api/product

PATCH /api/product/:id (admin)

DELETE /api/product/:id (admin)

🛒 Cart
POST /api/cart/add

GET /api/cart

PATCH /api/cart/remove

🧾 Orders
POST /api/order

GET /api/order/:id

GET /api/orders

🏠 Address
POST /api/address

PATCH /api/address/:id

GET /api/address

DELETE /api/address/:id

🔐 Auth
POST /api/register

POST /api/login

✅ Postman Collection
A Postman collection is available with all request samples for testing each API.
