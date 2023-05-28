import {
  Box,
  Button,
  Center,
  Flex,
  PresenceTransition,
  Text,
  VStack,
} from "native-base";
import React from "react";
import AppBar from "../components/AppBar";
import ChatLayout from "../components/chat/ChatLayout";
import ExploreLayout from "../components/Explore/ExploreLayout";
import Example from "../components/Example";
import { Dimensions } from "react-native";
import { Character } from "../services/charactersService";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

// Assuming 'Chat' is the name of your screen and 'RootStackParamList' is the root stack param list type
type ChatScreenProp = NativeStackNavigationProp<RootStackParamList, "Chat">;

const MainScreen = () => {
  const navigation = useNavigation<ChatScreenProp>();
  const route = useRoute();

  const handleSelect = (char: Character) => {
    navigation.navigate("Chat", { character: char });
  };

  React.useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <VStack h={"100%"}>
      <Box position={"relative"} h={"100%"}>
        <ExploreLayout handleSelect={handleSelect} />
      </Box>
    </VStack>
  );
};

export default MainScreen;
