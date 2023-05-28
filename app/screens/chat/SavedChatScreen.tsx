import React from "react";
import ChatLayout from "../../components/chat/ChatLayout";
import { Box, Text } from "native-base";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Character } from "../../services/charactersService";
import { ChatStackParamList } from "./ChatNavigation";

const SavedChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ChatStackParamList, "ChatScreen">>();
  const params: { character: Character } = route.params;

  React.useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <ChatLayout
      selectedCharacter={params.character}
      convItems={[]}
      handleReturn={() => navigation.goBack()}
    />
  );
};

export default SavedChatScreen;
