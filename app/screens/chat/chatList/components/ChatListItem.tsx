import React from "react";
import { Text, Pressable, VStack, HStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import CharacterAvatar from "@components/common/CharacterAvatar";
import { Chat } from "@~types/chatTypes";

const ChatListItem = React.memo(({ chat: item }: { chat: Chat }) => {
  const navigation = useNavigation();

  console.log("chatlistitem");

  return (
    <Pressable
      onPress={() =>
        navigation.navigate({
          name: "ChatScreen",
          params: { chat: item, character: item.character_info },
        } as never)
      }
      bgColor={"gray.800"}
      rounded={"xl"}
      h={"100px"}
      justifyContent={"center"}
      m={1}
      mx={3}
      px={4}
    >
      <HStack space={2}>
        <CharacterAvatar
          name={item.character_info.name}
          size={"lg"}
          image={item.character_info.image}
        />
        <VStack>
          <Text color="white" fontSize="md" fontWeight={"semibold"}>
            {item.character_info.name}
          </Text>

          <Text color="gray.300" fontSize="xs" numberOfLines={2} maxW={"90%"}>
            {item.messages.length > 0 &&
              item.messages[item.messages.length - 1].content}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
});

export default ChatListItem;
