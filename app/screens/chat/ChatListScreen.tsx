import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Pressable,
  VStack,
  Avatar,
  FlatList,
  HStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../components/Explore/SearchBar";
import { User } from "firebase/auth";
import chatService, { Chat } from "../../services/chatService";
import { RefreshControl } from "react-native";
import { ChatContext } from "../../context/context";

const ChatListScreen = () => {
  const navigation = useNavigation();
  // const [chats, setChats] = useState<Chat[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { chats } = useContext(ChatContext);
  const [search, setSearch] = useState("");
  // const [filteredChats, setFilteredChats] = useState<Chat[]>(chats);

  // useEffect(() => {
  //   setFilteredChats(
  //     chats.filter((chat) =>
  //       chat.character_info.name.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );
  // }, [search]);

  return (
    <FlatList
      // ListHeaderComponent={
      //   <Box py={2} pt={4}>
      //     <SearchBar value={search} onChangeText={setSearch} />
      //   </Box>
      // }
      mt={6}
      h={"full"}
      keyExtractor={(item) => item.id.toString()}
      data={chats}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() =>
            navigation.navigate({
              name: "ChatScreen",
              params: { chat: item, character: item.character_info },
            } as never)
          }
          bgColor={"gray.800"}
          // w={"full"}
          rounded={"xl"}
          h={"100px"}
          justifyContent={"center"}
          m={1}
          mx={3}
          px={4}
          // borderBottomColor={"gray.700"}
          // borderBottomWidth={1}
          // borderColor={"gray.900"}
          // borderTopWidth={index === 0 ? 1 : 0}
        >
          <HStack space={2}>
            <Avatar
              size={"lg"}
              source={{
                uri: item.character_info.image,
              }}
            >
              {item.character_info.name[0]}
            </Avatar>
            <VStack>
              <Text color="white" fontSize="md" fontWeight={"semibold"}>
                {item.character_info.name}
              </Text>

              <Text color="white" fontSize="xs" numberOfLines={2} maxW={90}>
                {item.messages.length > 0 &&
                  item.messages[item.messages.length - 1].content}
              </Text>
            </VStack>
          </HStack>
        </Pressable>
      )}
    />
  );
};

export default ChatListScreen;
