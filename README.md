Awesome — let’s move on to **Part 2**: the **Robust & Structured API** version of your Secret Message service using Express, Zod, and UUID.

We’ll:

* Show the **file/folder structure**
* Write all the necessary **code files**
* Create a clean and professional **README.md**
* Give clear steps to **run and test** the project

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

```bash
mkdir secret-message-robust
cd secret-message-robust
bun init -y
bun add express zod uuid
```

In your `package.json`, add:

```json
"type": "module"
```

---

## 📄 Code Files

---

### `src/utils/inMemoryDb.js`

```js
export const messages = new Map();
```

---

### `src/middleware/logger.js`

```js
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

export default logger;
```

---

### `src/middleware/errorHandler.js`

```js
import { ZodError } from 'zod';

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errors: err.errors.map(e => ({
        path: e.path,
        message: e.message
      }))
    });
  }

  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred on the server.'
  });
};

export default errorHandler;
```

---

### `src/controllers/messageController.js`

```js
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { messages } from '../utils/inMemoryDb.js';

const messageSchema = z.object({
  message: z.string().min(10, { message: "Message must be at least 10 characters long." })
});

export const createMessage = (req, res, next) => {
  try {
    const { message } = messageSchema.parse(req.body);
    const id = uuidv4();
    const newMessage = { id, message, createdAt: new Date() };
    messages.set(id, newMessage);
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    next(error);
  }
};

export const getAllMessages = (req, res) => {
  res.status(200).json({
    success: true,
    count: messages.size,
    data: Array.from(messages.values())
  });
};

export const getMessageById = (req, res) => {
  const { id } = req.params;
  if (!messages.has(id)) {
    return res.status(404).json({ success: false, message: "Message not found" });
  }

  res.status(200).json({ success: true, data: messages.get(id) });
};

export const deleteMessage = (req, res) => {
  const { id } = req.params;
  if (!messages.has(id)) {
    return res.status(404).json({ success: false, message: "Message not found" });
  }

  messages.delete(id);
  res.status(200).json({ success: true, message: "Message deleted successfully" });
};
```

---

### `src/routes/messageRoutes.js`

```js
import { Router } from 'express';
import {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage
} from '../controllers/messageController.js';

const router = Router();

router.route('/')
  .post(createMessage)
  .get(getAllMessages);

router.route('/:id')
  .get(getMessageById)
  .delete(deleteMessage);

export default router;
```

---

### `src/index.js`

```js
import express from 'express';
import messageRoutes from './routes/messageRoutes.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use('/api/v1/messages', messageRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Robust server running at http://localhost:${PORT}`);
});
```

---

## 📄 README.md

Here’s a clean README to go with Part 2:

```markdown
# 🔐 Secret Message Service (Robust)

A well-structured Express.js API for posting, retrieving, and deleting ephemeral secret messages. Data is stored in-memory and disappears on server restart.

---

## 📁 Project Structure

```

src/
├── controllers/
├── middleware/
├── routes/
├── utils/
└── index.js

````

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

All routes are prefixed with `/api/v1/messages`.

### ✅ `POST /` — Create a message

**Body:**

```json
{
  "message": "This is a valid message."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "<uuid>",
    "message": "...",
    "createdAt": "..."
  }
}
```

---

### 📥 `GET /` — Get all messages

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [ ... ]
}
```

---

### 🔍 `GET /:id` — Get message by ID

**Response (200):**

```json
{
  "success": true,
  "data": { ... }
}
```

**Response (404):**

```json
{
  "success": false,
  "message": "Message not found"
}
```

---

### ❌ `DELETE /:id` — Delete message by ID

**Response:**

```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

---

## 🧠 What You Learn

* Express project structure
* Controllers and routes separation
* Custom middleware (logging + error handling)
* Zod validation
* UUID-based IDs
* Why in-memory data disappears on restart

---

## 📝 License

MIT © 2025 — *your name*

````

---

## ✅ Final Step

To run:

```bash
bun start
````

Then test:

* `POST http://localhost:3000/api/v1/messages`
* `GET http://localhost:3000/api/v1/messages`
* `GET http://localhost:3000/api/v1/messages/:id`
* `DELETE http://localhost:3000/api/v1/messages/:id`

---
