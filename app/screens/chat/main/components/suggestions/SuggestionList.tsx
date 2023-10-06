import { FlatList, VStack, Text } from "native-base";
import React from "react";
import SuggestionItem from "./SuggestionItem";

interface Props {
  questions: string[];
  onPress: (question: string) => void;
}

const SuggestionHeader = () => {
  return (
    <VStack>
      <Text
        color={"white"}
        fontSize={"lg"}
        fontWeight={"semibold"}
        textAlign={"center"}
      >
        Suggestions 💡
      </Text>
    </VStack>
  );
};

const SuggestionList = (props: Props) => {
  return (
    <FlatList
      ListHeaderComponent={SuggestionHeader}
      data={props.questions}
      renderItem={({ item }) => (
        <SuggestionItem question={item} onPress={props.onPress} />
      )}
    />
    // <VStack space={2}>
    //   {props.questions.map((q, i) => (
    //     <SuggestionItem key={i} question={q} onPress={props.onPress} />
    //   ))}
    // </VStack>
  );
};

export default SuggestionList;
