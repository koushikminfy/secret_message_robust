
---

## 📁 Project Structure for Part 2

```
secret-message-robust/
├── src/
│   ├── controllers/
│   │   └── messageController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── logger.js
│   ├── routes/
│   │   └── messageRoutes.js
│   ├── utils/
│   │   └── inMemoryDb.js
│   └── index.js
├── package.json
```

---

## ✅ Step-by-Step Setup

### 1. Initialize Project


```markdown
# 🔐 Secret Message Service (Robust)
---


## 🚀 Getting Started

### 1. Install dependencies

```bash
bun install
````

### 2. Start the server

```bash
bun start
```

---

## 📡 API Endpoints

### ✅ `POST /` — Create a message
* `POST http://localhost:3000/api/v1/messages`
**Body:**

```json
{
  "message": "This is a valid message."
}
```

**Response:**
![1000](https://github.com/user-attachments/assets/9a933a87-c78d-44fd-ab2e-0bd8fbb02028)



### 📥 `GET /` — Get all messages
* `GET http://localhost:3000/api/v1/messages`
**Response:**
![1001](https://github.com/user-attachments/assets/f42ab409-be34-4729-8d14-ae4c6ac77d39)



### 🔍 `GET /:id` — Get message by ID
* `GET http://localhost:3000/api/v1/messages/:id`
**Response :**

![1003](https://github.com/user-attachments/assets/138a738a-5878-49db-862a-f13cf29ad077)



### ❌ `DELETE /:id` — Delete message by ID
* `DELETE http://localhost:3000/api/v1/messages/:id`
**Response:**

![1004](https://github.com/user-attachments/assets/5d67216a-9556-41f7-a898-e37321035542)









---
