import {
  Center,
  HStack,
  ScrollView,
  VStack,
  TextArea,
  Input,
  Box,
} from "native-base";
import React from "react";
import ConversationList from "./ConversationList";
import { MaterialIcons } from "@expo/vector-icons";

const ChatLayout = () => {
  return (
    <VStack space="4" h={"100%"}>
      <ScrollView h={300}>
        <VStack space="3" alignItems="center">
          <ConversationList />
        </VStack>
      </ScrollView>

      <HStack space="3" alignItems="center" mb={12}>
        <Box
          flex={1}
          borderWidth={2}
          borderColor={"gray.400"}
          rounded={"lg"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          py={1}
        >
          <Input
            variant={"unstyled"}
            placeholder="Default Input"
            size={"xl"}
            multiline
            w={"90%"}
            color={"white"}
          />
        </Box>

        <MaterialIcons name="send" size={30} color="white" />
      </HStack>
    </VStack>
  );
};

export default ChatLayout;
