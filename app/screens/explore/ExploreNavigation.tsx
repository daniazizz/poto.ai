import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Character } from "../../services/charactersService";
import ExploreScreen from "./ExploreScreen";
import ExploreSearchScreen from "./ExploreSearchScreen";
import ChatScreen from "../chat/ChatScreen";
import { User } from "firebase/auth";
import CharacterScreen from "./CharacterScreen";

const Stack = createNativeStackNavigator();

export type ExploreStackParamList = {
  ExploreScreen: undefined;
  ExploreSearchScreen: { characters: Character[] };
  NewChatScreen: { character: Character };
  CharacterScreen: { character: Character };
  // Add more screens and their corresponding params as needed
};

const ExploreNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ExploreScreen"
        options={{ headerShown: false }}
        component={ExploreScreen}
      />

      <Stack.Screen
        name="ExploreSearchScreen"
        options={{ animation: "fade", headerShown: false }}
        component={ExploreSearchScreen}
      />
      <Stack.Screen name="NewChatScreen" component={ChatScreen} />
      <Stack.Screen name="CharacterScreen" component={CharacterScreen} />
    </Stack.Navigator>
  );
};

export default ExploreNavigation;
