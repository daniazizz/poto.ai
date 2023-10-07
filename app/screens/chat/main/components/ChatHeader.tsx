import { HStack, Text, VStack, ChevronLeftIcon, Pressable } from "native-base";
import React from "react";
import { Character } from "@~types/characterTypes";
import CharacterAvatar from "@components/common/CharacterAvatar";
import constants from "@constants/constants";

interface Props {
  handleReturn: () => void;
  selectedCharacter: Character;
}

const ChatHeader = (props: Props) => {
  return (
    <HStack
      alignItems={"center"}
      justifyContent={"space-between"}
      p={4}
      bgColor={constants.PRIMARY_COLOR}
    >
      <HStack alignItems="center" space={3} flex={1}>
        <Pressable p={2} onPress={props.handleReturn}>
          <ChevronLeftIcon size={6} color="white" />
        </Pressable>
        {/* <Avatar
          size={"md"}
          source={{
            uri: props.selectedCharacter.image,
          }}
        >
          {props.selectedCharacter.name[0]}
        </Avatar> */}
        <CharacterAvatar
          image={props.selectedCharacter.image}
          name={props.selectedCharacter.name}
        />
        <VStack>
          <Text fontSize="md" color={"white"} fontWeight={600}>
            {props.selectedCharacter.name}
          </Text>
          <Text
            fontSize="xs"
            color={"white"}
            fontWeight={200}
            fontStyle={"italic"}
          >
            {props.selectedCharacter.life_span}
          </Text>
        </VStack>
      </HStack>
      {/* <HStack space="3" alignItems="center">
        <Center bg="primary.400" size="4"></Center>
        <Center bg="secondary.400" size="4"></Center>
      </HStack> */}
    </HStack>
  );
};

export default ChatHeader;
