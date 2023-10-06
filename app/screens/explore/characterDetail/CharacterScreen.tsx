import React from "react";
import { VStack, Box, Pressable, Text, ScrollView } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { Character } from "@~types/characterTypes";
import { Ionicons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native";
import { MainStackParamList } from "@root/App";

const CharacterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<MainStackParamList, "CharacterScreen">>();
  const params: { character: Character } = route.params;

  console.log(params.character);
  const handleStartChat = () => {
    navigation.navigate({
      name: "ChatScreen",
      params: { character: params.character },
    } as never);
  };
  return (
    <SafeAreaView>
      <Pressable
        onPress={() => navigation.goBack()}
        position={"absolute"}
        zIndex={1}
        top={16}
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
        <FastImage
          source={{
            uri: params.character.image,
          }}
          style={{ height: 450, width: "100%" }}
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
    </SafeAreaView>
  );
};

export default CharacterScreen;
