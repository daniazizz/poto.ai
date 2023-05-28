import React from "react";
import {
  Box,
  Text,
  Pressable,
  VStack,
  FlatList,
  ScrollView,
} from "native-base";
import {} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../components/Explore/SearchBar";
import charactersService, {
  CategoryCharacters,
  Character,
} from "../../services/charactersService";
import CharacterListCategory from "../../components/Explore/CharacterListCategory";
import CharacterAvatar from "../../components/common/CharacterAvatar";

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [allCategories, setAllCategories] = React.useState<
    CategoryCharacters[]
  >([]);
  const [allCharacters, setAllCharacters] = React.useState<Character[]>([]);

  React.useEffect(() => {
    charactersService
      .getCharactersByCategory()
      .then(({ data }) => {
        // console.log(data);
        setAllCategories(data);
        const characters = data
          .map((category) => category.characters)
          .flat()
          .filter((character, index, array) => {
            // Filter out characters with duplicate names
            return array.findIndex((c) => c.name === character.name) === index;
          });
        setAllCharacters([...new Set(characters)]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <VStack h={"full"} w={"full"}>
      <FlatList
        pt={2}
        ListHeaderComponent={
          <SearchBar
            disabled={true}
            onPress={() =>
              navigation.navigate({
                name: "ExploreSearchScreen",
                params: { characters: allCharacters },
              } as never)
            }
          />
        }
        ListHeaderComponentStyle={{ paddingBottom: 20 }}
        // keyboardShouldPersistTaps="handled"
        initialNumToRender={4}
        data={allCategories}
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
                  onPress={() =>
                    navigation.navigate({
                      name: "NewChatScreen",
                      params: { character: char },
                    } as never)
                  }
                  alignItems={"center"}
                >
                  <CharacterAvatar
                    name={char.name}
                    image={char.image}
                    size="xl"
                    style={{ marginHorizontal: 10 }}
                  />
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

      {/* <CharacterListCategory
        data={allCategories}
        handleSelect={() => console.log("handleSelect")}
      /> */}
    </VStack>
  );
};

export default ExploreScreen;
