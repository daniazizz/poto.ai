import api from "./apiService";

const endpoint = "/characters";

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

const getCharacters = () => {
  return api.instance.get<Character[]>(endpoint);
};

const getCharactersByCategory = () => {
  return api.instance.get<CategoryCharacters[]>(
    endpoint + "/get_characters_grouped_categories/"
  );
};

const askQuestion = (
  characterName: string,
  question: string,
  chatId: string
) => {
  // return api.instance.get<Answer>(
  //   endpoint + `/${characterId}/ask/?q=${question}`
  // );
  // return api.instance.post<Answer>(endpoint + `/${characterId}/ask/`, {
  //   question: question,
  //   chat_id: chatId,
  // });
  return api.instance.post<Answer>(
    "https://handleask.azurewebsites.net/api/HttpTrigger1",
    {
      question: question,
      character: characterName,
      chat_id: chatId,
    }
  );
};

export default {
  getCharacters,
  askQuestion,
  getCharactersByCategory,
};
