import { HStack, Center, VStack, Skeleton, Box, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ConversationItemType } from "./ChatLayout";

interface Props {
  conversationItem: ConversationItemType;
}

const ConversationItem = (props: Props) => {
  return (
    <HStack
      space="2"
      alignItems="flex-end"
      display={"flex"}
      justifyContent={
        props.conversationItem.sender === "AI" ? "flex-start" : "flex-end"
      }
      width={"full"}
    >
      <Box
        p={2}
        px={3}
        maxW={"90%"}
        bgColor={
          props.conversationItem.sender === "USER" ? "blue.600" : "gray.600"
        }
        rounded={"xl"}
        flexDirection={"row"}
        borderBottomRightRadius={
          props.conversationItem.sender === "USER" ? 0 : "xl"
        }
        borderBottomLeftRadius={
          props.conversationItem.sender === "AI" ? 0 : "xl"
        }
      >
        {props.conversationItem.loading ? (
          <Skeleton.Text size={"xs"} />
        ) : (
          <Text fontSize="sm" color={"white"} selectable>
            {props.conversationItem.message}
          </Text>
        )}
      </Box>
    </HStack>
  );
};

export default ConversationItem;
