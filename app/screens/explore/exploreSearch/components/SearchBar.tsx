import { HStack, Pressable } from "native-base";
import React from "react";
import { TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import constants from "@constants/constants";

interface Props {
  disabled?: boolean;
  onPress?: () => void;
  autoFocus?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = (props: Props) => {
  return (
    <HStack
      bg={constants.SECUNDARY_COLOR}
      rounded={"xl"}
      p={2}
      mx={2}
      space={2}
      onTouchStart={props.onPress}
    >
      <MaterialIcons name="search" size={24} color="gray" />
      <TextInput
        style={{ flex: 1, fontSize: 18, color: "white" }}
        keyboardAppearance="dark"
        placeholder="Search"
        placeholderTextColor={"gray"}
        editable={!props.disabled}
        autoFocus={props.autoFocus}
        value={props.value}
        onChangeText={props.onChangeText}
      />
      {props.value && props.value.length > 0 && (
        <Pressable onPress={() => props.onChangeText("")}>
          <MaterialIcons name="cancel" size={24} color="gray" />
        </Pressable>
      )}
    </HStack>
  );
};

export default SearchBar;
