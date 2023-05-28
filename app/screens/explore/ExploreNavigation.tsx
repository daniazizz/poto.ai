import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Character } from "../../services/charactersService";
import NewChatScreen from "./NewChatScreen";
import ExploreScreen from "./ExploreScreen";
import ExploreSearchScreen from "./ExploreSearchScreen";
import { Box } from "native-base";
import SearchBar from "../../components/Explore/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";

const Stack = createNativeStackNavigator();

export type ExploreStackParamList = {
  ExploreScreen: undefined;
  ExploreSearchScreen: { characters: Character[] };
  NewChatScreen: { character: Character };
  // Add more screens and their corresponding params as needed
};

const ExploreNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExploreSearchScreen"
        component={ExploreSearchScreen}
        options={{ animation: "fade", headerShown: false }}
      />
      <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
    </Stack.Navigator>
  );
};

export default ExploreNavigation;
