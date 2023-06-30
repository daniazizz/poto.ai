import { HStack, Center, VStack, Skeleton, Box, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ConversationItemType } from "./ChatLayout";
import { Character } from "../../services/charactersService";
import CharacterAvatar from "../common/CharacterAvatar";

interface Props {
  conversationItem: ConversationItemType;
  character: Character;
}

const ConversationItem = (props: Props) => {
  return (
    <HStack
      space="2"
      alignItems="flex-end"
      display={"flex"}
      justifyContent={
        props.conversationItem.sender === "character"
          ? "flex-start"
          : "flex-end"
      }
      width={"100%"}
    >
      {props.conversationItem.sender === "character" && (
        <Center>
          <CharacterAvatar
            size={8}
            mr={2}
            mb={2}
            image={props.character.image}
            name={props.character.name}
          />
        </Center>
      )}
      <Box
        p={2}
        px={3}
        maxW={"85%"}
        bgColor={
          props.conversationItem.sender === "user" ? "blue.600" : "gray.600"
        }
        rounded={"xl"}
        flexDirection={"row"}
        borderBottomRightRadius={
          props.conversationItem.sender === "user" ? 0 : "xl"
        }
        borderBottomLeftRadius={
          props.conversationItem.sender === "character" ? 0 : "xl"
        }
      >
        {props.conversationItem.loading ? (
          <Skeleton.Text size={"xs"} />
        ) : (
          <Text fontSize={15} color={"white"} selectable>
            {props.conversationItem.content}
          </Text>
        )}
      </Box>
    </HStack>
  );
};

export default ConversationItem;
