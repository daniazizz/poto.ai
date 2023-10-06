import { HStack, Pressable, Text } from "native-base";
import React from "react";

interface Props {
  question: string;
  onPress: (question: string) => void;
}

const SuggestionItem = (props: Props) => {
  return (
    <Pressable onPress={() => props.onPress(props.question)}>
      <HStack bgColor={"gray.800"} rounded={"xl"} p={3} m={1} mx={2}>
        <Text textAlign={"center"} color={"white"} fontSize={13} width={"full"}>
          {props.question}
        </Text>
      </HStack>
    </Pressable>
  );
};

export default SuggestionItem;
