import {
  VStack,
  Center,
  Avatar,
  HStack,
  Text,
  Image,
  ScrollView,
  Pressable,
  Box,
  FlatList,
} from "native-base";
import React from "react";
import { TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import charactersService, {
  CategoryCharacters,
  Character,
} from "../../services/charactersService";
import CharacterList from "./CharacterList";
import CharacterListCategory from "./CharacterListCategory";
import debounce from "lodash.debounce";
import SearchBar from "./SearchBar";

interface Props {
  handleSelect: (char: Character) => void;
}

const ExploreLayout = (props: Props) => {
  const [search, setSearch] = React.useState("");
  const [allCategories, setAllCategories] = React.useState<
    CategoryCharacters[]
  >([]);
  const [filteredCharacters, setFilteredCharacters] = React.useState<
    CategoryCharacters[]
  >([]);

  React.useEffect(() => {
    charactersService
      .getCharactersByCategory()
      .then(({ data }) => {
        // console.log(data);
        data && setAllCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const debouncedhandleFilter = React.useCallback(
    debounce((text: string) => {
      // const filtered = allCategories.filter((char) =>
      text.length > 0 &&
        setFilteredCharacters((prev) => {
          const filtered = allCategories.map((cat) => {
            const characters = cat.characters.filter((char) =>
              char.name.toLowerCase().includes(text.toLowerCase())
            );
            // console.log("characters", characters);
            return { ...cat, characters };
          });
          console.log("text", text);
          console.log("filtered", filtered);
          return filtered;
        });

      // allCategories.forEach((cat) => {
      //   cat.characters.forEach((char) => {
      //     if (char.name.toLowerCase().includes(text.toLowerCase())) {
      //       filtered.find((c) => c.id === char.id)
      //         ? null
      //         : filtered.push(char);
      //     }
      //   });
      // });
      // console.log("text", text);
      // console.log("filtered", filtered);
      // setFilteredCharacters(filtered);
    }, 300),
    []
  );

  const handleFilter = (text: string) => {
    setSearch(text);
    text.length > 0 &&
      setFilteredCharacters((prev) => {
        const filtered = allCategories.map((cat) => {
          const characters = cat.characters.filter((char) =>
            char.name.toLowerCase().includes(text.toLowerCase())
          );
          // console.log("characters", characters);
          return { ...cat, characters };
        });
        // console.log("text", text);
        // console.log("filtered", filtered);
        return filtered;
      });
  };

  return (
    <VStack space="3" flex={1} pt={4}>
      <SearchBar />

      <CharacterListCategory
        data={search.length === 0 ? allCategories : filteredCharacters}
        handleSelect={props.handleSelect}
      />
    </VStack>
  );
};

export default ExploreLayout;
