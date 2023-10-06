import { Character } from "./characterTypes";

type Sender = "user" | "character";

export interface ChatMessage {
  id?: string;
  content: string;
  sender: Sender;
  created_at?: string;
}

export interface Chat {
  id: string;
  messages: ChatMessage[];
  character_info: Character;
}
