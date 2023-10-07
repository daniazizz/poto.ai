import {
  Box,
  FlatList,
  HStack,
  Text,
  VStack,
  Pressable,
  ChevronLeftIcon,
  KeyboardAvoidingView,
} from "native-base";
import React from "react";
import SearchBar from "./components/SearchBar";

import { useNavigation } from "@react-navigation/native";
import { Character } from "@~types/characterTypes";
import { RouteProp, useRoute } from "@react-navigation/native";
import debounce from "lodash.debounce";
import CharacterAvatar from "@components/common/CharacterAvatar";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStackParamList } from "@root/App";

const ExploreSearchScreen = () => {
  const route =
    useRoute<RouteProp<MainStackParamList, "ExploreSearchScreen">>();
  const routeProps = route.params;
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

      const filtered = routeProps.characters.filter((character) =>
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
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <KeyboardAvoidingView behavior={"padding"} flex={1}>
        <VStack space="5" height={"100%"} w={"100%"} alignItems={"center"}>
          {/* HEADER */}
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
            w={"100%"}
            // flexGrow={1}
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
                    name: "CharacterScreen",
                    params: { character: char },
                  } as never)
                }
              >
                <HStack space={3} mb={6} px={4} alignItems={"center"}>
                  <CharacterAvatar
                    size={"lg"}
                    name={char.name}
                    image={char.image}
                  />

                  <VStack>
                    <Text color={"white"} fontWeight={"bold"}>
                      {char.name}
                    </Text>
                    <Text
                      color={"white"}
                      fontSize={"xs"}
                      maxWidth={"90%"}
                      numberOfLines={2}
                    >
                      {char.short_description}
                    </Text>
                  </VStack>
                </HStack>
              </Pressable>
            )}
          />
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ExploreSearchScreen;
