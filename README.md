# E-Commerce Store with Payment Integration

A full-stack e-commerce application built with React.js frontend and Node.js backend, featuring product catalog, shopping cart functionality, and **Stripe payment integration** for secure online transactions.


## 🛠️ Tech Stack

### Frontend

- **React.js** - UI Library
- **JavaScript (ES6+)** - Programming Language
- **CSS3** - Styling


### Backend

- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Stripe** - Payment Processing
- **JavaScript** - Programming Language

##  Project Structure

```
d:\Task\
├── frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ProductList.jsx
│   │   │   └── CartIcon.jsx
│   │   ├── pages/           # Page components
│   │   │   └── Home.jsx
│   │   └── ...
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                 # Node.js backend application
│   ├── controllers/         # Business logic controllers
│   │   └── PaymentController.js  # Stripe payment handling
│   ├── server.js           # Main server file
│   ├── .gitignore          # Git ignore rules
│   ├── .env               # Environment variables (Stripe keys, MongoDB URI)
│   └── package.json       # Backend dependencies
│
└── README.md              # Project documentation
```

##  Features

-  Product catalog display
-  Shopping cart functionality
-  **Stripe payment integration** - Secure checkout process
-  **Payment webhooks** - Real-time payment status updates
-  **Order tracking** - Check payment and order status
-  Responsive design
-  Modern and attractive UI
-  Fast and optimized performance

##  How to Run the Project

### Prerequisites

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Task
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file in backend directory:

   ```env
   MONGOURI=your_mongodb_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Start Backend Server**

   ```bash
   npm start
   # Server runs on http://localhost:4000
   ```

5. **Setup Frontend** (Open new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   # Frontend runs on http://localhost:3000
   ```

##  Payment Integration

This application uses **Stripe** for secure payment processing:

- **Payment Sessions**: Create secure checkout sessions
- **Webhooks**: Real-time payment event handling
- **Order Status**: Track payment and order completion
- **Security**: PCI-compliant payment processing

### Payment Endpoints

- `POST /create-payment-session` - Create Stripe checkout session
- `GET /order-status/:sessionId` - Get order status
- `GET /check-payment/:sessionId` - Check payment status
- `POST /webhook` - Stripe webhook handler

## 🔧 Development

### Frontend Development

```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
```

### Backend Development

```bash
cd backend
npm run dev          # Start development server with nodemon
npm start            # Start production server
```
