import {
  Box,
  Center,
  FlatList,
  Pressable,
  SectionList,
  Text,
  VStack,
} from "native-base";
import React from "react";
import {
  CategoryCharacters,
  Character,
} from "../../services/charactersService";

interface Props {
  data: CategoryCharacters[];
  handleSelect: (char: Character) => void;
}

const CharacterListCategory = (props: Props) => {
  return (
    <FlatList
      // keyboardShouldPersistTaps="handled"
      initialNumToRender={4}
      data={props.data}
      keyExtractor={(item) => item.category.name}
      renderItem={({ item: cat, index: idx }) => (
        <VStack space="5" my={2}>
          <Text fontSize="lg" color={"white"}>
            {cat.category.name}
          </Text>
          <FlatList
            maxToRenderPerBatch={4}
            horizontal
            initialNumToRender={4}
            showsHorizontalScrollIndicator={false}
            data={cat.characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: char, index: idx }) => (
              <Pressable
                onPress={() => props.handleSelect(char)}
                alignItems={"center"}
              >
                <Box
                  mx={2}
                  bgColor="gray.400"
                  w={"80px"}
                  h={"80px"}
                  rounded={"xl"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text color={"white"} fontSize="xs">
                    {char.name[0]}
                  </Text>
                </Box>
                <Text
                  color={"white"}
                  fontSize="xs"
                  maxWidth={"80px"}
                  textAlign={"center"}
                  numberOfLines={2}
                >
                  {char.name}
                </Text>
              </Pressable>
            )}
          />
        </VStack>
      )}
    />
  );
};

export default CharacterListCategory;
