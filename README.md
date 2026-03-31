# 🚀 Unfazzed Auth System

A scalable **role-based backend system** built using **Node.js, Express, PostgreSQL (Neon), Prisma ORM, and JWT**, designed to manage Admin, Provider, and Handyman workflows with secure authentication and access control.

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (Neon)  
- **ORM:** Prisma  
- **Authentication:** JWT (JSON Web Tokens)  
- **Security:** bcrypt (password hashing)  

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Provider Signup & Multi-role Login  
- Secure JWT-based authentication  
- Role-based access control (RBAC)  

### 👥 Role Management
- **Admin**
  - Create and manage Services & Zones  
- **Provider**
  - Select services and zones  
  - Create and manage Handymen  
- **Handyman**
  - Linked under a Provider  

### 🛡 Security & Validation
- Password hashing using bcrypt  
- Protected routes with middleware  
- Input validation for all APIs  
- Centralized error handling  

### ⚙️ System Design Highlights
- Prisma ORM for efficient DB operations  
- Transaction support for atomic updates  
- Clean and modular architecture  

---

## 📁 Project Structure

```
unfazzed-auth-system/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
│
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
│
├── API_TESTING.md
├── prisma.config.ts
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone <your_repo_url>
cd unfazzed-auth-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_secret_key
DATABASE_URL=your_neon_pooled_url
DIRECT_URL=your_neon_direct_url
```

---

### 4. Setup Database
```bash
npx prisma generate
npx prisma db push
```

---

### 5. Seed Admin User
```bash
npm run seed
```

---

### 6. Run Server
```bash
npm run dev
```

---

## 📮 API Endpoints

### 🔐 Authentication
- POST `/api/auth/signup/provider`
- POST `/api/auth/login`

### 🛠 Admin
- POST `/api/admin/services`
- POST `/api/admin/zones`

### 👤 Provider
- PUT `/api/provider/select-services-zones`
- POST `/api/provider/create-handyman`
- GET `/api/provider/profile`

---

## 🧪 API Testing

Use Postman or any API client.

📄 Detailed guide available in:  
👉 `API_TESTING.md`

---

## 🎯 Highlights

- Clean and scalable backend architecture  
- Real-world RBAC implementation  
- Production-ready authentication system  
- Optimized for quick development and deployment  

---

## 👨‍💻 Author

**Sanket Patil**

---

## ⭐ If you found this useful
Give it a ⭐ on GitHub!
