import api from "./apiService";

const endpoint = "/characters";

export interface Character {
  id: string;
  name: string;
  short_description: string;
  life_span: string;
  image?: string;
}

export interface Answer {
  answer: string;
  error: string;
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

const getCharacters = () => {
  return api.get<Character[]>(endpoint);
};

const getCharactersByCategory = () => {
  return api.get<CategoryCharacters[]>(
    endpoint + "/get_characters_grouped_categories/"
  );
};

const askQuestion = (characterId: String, question: string) => {
  return api.get<Answer>(endpoint + `/${characterId}/ask/?q=${question}`);
};

export default {
  getCharacters,
  askQuestion,
  getCharactersByCategory,
};
