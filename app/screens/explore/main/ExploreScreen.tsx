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
  Skeleton,
  HStack,
} from "native-base";
import {} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../../components/Explore/SearchBar";
import charactersService, {
  CategoryCharacters,
  Character,
} from "../../../services/charactersService";
import CharacterAvatar from "../../../components/common/CharacterAvatar";
import { User } from "firebase/auth";
import LoadingWrapper from "../../../components/common/LoadingWrapper";
import {
  BottomBarContext,
  CharacterContext,
  SplashScreenContext,
} from "../../../context/context";

interface CharacterItemProps {
  char: Character;
}

const CharacterItem = React.memo(({ char }: CharacterItemProps) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        console.log(char);
        navigation.navigate({
          name: "CharacterScreen",
          params: { character: char },
        } as never);
      }}
      alignItems={"center"}
    >
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
}

const CharacterList = React.memo(
  ({ data, categoryName }: CharacterListProps) => {
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
          renderItem={({ item }) => <CharacterItem char={item} />}
        />
      </VStack>
    );
  }
);

interface CharacterListCategoryProps {
  allCategories: CategoryCharacters[];
  allCharacters: Character[];
}

const CharacterListCategory = React.memo(
  ({ allCategories, allCharacters }: CharacterListCategoryProps) => {
    const navigation = useNavigation();
    return (
      <FlatList
        pt={2}
        ListHeaderComponent={
          <SearchBar
            disabled={true}
            onPress={() => {
              navigation.navigate({
                name: "ExploreSearchScreen",
                params: { characters: allCharacters },
              } as never);
            }}
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
            categoryName={cat.category.name}
          />
        )}
      />
    );
  }
);

const LoadingSkeleton = React.memo(() => {
  return (
    <FlatList
      pt={2}
      ListHeaderComponent={
        <SearchBar disabled={true} onChangeText={() => {}} value="" />
      }
      ListHeaderComponentStyle={{ paddingBottom: 20 }}
      initialNumToRender={3}
      data={[1, 2, 3, 4, 5, 6, 7]}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item: cat, index: idx }) => (
        <VStack height={225} mb={5} bgColor={"gray.800"}>
          <Skeleton.Text lines={1} w={250} p={5} />
          <HStack alignItems={"center"}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[1, 2, 3, 4, 5, 6]}
              keyExtractor={(item) => item.toString()}
              initialNumToRender={4}
              windowSize={4}
              removeClippedSubviews={true}
              renderItem={({ item }) => (
                <VStack alignItems={"center"} space={4} mx={2}>
                  <Skeleton h={100} w={100} rounded={"full"} />
                  <Skeleton.Text lines={2} w={75} alignItems={"center"} />
                </VStack>
              )}
            />
          </HStack>
        </VStack>
      )}
    />
  );
});

const ExploreScreen = () => {
  const { allCategories, allCharacters } = React.useContext(CharacterContext);
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <LoadingWrapper loading={loading}>
      <VStack h={"full"} w={"full"}>
        {allCategories.length === 0 ? (
          <LoadingSkeleton />
        ) : (
          <CharacterListCategory
            allCategories={allCategories}
            allCharacters={allCharacters}
          />
        )}
      </VStack>
    </LoadingWrapper>
  );
};

export default ExploreScreen;
