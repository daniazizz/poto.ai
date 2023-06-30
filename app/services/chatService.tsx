import api from "./apiService";
import { Character } from "./charactersService";

const endpoint = "/chats/";

type Sender = "user" | "character";

export interface ChatMessage {
  id?: string;
  content: string;
  sender: Sender;
}

export interface Chat {
  id: string;
  messages: ChatMessage[];
  character_info: Character;
}

const getChats = () => {
  return api.instance.get<Chat[]>(endpoint);
};

const getChat = (chatId: string) => {
  return api.instance.get<Chat>(endpoint + `${chatId}`);
};

const newChat = (characterId: string) => {
  // console.log(userId, characterId);
  return api.instance.post<Chat>(endpoint, {
    character: characterId,
  });
};

export default {
  getChats,
  getChat,
  newChat,
};
