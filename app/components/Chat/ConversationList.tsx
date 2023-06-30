import React from "react";
import ConversationItem from "./ConversationItem";
import { Box, FlatList, VStack } from "native-base";
import { View } from "react-native";
import { ConversationItemType } from "./ChatLayout";
import { Character } from "../../services/charactersService";

interface Props {
  conversationItems: ConversationItemType[];
  scrollRef: React.RefObject<typeof FlatList>;
  character: Character;
}

const ConversationList = (props: Props) => {
  return props.conversationItems.length > 0 ? (
    <FlatList
      ref={props.scrollRef}
      data={props.conversationItems}
      initialNumToRender={4}
      windowSize={4}
      renderItem={({ item, index }) => (
        <Box mb={2}>
          <ConversationItem
            key={index}
            conversationItem={item}
            character={props.character}
          />
        </Box>
      )}
    />
  ) : (
    <Box flexGrow={1} />
  );

  // </VStack>
};

export default ConversationList;
