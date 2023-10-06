import { Character, CategoryCharacters, Answer } from "@~types/characterTypes";
import api from "./apiService";

const endpoint = "/characters";

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
