import React from "react";
import ChatLayout from "../../components/chat/ChatLayout";
import { Box, KeyboardAvoidingView, Text } from "native-base";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Character } from "../../services/charactersService";
import { ExploreStackParamList } from "./ExploreNavigation";
import { Platform } from "react-native";
import { Header } from "@react-navigation/stack";
import { useHeaderHeight } from "@react-navigation/elements";

const NewChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ExploreStackParamList, "NewChatScreen">>();
  const params: { character: Character } = route.params;
  const headerHeight = useHeaderHeight();

  React.useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <KeyboardAvoidingView
      h={"full"}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={headerHeight + 15}
    >
      <ChatLayout
        selectedCharacter={params.character}
        convItems={[]}
        handleReturn={() =>
          navigation.navigate({ name: "ExploreScreen" } as never)
        }
      />
    </KeyboardAvoidingView>
  );
};

export default NewChatScreen;
