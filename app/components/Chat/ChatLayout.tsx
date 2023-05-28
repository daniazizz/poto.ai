import {
  Center,
  HStack,
  // ScrollView,
  VStack,
  TextArea,
  // Input,
  Box,
  Pressable,
  FlatList,
} from "native-base";
import { TextInput, View, ScrollView, Text, Keyboard } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ChatHeader from "./ChatHeader";
import ConversationList from "./ConversationList";
import charactersService, { Character } from "../../services/charactersService";

interface Props {
  handleReturn: () => void;
  selectedCharacter: Character;
  convItems: ConversationItemType[];
}

export interface ConversationItemType {
  sender: "AI" | "USER";
  message: string;
  loading: boolean;
}

const ChatLayout = (props: Props) => {
  const [convItems, setConvItems] = useState(props.convItems || []);
  const scrollRef = useRef<any>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 350);
  };

  useEffect(() => {
    scrollToEnd();
  }, [convItems]);

  const handleSend = () => {
    if (loading) return;
    const oldConvItems = [...convItems];

    oldConvItems.push({ sender: "USER", message: text, loading: false });

    setConvItems(oldConvItems);

    setText("");

    setLoading(true);
    let nonStateLoading = true;

    setTimeout(() => {
      nonStateLoading &&
        setConvItems((prev) => [
          ...prev,
          { sender: "AI", message: "", loading: true },
        ]);
    }, 1000);

    charactersService
      .askQuestion(props.selectedCharacter.id, text)
      .then(({ data }) => {
        setConvItems([
          ...oldConvItems,
          { sender: "AI", message: data.answer, loading: false },
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        nonStateLoading = false;
      });
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
      scrollToEnd();
    });

    return () => {
      showSubscription.remove();
    };
  }, []);

  return (
    <VStack space="3" h={"100%"} backgroundColor={"black"}>
      {/* HEADER */}
      <ChatHeader
        selectedCharacter={props.selectedCharacter}
        handleReturn={props.handleReturn}
      />

      <ConversationList scrollRef={scrollRef} conversationItems={convItems} />

      <HStack alignItems="start">
        {/* INPUT TEXT */}
        <HStack space={3} alignItems={"center"}>
          <Box
            backgroundColor={"gray.700"}
            borderRadius={18}
            flex={1}
            height={"full"}
            pt={3}
            padding={4}
            flexDirection={"row"}
          >
            <TextInput
              style={{
                height: "100%",
                width: "100%",
                color: "white",
                fontSize: 14,
                maxHeight: 150,
              }}
              multiline
              keyboardAppearance="dark"
              maxLength={500}
              placeholder="Type something..."
              placeholderTextColor={"#a1a1aa"}
              value={text}
              onChangeText={(text) => setText(text)}
            />
          </Box>
          {/* SEND BUTTON */}
          <Pressable
            disabled={text.length === 0 || loading}
            opacity={text.length === 0 || loading ? 0.5 : 1}
            onPressIn={() => {
              handleSend();
            }}
          >
            {({ isPressed }) => (
              <Box
                bg="blue.600"
                p="3"
                rounded="xl"
                // h={"full"}
                // opacity={isPressed ? 0.5 : 1}
              >
                <MaterialIcons name="arrow-upward" size={30} color="white" />
              </Box>
            )}
          </Pressable>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default ChatLayout;
