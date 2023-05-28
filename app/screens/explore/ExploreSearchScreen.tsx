import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Text,
  VStack,
  Pressable,
  ChevronLeftIcon,
} from "native-base";
import React from "react";
import SearchBar from "../../components/Explore/SearchBar";

import { useNavigation } from "@react-navigation/native";
import { Character } from "../../services/charactersService";
import { ExploreStackParamList } from "./ExploreNavigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import debounce from "lodash.debounce";
import CharacterAvatar from "../../components/common/CharacterAvatar";

const ExploreSearchScreen = () => {
  const route =
    useRoute<RouteProp<ExploreStackParamList, "ExploreSearchScreen">>();
  const props = route.params;
  const [search, setSearch] = React.useState("");
  const [filteredCharacters, setFilteredCharacters] = React.useState<
    Character[]
  >([]);

  // Debounce the handleSearch function
  const debouncedHandleSearch = React.useCallback(
    debounce((text: string) => {
      if (text === "") {
        setFilteredCharacters([]);
        return;
      }

      const filtered = props.characters.filter((character) =>
        character.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }, 200), // Specify the debounce delay (in milliseconds) as desired
    []
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    // Call the debounced version of handleSearch
    debouncedHandleSearch(text);
  };

  const navigation = useNavigation();
  return (
    <VStack space="5">
      <HStack py={1} alignItems={"center"}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          p={3}
        >
          <ChevronLeftIcon size="lg" />
        </Pressable>

        <Box flex={1}>
          <SearchBar
            disabled={false}
            autoFocus={true}
            value={search}
            onChangeText={handleSearch}
          />
        </Box>
      </HStack>
      <FlatList
        height={"100%"}
        keyboardShouldPersistTaps={"handled"}
        // initialNumToRender={5}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
        keyExtractor={(item, index) => index.toString()}
        data={filteredCharacters.slice(0, 5)}
        renderItem={({ item: char }) => (
          <Pressable
            onPress={() =>
              navigation.navigate({
                name: "NewChatScreen",
                params: { character: char },
              } as never)
            }
          >
            <HStack space={3} mb={6}>
              <CharacterAvatar
                size={"lg"}
                name={char.name}
                image={"https://picsum.photos/300"}
              />

              <VStack>
                <Text color={"white"} fontWeight={"bold"}>
                  {char.name}
                </Text>
                <Text color={"white"} fontSize={"xs"} maxWidth={"90%"}>
                  {char.short_description}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        )}
      />
    </VStack>
  );
};

export default ExploreSearchScreen;
