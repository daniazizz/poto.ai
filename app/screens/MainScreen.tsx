import { Box, Center, Flex, Text, VStack } from "native-base";
import React from "react";
import AppBar from "../components/AppBar";
import ChatLayout from "../components/Chat/ChatLayout";
import ExploreLayout from "../components/Explore/ExploreLayout";
import Example from "../components/Example";

const MainScreen = () => {
  const [character, setCharacter] = React.useState(true);

  return (
    <VStack h={"100%"} flex={1} justifyContent={"center"}>
      <AppBar />
      {character ? <ChatLayout /> : <ExploreLayout />}
    </VStack>
  );
};

export default MainScreen;
