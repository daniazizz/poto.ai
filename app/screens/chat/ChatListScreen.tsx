import React from "react";
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

const ChatListScreen = () => {
  const navigation = useNavigation();
  return (
    <FlatList
      ListHeaderComponent={
        <Box py={2} pt={4}>
          <SearchBar />
        </Box>
      }
      h={"full"}
      keyExtractor={(item) => item.toString()}
      data={[1, 2, 3, 4, 5]}
      renderItem={({ item }) => (
        <Pressable
          key={item}
          onPress={() => navigation.navigate("ChatScreen" as never)}
          // w={"full"}
          rounded={"xl"}
          h={"100px"}
          justifyContent={"center"}
          borderBottomColor={"gray.700"}
          borderBottomWidth={1}
        >
          <HStack space={2} px={4}>
            <Avatar
              size={"lg"}
              source={{
                uri: "https://picsum.photos/300",
              }}
            >
              SS
            </Avatar>
            <VStack>
              <Text color="white" fontSize="lg">
                Item {item}
              </Text>

              <Text color="white" fontSize="xs" numberOfLines={1} maxW={"90%"}>
                Etiam vitae tortor. Sed aliquam ultrices mauris. Fusce pharetra
                convallis urna. Vestibulum dapibus nunc ac augue. Sed a libero.
              </Text>
            </VStack>
          </HStack>
        </Pressable>
      )}
    />
  );
};

export default ChatListScreen;
