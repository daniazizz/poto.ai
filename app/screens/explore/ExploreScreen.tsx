import React, { useEffect } from "react";
import {
  Box,
  Text,
  Pressable,
  VStack,
  FlatList,
  ScrollView,
  Image,
  useTheme,
} from "native-base";
import {} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../components/Explore/SearchBar";
import charactersService, {
  CategoryCharacters,
  Character,
} from "../../services/charactersService";
import CharacterAvatar from "../../components/common/CharacterAvatar";
import { User } from "firebase/auth";
import LoadingWrapper from "../../components/common/LoadingWrapper";
import { BottomBarContext, SplashScreenContext } from "../../context/context";

interface CharacterItemProps {
  char: Character;
  onPress: () => void;
}

const CharacterItem = React.memo(({ char, onPress }: CharacterItemProps) => {
  char.image && console.log(char.image);
  return (
    <Pressable onPress={onPress} alignItems={"center"}>
      <CharacterAvatar
        name={char.name}
        image={char.image}
        size={"xl"}
        style={{ marginHorizontal: 10, marginBottom: 5 }}
      />
      <Text
        color={"white"}
        fontSize="sm"
        fontWeight={500}
        maxWidth={"80px"}
        textAlign={"center"}
        numberOfLines={2}
      >
        {char.name}
      </Text>
    </Pressable>
  );
});

interface CharacterListProps {
  categoryName: string;
  data: Character[];
  onPress: (char: Character) => void;
}

const CharacterList = React.memo(
  ({ data, onPress, categoryName }: CharacterListProps) => {
    return (
      <VStack space="5" my={2} bgColor={"gray.800"} py={3}>
        <Text fontSize="xl" fontWeight={"semibold"} pl={3} color={"white"}>
          {categoryName}
        </Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={4}
          windowSize={4}
          removeClippedSubviews={true}
          renderItem={({ item }) => (
            <CharacterItem char={item} onPress={() => onPress(item)} />
          )}
        />
      </VStack>
    );
  }
);

interface CharacterListCategoryProps {
  allCategories: CategoryCharacters[];
  allCharacters: Character[];
  onPress: (char: Character) => void;
  onPressSearch: () => void;
}

const CharacterListCategory = React.memo(
  ({
    allCategories,
    allCharacters,
    onPress,
    onPressSearch,
  }: CharacterListCategoryProps) => {
    return (
      <FlatList
        pt={2}
        ListHeaderComponent={
          <SearchBar
            disabled={true}
            onPress={onPressSearch}
            onChangeText={() => {}}
            value=""
          />
        }
        ListHeaderComponentStyle={{ paddingBottom: 20 }}
        // keyboardShouldPersistTaps="handled"
        initialNumToRender={3}
        // windowSize={3}
        // removeClippedSubviews={true}
        data={allCategories}
        keyExtractor={(item) => item.category.name}
        renderItem={({ item: cat, index: idx }) => (
          <CharacterList
            data={cat.characters}
            onPress={onPress}
            categoryName={cat.category.name}
          />
        )}
      />
    );
  }
);

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [allCategories, setAllCategories] = React.useState<
    CategoryCharacters[]
  >([]);
  const [allCharacters, setAllCharacters] = React.useState<Character[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { setAppIsReady } = React.useContext(SplashScreenContext);

  React.useEffect(() => {
    setLoading(true);
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
        setAppIsReady(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <LoadingWrapper loading={loading}>
      <VStack h={"full"} w={"full"}>
        <CharacterListCategory
          allCategories={allCategories}
          allCharacters={allCharacters}
          onPress={(char) => {
            navigation.navigate({
              name: "CharacterScreen",
              params: { character: char },
            } as never);
          }}
          onPressSearch={() => {
            navigation.navigate({
              name: "ExploreSearchScreen",
              params: { characters: allCharacters },
            } as never);
          }}
        />
      </VStack>
    </LoadingWrapper>
  );
};

export default ExploreScreen;
