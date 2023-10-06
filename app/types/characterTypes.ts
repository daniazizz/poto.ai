export interface Character {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  life_span: string;
  image?: string;
  questions: QuestionSuggestion[];
}

export interface QuestionSuggestion {
  question: string;
}

export interface Answer {
  answer: string;
  error: string;
  credits: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CategoryCharacters {
  category: Category;
  characters: Character[];
}
