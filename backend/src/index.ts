import express from "express";
import { Request, Response } from "express";
import fs from "fs/promises";

const app = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const data = await fs.readFile("./data/flashcards.json", "utf-8");

  const flashcards = JSON.parse(data);

  res.json(flashcards);
});

app.post("/flashcard", async (req: Request, res: Response) => {
  const { question, answer, category } = req.body;
  const data = await fs.readFile("./data/flashcards.json", "utf-8");
  const flashCard = JSON.parse(data);

  const newFlashcard = {
    id: Date.now().toString(),
    question,
    answer,
    category,
  };

  flashCard.push(newFlashcard);

  await fs.writeFile("./data/flashcards.json",JSON.stringify(flashCard,null,2));

  return res.status(201).json({
    message: "Flashcard Created Successfully",
    flashCard: newFlashcard
  })
});

app.get("/flashcard/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await fs.readFile("./data/flashcards.json", "utf-8");
  const flashcards = JSON.parse(data)
  console.log(flashcards)

  const singleFlashCard = flashcards.find((flashcard: any)=> id === flashcard.id)

  if (!singleFlashCard) {
    return res.status(404).json({
      message: "Flashcard not found"
    });
  }

  return res.json(singleFlashCard);
})

app.delete("/flashcard/:id", async (req, res) => {
  const id = req.params.id;

  const data = await fs.readFile(
    "./data/flashcards.json",
    "utf-8"
  );

  const flashcards = JSON.parse(data);

  const filteredFlashcards = flashcards.filter(
    (flashcard: any) => flashcard.id !== id
  );

  if (filteredFlashcards.length === flashcards.length) {
    return res.status(404).json({
      message: "Flashcard not found"
    });
  }

  await fs.writeFile(
    "./data/flashcards.json",
    JSON.stringify(filteredFlashcards, null, 2)
  );

  return res.json({
    message: "Flashcard deleted successfully"
  });
});

app.patch("/flashcard/:id", async (req, res) => {
  const id = req.params.id;
  const { question, answer, category } = req.body;

  const data = await fs.readFile("./data/flashcards.json","utf-8");
  const flashcards = JSON.parse(data);
  
  const findFlashcard = flashcards.find((flashcard: any) => flashcard.id === id);

  if (!findFlashcard) {
    return res.status(404).json({
      message: "Flashcard not found"
    });
  }

  findFlashcard.question = question;
  findFlashcard.answer = answer;
  findFlashcard.category = category

  await fs.writeFile("./data/flashcards.json",JSON.stringify(flashcards, null, 2));

  return res.json({
    message: "Flashcard updated successfully",
    flashcard: findFlashcard
  });

});


app.listen(3000, () => {
  console.log("Server Started");
});
