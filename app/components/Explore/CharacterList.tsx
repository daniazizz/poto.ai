import React from "react";
import { Character } from "../../services/charactersService";
import {
  HStack,
  Box,
  VStack,
  FlatList,
  Pressable,
  Image,
  Text,
  ScrollView,
} from "native-base";
import CharacterListItem from "./CharacterListItem";
// import {  } from "react-native";

interface Props {
  data: Character[];
  handleSelect: (char: Character) => void;
}

const CharacterList = (props: Props) => {
  React.useEffect(() => {
    console.log("CharacterList rendered");
  }, []);

  return (
    // <ScrollView>
    //   {props.data.map((char) => (
    //     <CharacterListItem
    //       key={char.id}
    //       item={char}
    //       handleSelect={props.handleSelect}
    //     />
    //   ))}
    // </ScrollView>
    <FlatList
      keyboardShouldPersistTaps="handled"
      // initialNumToRender={5}
      data={props.data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: char, index: idx }) => (
        // <CharacterListItem item={char} handleSelect={props.handleSelect} />
        <Pressable mb={3} onPress={() => props.handleSelect(char)}>
          {({ isPressed }) => (
            <HStack
              space="3"
              height="80px"
              alignItems="center"
              rounded={"xl"}
              backgroundColor={"gray.800"}
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.95 : 1,
                  },
                ],
              }}
              p={3}
            >
              <Box width={60}>
                {char.image ? (
                  <Image
                    rounded={"xl"}
                    // size={"md"}
                    width={"100%"}
                    height={"100%"}
                    source={{
                      uri: char.image,
                    }}
                    alt="Character portrait"
                  />
                ) : (
                  <Box
                    bgColor={"gray.100"}
                    opacity={0.5}
                    width={"100%"}
                    height={"100%"}
                    rounded={"xl"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                  >
                    <Text fontSize={30} textAlign={"center"}>
                      {char.name[0]}
                    </Text>
                  </Box>
                )}
              </Box>
              <VStack
                height={"full"}
                flexDirection={"column"}
                // justifyContent={""}
                flex={3}
              >
                <Text
                  fontSize="lg"
                  fontWeight={700}
                  color={"white"}
                  maxWidth={"100%"}
                  overflow={"hidden"}
                  numberOfLines={1}
                >
                  {char.name}
                </Text>
                <Text fontSize={9} color={"white"} numberOfLines={2}>
                  {char.short_description}
                </Text>
              </VStack>
            </HStack>
          )}
        </Pressable>
      )}
    />
  );
};

export default React.memo(CharacterList);
