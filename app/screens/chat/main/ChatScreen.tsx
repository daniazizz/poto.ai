import React, { useContext, useState } from "react";
import { Box } from "native-base";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Character } from "../../../services/charactersService";
import { Chat } from "../../../services/chatService";
import { ChatContext } from "../../../context/context";
import * as Haptics from "expo-haptics";
import ChatLayout2 from "../../../components/chatv2/ChatLayout2";
import { MainStackParamList } from "../../../../App";

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<MainStackParamList, "ChatScreen">>();
  const params: { character: Character; chat?: Chat } = route.params;
  const { newChat } = useContext(ChatContext);
  const [chat, setChat] = useState<Chat | undefined>(params.chat);

  console.log("chatscreen");

  React.useEffect(() => {
    // console.log(route.params);
    if (!params.chat) {
      // Create a new chat
      newChat(params.character.id)
        ?.then((chat) => {
          setChat(chat);
        })
        .catch((err) => {
          console.log(err);
          navigation.goBack();
        })
        .finally(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        });
    }
  }, []);

  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={Platform.OS === "ios" ? "padding" : undefined}
    //   keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : 0}
    // >
    // {chat && (
    // <ChatLayout
    //   chat={chat}
    //   handleReturn={() => navigation.goBack()}
    //   character={params.character}
    // />
    <Box>
      {chat && <ChatLayout2 chat={chat} character={params.character} />}
    </Box>
    // )}
    // </KeyboardAvoidingView>
  );
};

export default ChatScreen;
