import { HStack, Box, VStack, Pressable, Image, Text } from "native-base";
import React from "react";
import { Character } from "../../services/charactersService";

interface Props {
  item: Character;
  handleSelect: (char: Character) => void;
}

const CharacterListItem = (props: Props) => {
  React.useEffect(() => {
    console.log("CharacterListItem rendered" + props.item.name);
  }, []);

  return (
    <Pressable mb={3} onPress={() => props.handleSelect(props.item)}>
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
            {props.item.image ? (
              <Image
                rounded={"xl"}
                // size={"md"}
                width={"100%"}
                height={"100%"}
                source={{
                  uri: props.item.image,
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
                  {props.item.name[0]}
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
              {props.item.name}
            </Text>
            <Text fontSize={9} color={"white"} numberOfLines={2}>
              {props.item.short_description}
            </Text>
          </VStack>
        </HStack>
      )}
    </Pressable>
  );
};

export default CharacterListItem;
