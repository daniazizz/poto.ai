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
import React, { useContext, useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ChatHeader from "./ChatHeader";
import ConversationList from "./ConversationList";
import charactersService, {
  Character,
  QuestionSuggestion,
} from "../../services/charactersService";
import chatService, { Chat, ChatMessage } from "../../services/chatService";
import { ChatContext, UserDataContext } from "../../context/context";
import ViolationError from "./errors/ViolationError";
import CreditsError from "./errors/CreditsError";
import ServerError from "./errors/ServerError";
import SuggestionList from "./suggestions/SuggestionList";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

interface Props {
  handleReturn: () => void;
  character: Character;
  chat: Chat;
}

export interface ConversationItemType extends ChatMessage {
  loading: boolean;
}

type ErrorCodes = "VIOLATION" | "CREDITS" | "SERVER";

const ChatLayout = (props: Props) => {
  const [convItems, setConvItems] = useState<ConversationItemType[]>([]);
  const scrollRef = useRef<any>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { addMessage } = useContext(ChatContext);
  const [error, setError] = useState<ErrorCodes | undefined>();
  const [suggestions, setSuggestions] = useState<QuestionSuggestion[]>([]);
  const [randomQuestions, setRandomQuestions] = useState<string[]>([]);

  const { credits, setCredits } = useContext(UserDataContext);

  useEffect(() => {
    setConvItems(
      props.chat?.messages.map((msg) => ({ ...msg, loading: false }))
    );
    scrollToEnd();
  }, [props.chat]);

  useEffect(() => {
    setSuggestions(props.character.questions);
    setRandomQuestions(getRandomQuestion(4));
  }, [props.character]);

  const getRandomQuestion = (amount: number) => {
    if (props.character.questions.length <= amount)
      return props.character.questions.map((q) => q.question);
    const randomQuestions = [...props.character.questions];
    const randomQuestionsArray: string[] = [];
    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * randomQuestions.length);
      randomQuestionsArray.push(randomQuestions[randomIndex].question);
      randomQuestions.splice(randomIndex, 1);
    }
    return randomQuestionsArray;
  };

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
    setError(undefined);

    const oldConvItems = [...convItems];

    oldConvItems.push({ sender: "user", content: text, loading: false });

    setConvItems(oldConvItems);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    addMessage(props.chat.id, { sender: "user", content: text });

    setText("");

    setLoading(true);
    let nonStateLoading = true;

    setTimeout(() => {
      if (nonStateLoading) {
        setConvItems((prev) => [
          ...prev,
          { sender: "character", content: "", loading: true },
        ]);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
    }, 1000);

    props.chat &&
      charactersService
        .askQuestion(props.character.id, text, props.chat.id)
        .then(({ data }) => {
          setConvItems([
            ...oldConvItems,
            { sender: "character", content: data.answer, loading: false },
          ]);

          addMessage(props.chat.id, {
            sender: "character",
            content: data.answer,
          });

          // CREDITS
          setCredits(credits - 1);

          setLoading(false);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          scrollToEnd();
        })
        .catch((err) => {
          const errorCode = err.response?.data?.code;
          console.log(errorCode);
          setError(errorCode);
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

  return props.chat ? (
    <VStack space="3" backgroundColor={"black"} height={"100%"} pb={5}>
      {/* HEADER */}
      <ChatHeader
        selectedCharacter={props.character}
        handleReturn={props.handleReturn}
      />

      {/* SUGGESTIONS */}
      {suggestions.length > 0 && convItems.length === 0 ? (
        <SuggestionList questions={randomQuestions} onPress={setText} />
      ) : (
        <ConversationList
          scrollRef={scrollRef}
          conversationItems={convItems}
          character={props.character}
        />
      )}

      {/* ERROR */}
      {error &&
        (error === "VIOLATION" ? (
          <ViolationError />
        ) : error === "CREDITS" ? (
          <CreditsError />
        ) : (
          <ServerError />
        ))}
      <HStack alignItems="flex-start" mx={1}>
        {/* INPUT TEXT */}
        <HStack space={3} alignItems={"center"}>
          <Box
            backgroundColor={"gray.700"}
            borderRadius={18}
            flex={1}
            height={"full"}
            width={"full"}
            // pt={3}
            padding={2}
            pl={4}
            flexDirection={"row"}
          >
            <TextInput
              style={{
                height: "100%",
                width: "90%",
                // flexGrow: 1,
                color: "white",
                fontSize: 15,
                maxHeight: 150,
                paddingVertical: 5,
                paddingTop: 7,
                marginRight: 2,
              }}
              multiline
              keyboardAppearance="dark"
              maxLength={500}
              placeholder="Text Message"
              placeholderTextColor={"#a1a1aa"}
              value={text}
              onChangeText={(text) => setText(text)}
            />
            <Pressable
              onPress={() => {
                const randomQuestion = getRandomQuestion(1)[0];
                setText(randomQuestion);
              }}
            >
              <Box py={1}>
                <Ionicons name="ios-bulb" size={24} color="gray" />
              </Box>
            </Pressable>
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
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white" }}>Loading...</Text>
    </View>
  );
};

export default ChatLayout;
