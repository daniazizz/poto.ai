import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "./ChatListScreen";
import ChatScreen from "./ChatScreen";
import { Character } from "../../services/charactersService";
import { User } from "firebase/auth";
import { Chat } from "../../services/chatService";

const Stack = createStackNavigator();

export type ChatStackParamList = {
  ChatListScreen: undefined;
  ChatScreen: { character: Character; chat?: Chat };
  // Add more screens and their corresponding params as needed
};

const ChatNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />

      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
