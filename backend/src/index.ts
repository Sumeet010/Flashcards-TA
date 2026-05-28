import express from "express";
import { Request, Response } from "express";
import fs from "fs/promises";

import { Flashcard } from "./types/flashcard";

const app = express();
app.use(express.json());

app.get("/flashcards", async (req: Request, res: Response) => {
  const data = await fs.readFile("./data/flashcards.json", "utf-8");

  const flashcards: Flashcard[] = JSON.parse(data);

  if (flashcards.length === 0) {
    return res.status(404).json({
      message: "No flashcards available.",
    });
  }
  res.json(flashcards);
});

app.post("/flashcards", async (req: Request, res: Response) => {
  const { question, answer, category } = req.body;
  const data = await fs.readFile("./data/flashcards.json", "utf-8");
  const flashcards: Flashcard[] = JSON.parse(data);

  if (!question || !answer || !category) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const newFlashcard = {
    id: Date.now().toString(),
    question,
    answer,
    category,
    reviewCount: 0,
    lastReviewed: null,
  };

  flashcards.push(newFlashcard);

  await fs.writeFile(
    "./data/flashcards.json",
    JSON.stringify(flashcards, null, 2),
  );

  return res.status(201).json({
    message: "Flashcard Created Successfully",
    flashcards: newFlashcard,
  });
});

app.delete("/flashcards/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await fs.readFile("./data/flashcards.json", "utf-8");

  const flashcards: Flashcard[] = JSON.parse(data);

  const filteredFlashcards = flashcards.filter(
    (flashcard: Flashcard) => flashcard.id !== id,
  );

  if (filteredFlashcards.length === flashcards.length) {
    return res.status(404).json({
      message: "Flashcard not found",
    });
  }

  await fs.writeFile(
    "./data/flashcards.json",
    JSON.stringify(filteredFlashcards, null, 2),
  );

  return res.json({
    message: "Flashcard deleted successfully",
  });
});

app.get("/flashcards/random", async (req: Request, res: Response) => {
  const data = await fs.readFile("./data/flashcards.json","utf-8");

  const flashcards: Flashcard[] = JSON.parse(data);

  if (flashcards.length === 0) {
    return res.status(404).json({
      message: "No flashcards available"
    });
  }

  const randomIndex = Math.floor(
    Math.random() * flashcards.length
  );

  return res.json(flashcards[randomIndex]);
});

app.get("/flashcards/category/:category", async (req: Request, res: Response) => {
    const category = req.params.category;

    const data = await fs.readFile("./data/flashcards.json", "utf-8");

    const flashcards: Flashcard[] = JSON.parse(data);

    const categoryWiseFlashcards = flashcards.filter(
      (flashcard: Flashcard) => flashcard.category === category,
    );

    if (categoryWiseFlashcards.length === 0) {
      return res.status(404).json({
        message: "Flashcards Not Found",
      });
    }
    res.json(categoryWiseFlashcards);
  },
);

app.get("/flashcards/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await fs.readFile("./data/flashcards.json", "utf-8");
  const flashcards: Flashcard[] = JSON.parse(data);
  // console.log(flashcards)

  const singleFlashCard = flashcards.find(
    (flashcard: Flashcard) => id === flashcard.id,
  );

  if (!singleFlashCard) {
    return res.status(404).json({
      message: "Flashcard not found",
    });
  }

  return res.json(singleFlashCard);
});


app.patch("/flashcards/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { question, answer, category } = req.body;

  const data = await fs.readFile("./data/flashcards.json", "utf-8");
  const flashcards: Flashcard[] = JSON.parse(data);

  if (!question || !answer || !category) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const findFlashcard = flashcards.find((flashcard: Flashcard) => flashcard.id === id);

  if (!findFlashcard) {
    return res.status(404).json({
      message: "Flashcard not found",
    });
  }

  findFlashcard.question = question;
  findFlashcard.answer = answer;
  findFlashcard.category = category;

  await fs.writeFile("./data/flashcards.json",JSON.stringify(flashcards, null, 2),);

  return res.json({
    message: "Flashcard updated successfully",
    flashcard: findFlashcard,
  });
});




app.post("/flashcards/:id/review", async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await fs.readFile("./data/flashcards.json", "utf-8");

  const flashcards: Flashcard[] = JSON.parse(data);

  const flashcard = flashcards.find((flashcard: Flashcard) => flashcard.id === id);

  if (!flashcard) {
    return res.status(404).json({
      message: "Flashcard not found",
    });
  }

  flashcard.reviewCount += 1;

  flashcard.lastReviewed = new Date().toISOString();

  await fs.writeFile(
    "./data/flashcards.json",
    JSON.stringify(flashcards, null, 2),
  );

  return res.json({
    message: "Flashcard reviewed successfully",
    flashcard,
  });
});

app.listen(3000, () => {
  console.log("Server Started");
});
