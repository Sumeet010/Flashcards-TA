# ANSWERS.md

## 1. How to run

### Clone the repository

```bash id="x9a1wz"
git clone <repository-url>
```

### Navigate to backend folder

```bash id="t7m4qp"
cd backend
```

### Install dependencies

```bash id="y2v8rk"
npm install
```

### Start development server

```bash id="c5k1ln"
npm run dev
```

The server runs on:

```txt id="w8r3mf"
http://localhost:3000
```

The application stores persistent data inside:

```txt id="d4p7zx"
backend/data/flashcards.json
```

---

## 2. Stack choice

I chose Node.js, Express, and TypeScript because I am more comfortable building backend APIs using this stack, this allowed me to focus on application requirements like persistence, validation and newer feature implementation.

I used JSON file-system for persistence instead of any other DB options:

* the access patterns are simpler and do not require heavy read or write operations, therefore file-based database will be a good choise for this application.
* it requires no external setup
* it works immediately on a fresh machine


I also chose TypeScript because it improves code readability and type safety, especially while working with flashcard Interface.

A worse choice for this application would have been introducing a more complex infrastructure setup such as hosted databases or a full frontend application without enough time to polish them properly.That would increase setup complexity.

---

## 3. One real edge case

The application validates all required fields while creating flashcards.

Example:

```ts id="j9q2wm"
if (!question || !answer || !category)
```

Location:

```txt id="h7m5vc"
backend/src/index.ts line 28, 149
```

This prevents invalid or empty flashcards from being stored.

Without this validation:

* incomplete flashcards could be saved
* API data consistency will break

Another edge case handled is route ordering. Specific routes such as:

```txt id="v3n8pk"
/flashcards/random
```

are placed before dynamic routes like:

```txt id="n6w1rd"
/flashcards/:id
```

to prevent incorrect route matching.

---

## 4. AI usage

I used ChatGPT during development for:


* debugging route-ordering issues in Express
* Minor bug fixes

One example where I modified AI-generated output was the flashcard review feature. Initially, the implementation only updated a review counter. I extended it to also track the `lastReviewed` timestamp because it made the feature more realistic for a study application.

I also modified generated code to better match my own coding style and understanding.

---

## 5. Honest gap

there are multiple things that are not good enough in this application is the lack of a frontend interface. The application currently have a backend API only, which means users need Postman to interact with it

didn't used `Rate limiting` , which would have helped tackling API abuse

I did not add extensive `try-catch` blocks because the project uses a simple file-based system with a straightforward flow. For a larger application, I would have add proper error handling

Fixes: I would build a small frontend study interface where users could:

* create and review flashcards visually
* study cards in random mode
* filter by category
* track review history more easily

I would also refactor the project into separate route, controller, and service layers to improve structure as the application grows.
