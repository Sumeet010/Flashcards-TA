# Flashcard Study API

A persistent study flashcard management API built with TypeScript, Express, and Node.js file system storage.
The application allows users to create, view, update, delete, search, random revise and review flashcards.

---

# Tech Stack

* Node.js
* Express.js
* TypeScript
* File System (`fs/promises`)

---

# Project Structure

```txt
backend/
│
├── src/
│   ├── index.ts
│   └── types/
│       └── flashcard.ts
│
├── data/
│   └── flashcards.json
```

---

# How to Run

## 1. Navigate to backend folder

```bash
cd backend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start development server

```bash
npm run dev
```

Server runs on:

```txt
http://localhost:3000
```

---
# API Testing

A Postman collection file is included in the repository:

```txt
Study Flascard API.postman-collection.json
```

# API Endpoints

## Get All Flashcards

```http
GET /flashcards
```

---

## Get Flashcard By ID

```http
GET /flashcards/:id
```

---

## Create Flashcard

```http
POST /flashcards
```

Example Request Body:

```json
{
  "question": "What is Node.js?",
  "answer": "JavaScript runtime",
  "category": "Backend"
}
```

---

## Update Flashcard

```http
PATCH /flashcards/:id
```

Example Request Body:

```json
{
  "question": "Updated Question",
  "answer": "Updated Answer",
  "category": "Updated Category"
}
```

---

## Delete Flashcard

```http
DELETE /flashcards/:id
```

---

## Get Flashcards By Category

```http
GET /flashcards/category/:category
```

Example:

```http
GET /flashcards/category/backend
```

---

## Get Random Flashcard

```http
GET /flashcards/random
```

---

## Review Flashcard

```http
POST /flashcards/:id/review
```

---

# Persistence

Flashcards are stored in:

```txt
backend/data/flashcards.json
```

Data persists when server restarts.
