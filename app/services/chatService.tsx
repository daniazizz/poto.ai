import { Chat } from "@~types/chatTypes";
import api from "./apiService";

const endpoint = "/chats/";

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
