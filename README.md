# Unfazzed Auth System 🚀

A role-based backend system built with Node.js, Express, PostgreSQL (Neon), Prisma, and JWT.

## 🔧 Tech Stack
- Node.js
- Express.js
- PostgreSQL (Neon)
- Prisma ORM
- JWT Authentication
- bcrypt (password hashing)

---

## ✨ Features

### 🔐 Authentication
- Provider Signup
- Multi-role Login (Admin, Provider, Handyman)
- JWT-based authentication

### 👤 Roles
- ADMIN → create services & zones
- PROVIDER → assign services/zones, create handymen
- HANDYMAN → linked under provider

### 🛡 Security
- Password hashing (bcrypt)
- JWT authentication
- Role-based access control
- Input validation middleware

### ⚙️ Advanced
- Prisma transactions for atomic updates
- Global error handling
- Clean project structure

---

## 📁 Project Structure
# Unfazzed Auth System 🚀

A role-based backend system built with Node.js, Express, PostgreSQL (Neon), Prisma, and JWT.

## 🔧 Tech Stack
- Node.js
- Express.js
- PostgreSQL (Neon)
- Prisma ORM
- JWT Authentication
- bcrypt (password hashing)

---

## ✨ Features

### 🔐 Authentication
- Provider Signup
- Multi-role Login (Admin, Provider, Handyman)
- JWT-based authentication

### 👤 Roles
- ADMIN → create services & zones
- PROVIDER → assign services/zones, create handymen
- HANDYMAN → linked under provider

### 🛡 Security
- Password hashing (bcrypt)
- JWT authentication
- Role-based access control
- Input validation middleware

### ⚙️ Advanced
- Prisma transactions for atomic updates
- Global error handling
- Clean project structure

---

## 📁 Project Structure
unfazzed-auth-system/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   └── providerController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validateMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   └── providerRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── validators.js
│   ├── app.js
│   └── server.js
├── prisma.config.ts
├── .env
├── .gitignore
└── package.json


---

## 🚀 Setup Instructions

### 1. Clone repo
git clone <your_repo_url>
cd unfazzed-auth-system


### 2. Install dependencies
npm i

### 3. Setup environment
Create `.env` file:
PORT=5000
JWT_SECRET=your_secret
DATABASE_URL=your_neon_url
DIRECT_URL=your_direct_url

### 4. Setup database
npx prisma generate
npx prisma db push

### 5. Seed admin
npm run seed

### 6. Run Server
npm run dev


---

## 📮 API Endpoints

### Auth
- POST `/api/auth/signup/provider`
- POST `/api/auth/login`

### Admin
- POST `/api/admin/services`
- POST `/api/admin/zones`

### Provider
- PUT `/api/provider/select-services-zones`
- POST `/api/provider/create-handyman`
- GET `/api/provider/profile`

---

## 🧪 Testing
Use Postman to test APIs.

---

## 👨‍💻 Author
Sanket