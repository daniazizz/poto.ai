import React, { useContext, useState } from "react";
import ChatLayout from "../../components/chat/ChatLayout";
import { Box, KeyboardAvoidingView, Text } from "native-base";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Character } from "../../services/charactersService";
import { ChatStackParamList } from "./ChatNavigation";
import chatService, { Chat } from "../../services/chatService";
import { Keyboard, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { BottomBarContext, ChatContext } from "../../context/context";
import LoadingWrapper from "../../components/common/LoadingWrapper";
import * as Haptics from "expo-haptics";

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ChatStackParamList, "ChatScreen">>();
  const params: { character: Character; chat?: Chat } = route.params;
  const headerHeight = useHeaderHeight();
  const { newChat } = useContext(ChatContext);
  const [chat, setChat] = useState<Chat | undefined>(params.chat);
  const { setBottomTabBarVisible } = useContext(BottomBarContext);

  React.useEffect(() => {
    // console.log(route.params);
    if (!params.chat) {
      // Create a new chat
      newChat(params.character.id)
        ?.then((chat) => {
          setChat(chat);
        })
        .finally(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        });
    }
    setBottomTabBarVisible(false);
    return () => {
      setBottomTabBarVisible(true);
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : 0}
    >
      {chat && (
        <ChatLayout
          chat={chat}
          handleReturn={() => navigation.goBack()}
          character={params.character}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
