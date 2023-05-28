import React from "react";
import ConversationItem from "./ConversationItem";
import { Box, FlatList, VStack } from "native-base";
import { View } from "react-native";
import { ConversationItemType } from "./ChatLayout";

interface Props {
  conversationItems: ConversationItemType[];
  scrollRef: React.RefObject<typeof FlatList>;
}

const ConversationList = (props: Props) => {
  return (
    // <VStack space={3} alignItems={"flex-start"}>
    props.conversationItems.length > 0 ? (
      <FlatList
        ref={props.scrollRef}
        data={props.conversationItems}
        renderItem={({ item, index }) => (
          <Box mb={2}>
            <ConversationItem key={index} conversationItem={item} />
          </Box>
        )}
      />
    ) : (
      <Box flex={1} />
    )

    // </VStack>
  );
};

export default ConversationList;
