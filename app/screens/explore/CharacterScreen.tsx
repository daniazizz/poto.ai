import React, { useContext } from "react";
import { VStack, Image, Box, Pressable, Text, ScrollView } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { Character } from "../../services/charactersService";
import { Chat } from "../../services/chatService";
import { ChatStackParamList } from "../chat/ChatNavigation";
import { ExploreStackParamList } from "./ExploreNavigation";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { BottomBarContext } from "../../context/context";

const CharacterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ExploreStackParamList, "CharacterScreen">>();
  const params: { character: Character } = route.params;
  const { setBottomTabBarVisible } = useContext(BottomBarContext);

  React.useEffect(() => {
    setBottomTabBarVisible(false);
    return () => {
      setBottomTabBarVisible(true);
    };
  }, []);

  console.log(params.character);
  const handleStartChat = () => {
    navigation.navigate({
      name: "NewChatScreen",
      params: { character: params.character },
    } as never);
  };
  return (
    <Box>
      <Pressable
        onPress={() => navigation.goBack()}
        position={"absolute"}
        zIndex={1}
        top={4}
        left={4}
      >
        <Box
          rounded={"full"}
          p={2}
          bgColor={"gray.900"}
          // borderColor={"white"}
          // borderWidth={1}
        >
          <Ionicons name="chevron-back-outline" size={30} color="white" />
        </Box>
      </Pressable>
      <ScrollView>
        <Image
          source={{
            uri: params.character.image,
          }}
          alt="Alternate Text"
          // size="xs"
          width={"100%"}
          height={"450px"}
        />
        <VStack pb={"100px"}>
          <VStack
            alignItems={"center"}
            borderBottomColor={"gray.900"}
            borderBottomWidth={1}
            py={4}
          >
            <Text color={"white"} fontSize={"xl"} fontWeight={500}>
              {params.character.name}
            </Text>
            <Text color={"white"} fontSize={"md"} fontWeight={100}>
              {params.character.life_span}
            </Text>
          </VStack>
          <VStack py={4} px={4} alignItems={"center"}>
            <Text color={"white"} fontSize={"lg"} fontWeight={200}>
              {params.character.long_description}
            </Text>
          </VStack>
        </VStack>
      </ScrollView>
      <Pressable
        onPress={() => handleStartChat()}
        position={"absolute"}
        zIndex={1}
        bottom={10}
        width={"100%"}
        // justifyContent={"center"}
        alignItems={"center"}
        // px={}
      >
        <Box
          rounded={"full"}
          p={2}
          bgColor={"blue.600"}
          px={4}
          style={{
            elevation: 5,
          }}
          alignItems={"center"}
        >
          <Text fontSize={"xl"} color={"white"}>
            New Chat
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default CharacterScreen;
