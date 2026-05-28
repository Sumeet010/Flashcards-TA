export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  reviewCount: number;
  lastReviewed: string | null;
}