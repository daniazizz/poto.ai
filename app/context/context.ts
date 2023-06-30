import { createContext } from "react";
import { Chat, ChatMessage } from "../services/chatService";
import { AppUser } from "../services/userService";

interface ChatContextProps {
  chats: Chat[];
  newChat: (characterId: string) => Promise<Chat> | undefined;
  addMessage: (chatId: string, message: ChatMessage) => void;
}

export const ChatContext = createContext<ChatContextProps>({
  chats: [],
  newChat: () => undefined,
  addMessage: () => undefined,
});

interface UserDataContextProps {
  appUser: AppUser | undefined;
  credits: number;
  setCredits: (credits: number) => void;
  subscription: boolean;
  maxChats: number;
}

export const UserDataContext = createContext<UserDataContextProps>({
  appUser: undefined,
  credits: 0,
  setCredits: () => undefined,
  subscription: false,
  maxChats: 5,
});

interface SplashScreenContext {
  setAppIsReady: (isReady: boolean) => void;
}

export const SplashScreenContext = createContext<SplashScreenContext>({
  setAppIsReady: () => {},
});

interface BottomBarContextProps {
  bottomTabBarVisible: boolean;
  setBottomTabBarVisible: (visible: boolean) => void;
}

export const BottomBarContext = createContext<BottomBarContextProps>({
  bottomTabBarVisible: true,
  setBottomTabBarVisible: () => {},
});
