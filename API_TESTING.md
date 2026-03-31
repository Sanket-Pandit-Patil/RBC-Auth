# API Testing Guide 🚀

This document explains how to test all APIs using Postman.

---

## 🔧 Base URL

```
http://localhost:5000
```

---

## 🧪 Testing Flow (IMPORTANT ORDER)

Follow this order to avoid errors:

1. Provider Signup
2. Admin Login
3. Create Service
4. Create Zone
5. Provider Login
6. Select Services & Zones
7. Create Handyman
8. Handyman Login
9. Get Profile

---

## 1️⃣ Provider Signup

**POST** `/api/auth/signup/provider`

Body:

```json
{
  "name": "Provider One",
  "email": "provider@gmail.com",
  "password": "123456"
}
```

---

## 2️⃣ Admin Login

**POST** `/api/auth/login`

Body:

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

📌 Save the token → `ADMIN_TOKEN`

---

## 3️⃣ Create Service

**POST** `/api/admin/services`

Headers:

```
Authorization: Bearer ADMIN_TOKEN
```

Body:

```json
{
  "name": "Plumbing"
}
```

📌 Note the returned `service id`

---

## 4️⃣ Create Zone

**POST** `/api/admin/zones`

Headers:

```
Authorization: Bearer ADMIN_TOKEN
```

Body:

```json
{
  "name": "Delhi"
}
```

📌 Note the returned `zone id`

---

## 5️⃣ Provider Login

**POST** `/api/auth/login`

Body:

```json
{
  "email": "provider@gmail.com",
  "password": "123456"
}
```

📌 Save token → `PROVIDER_TOKEN`

---

## 6️⃣ Select Services & Zones

**PUT** `/api/provider/select-services-zones`

Headers:

```
Authorization: Bearer PROVIDER_TOKEN
```

Body:

```json
{
  "serviceIds": [1],
  "zoneIds": [1]
}
```

📌 Use actual IDs returned from previous APIs

---

## 7️⃣ Create Handyman

**POST** `/api/provider/create-handyman`

Headers:

```
Authorization: Bearer PROVIDER_TOKEN
```

Body:

```json
{
  "name": "Handyman One",
  "email": "handyman@gmail.com",
  "password": "123456"
}
```

---

## 8️⃣ Handyman Login

**POST** `/api/auth/login`

Body:

```json
{
  "email": "handyman@gmail.com",
  "password": "123456"
}
```

📌 Save token → `HANDYMAN_TOKEN`

---

## 9️⃣ Get Profile

**GET** `/api/provider/profile`

Headers:

```
Authorization: Bearer TOKEN
```

Use:

* Provider token OR
* Handyman token

---

## ⚠️ Common Errors

### ❌ 404 Route not found

* Wrong HTTP method (use PUT instead of POST)

### ❌ Invalid IDs

* Use correct `serviceId` and `zoneId`

### ❌ Unauthorized

* Missing or wrong token

---

## ✅ Tips

* Always select **Body → raw → JSON**
* Always use **Bearer Token** for protected routes
* Follow the testing order

---

## 🧑‍💻 Author
Sanket
