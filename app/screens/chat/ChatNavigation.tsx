import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "./ChatListScreen";
import SavedChatScreen from "./SavedChatScreen";
import { Character } from "../../services/charactersService";

const Stack = createStackNavigator();

export type ChatStackParamList = {
  ChatListScreen: undefined;
  ChatScreen: { character: Character };
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
      <Stack.Screen name="ChatScreen" component={SavedChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
