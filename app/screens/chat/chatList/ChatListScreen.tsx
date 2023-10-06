import React, { useContext } from "react";
import { FlatList } from "native-base";
import { ChatContext } from "@contexts/context";
import ChatListItem from "./components/ChatListItem";

const ChatListScreen = () => {
  const { chats } = useContext(ChatContext);

  return (
    <FlatList
      bgColor={"black"}
      pt={5}
      h={"full"}
      keyExtractor={(item) => item.id.toString()}
      data={chats.filter((chat) => chat.messages.length > 0)}
      renderItem={({ item }) => <ChatListItem chat={item} />}
    />
  );
};

export default ChatListScreen;
