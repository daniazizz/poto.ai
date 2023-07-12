import { Box, Pressable, VStack, View, Text, useTheme } from "native-base";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView, TextInput } from "react-native";
import {
  Bubble,
  BubbleProps,
  ComposerProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import charactersService, { Character } from "../../services/charactersService";
import { Chat } from "../../services/chatService";
import ChatHeader from "../chat/ChatHeader";
import { useNavigation } from "@react-navigation/native";
import { ChatContext, UserDataContext } from "../../context/context";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";
import SuggestionList from "../chat/suggestions/SuggestionList";
import CharacterAvatar from "../common/CharacterAvatar";
import { TypingAnimation } from "react-native-typing-animation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";
import debounce from "lodash.debounce";

const CustomBubble = React.memo((props: BubbleProps<IMessage>) => {
  const theme = useTheme();
  return (
    <Bubble
      {...props}
      textStyle={{
        left: {
          color: "white",
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: theme.colors.gray[700],
        },
      }}
    />
  );
});

interface CustomComposerProps extends ComposerProps {
  getRandomQuestion: (amount: number) => string[];
}

const CustomComposer = React.memo((props: CustomComposerProps) => {
  // const [height, setHeight] = useState(props.composerHeight);
  return (
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
      {...props}
    >
      <TextInput
        style={{
          height: "100%",
          width: "90%",
          // flexGrow: 1,
          color: "white",
          fontSize: 15,
          maxHeight: 215,
          paddingVertical: 5,
          paddingTop: 7,
          marginRight: 2,
        }}
        multiline
        keyboardAppearance="dark"
        maxLength={500}
        placeholder={"Type a message..."}
        placeholderTextColor={"#a1a1aa"}
        value={props.text}
        // onChangeText={(text) => setText(text)}
        onChangeText={props.onTextChanged}
        onContentSizeChange={(event) =>
          props.onInputSizeChanged &&
          props.onInputSizeChanged({
            height: event.nativeEvent.contentSize.height,
            width: event.nativeEvent.contentSize.width,
          })
        }
      />
      <Pressable
        onPress={() => {
          const randomQuestion = props.getRandomQuestion(1)[0];
          props.onTextChanged && props.onTextChanged(randomQuestion);
        }}
      >
        <Box py={1}>
          <Ionicons name="ios-bulb" size={24} color="gray" />
        </Box>
      </Pressable>
    </Box>
  );
});

const OutOfCredits = () => {
  const navigation = useNavigation();
  return (
    <VStack
      alignItems={"center"}
      mb={8}
      mt={3}
      mx={3}
      p={3}
      rounded={"xl"}
      bgColor={"gray.900"}
    >
      <Text fontSize={30}>💭</Text>
      <Text color={"white"} fontSize={18} fontWeight={500}>
        Out of messages
      </Text>
      <Text color={"white"} fontSize={14} opacity={0.7}>
        Come back tomorrow or
      </Text>
      <Pressable onPress={() => navigation.navigate({ name: "Shop" } as never)}>
        <Box p={2} px={6} bgColor={"blue.500"} rounded={"xl"} mt={2}>
          <Text color={"white"} fontSize={16} fontWeight={600}>
            Refill
          </Text>
        </Box>
      </Pressable>
    </VStack>
  );
};

const NetworkError = () => {
  return (
    <VStack
      alignItems={"center"}
      mb={8}
      mt={3}
      mx={3}
      p={3}
      rounded={"xl"}
      bgColor={"gray.900"}
    >
      <Ionicons name="ios-wifi" size={35} color="white" />
      <Text color={"white"} fontSize={18} fontWeight={500}>
        Network error
      </Text>
      <Text color={"white"} opacity={0.7} fontSize={16} fontWeight={400}>
        Please try again.
      </Text>
    </VStack>
  );
};

const CustomFooter = ({
  error,
  loading,
}: {
  error: string;
  loading: boolean;
}) => {
  const theme = useTheme();
  if (error === "credits") return <OutOfCredits />;
  if (error === "network") return <NetworkError />;
  return loading ? (
    <Box height={50} ml={4}>
      <TypingAnimation
        dotRadius={5}
        dotMargin={7}
        dotColor={theme.colors.gray[100]}
        dotAmplitude={5}
        dotSpeed={0.15}
        dotX={12}
        dotY={6}
      />
    </Box>
  ) : (
    <Box mb={3} />
  );
};

const checkReview = () => {
  AsyncStorage.getItem("reviewed").then((value) => {
    if (value === "false") {
      AsyncStorage.getItem("actionsUntilReview").then((value) => {
        if (value) {
          const actionsUntilReview = parseInt(value);
          if (actionsUntilReview === 1) {
            StoreReview.isAvailableAsync().then((available) => {
              if (available) {
                StoreReview.requestReview()
                  .then(() => {
                    AsyncStorage.setItem("reviewed", "true");
                    AsyncStorage.setItem("actionsUntilReview", "0");
                  })
                  .catch((err) => {
                    AsyncStorage.setItem("actionsUntilReview", "7");
                    console.log(err);
                  });
              }
            });
            // AsyncStorage.setItem("reviewed", "true");
            // AsyncStorage.setItem("actionsUntilReview", "7");
          } else {
            AsyncStorage.setItem(
              "actionsUntilReview",
              (actionsUntilReview - 1).toString()
            );
          }
        }
      });
    }
  });
};

interface Props {
  character: Character;
  chat: Chat;
}

const ChatLayout2 = (props: Props) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendDisabled, setSendDisabled] = useState(false);
  const { addMessage } = useContext(ChatContext);
  const [randomQuestions, setRandomQuestions] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

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

  useEffect(() => {
    setRandomQuestions(getRandomQuestion(4));
  }, [props.character]);

  useEffect(() => {
    const messages: IMessage[] = props.chat?.messages.map((msg) => ({
      _id: msg.id ? msg.id : Math.random().toString(),
      text: msg.content,
      createdAt: new Date(msg.created_at ? msg.created_at : Date.now()),
      user: {
        _id: msg.sender === "user" ? 1 : 2,
        name: msg.sender === "user" ? "User" : props.character.name,
        avatar:
          msg.sender === "user"
            ? undefined
            : () => (
                <CharacterAvatar
                  image={props.character.image}
                  name={props.character.name}
                  size={35}
                />
              ),
      },
    }));
    console.log(messages);
    // REVERSE THE MESSAGES
    setMessages(messages.reverse());
  }, []);

  const { setCredits, credits } = useContext(UserDataContext);

  useEffect(() => {
    if (credits === 0) {
      setSendDisabled(true);
      setError("credits");
    } else if (error === "credits") {
      setSendDisabled(false);
      setError("");
    }
  }, [credits]);

  const onSend = useCallback((messages: IMessage[] = []) => {
    if (sendDisabled) return;
    if (error === "credits") return;
    if (error === "network") {
      setError("");
    }

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    addMessage(props.chat.id, { sender: "user", content: messages[0].text });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    setSendDisabled(true);
    setTimeout(() => {
      setLoading(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 1000);

    charactersService
      .askQuestion(props.character.name, messages[0].text, props.chat.id)
      .then(({ data }) => {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [
            {
              _id: Math.random().toString(),
              text: data.answer,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: props.character.name,
                avatar: () => (
                  <CharacterAvatar
                    image={props.character.image}
                    name={props.character.name}
                    size={30}
                  />
                ),
              },
            },
          ])
        );

        addMessage(props.chat.id, {
          sender: "character",
          content: data.answer,
        });

        // CREDITS
        // setCredits(credits - 1);
        setCredits(data.credits);

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        checkReview();
      })
      .catch((err) => {
        const errorCode = err.response?.data?.code;
        if (errorCode === "credits") {
          setError("credits");
          setSendDisabled(true);
        } else {
          setError("network");
        }
        console.log(errorCode);
        // setError(errorCode);
      })
      .finally(() => {
        setSendDisabled(false);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "black" }}>
      <VStack backgroundColor={"black"} height={"100%"}>
        {/* HEADER */}
        <ChatHeader
          selectedCharacter={props.character}
          handleReturn={() => navigation.goBack()}
        />
        <GiftedChat
          keyboardShouldPersistTaps={"handled"}
          isTyping={loading}
          messages={messages}
          // text={text}
          // onInputTextChanged={(text) => setText(text)}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          messagesContainerStyle={{
            paddingBottom: 10,
            transform: [
              { scaleY: messages.length === 0 && error === "" ? -1 : 1 },
            ],
          }}
          alwaysShowSend={true}
          renderChatEmpty={() =>
            error === "" && (
              <VStack flex={1}>
                <SuggestionList
                  questions={randomQuestions}
                  onPress={(question) => {
                    const newMessages: IMessage[] = [
                      {
                        _id: Math.random().toString(),
                        text: question,
                        createdAt: new Date(),
                        user: {
                          _id: 1,
                          name: "User",
                        },
                      },
                      ...messages,
                    ];
                    onSend(newMessages);
                  }}
                />
              </VStack>
            )
          }
          renderBubble={(props) => <CustomBubble {...props} />}
          renderComposer={(props) => (
            <CustomComposer {...props} getRandomQuestion={getRandomQuestion} />
          )}
          renderSend={(props) => {
            return (
              <Send {...props} disabled={!props.text || sendDisabled}>
                <View
                  style={{
                    marginRight: 5,
                    // marginBottom: 5,
                    height: 50,
                    marginLeft: 5,
                    // width: 40,
                    // margin: 5,
                  }}
                  alignItems={"center"}
                  justifyContent={"center"}
                  rounded={"xl"}
                  p={2}
                  px={3}
                  bgColor={"blue.500"}
                  opacity={props.text?.length === 0 || sendDisabled ? 0.5 : 1}
                >
                  <MaterialIcons name="arrow-upward" size={30} color="white" />
                </View>
              </Send>
            );
          }}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: "transparent",
                borderTopColor: "transparent",
                // marginBottom: 5,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 5,
                paddingBottom: 10,
              }}
            />
          )}
          // renderChatFooter={() => <OutOfCredits />}

          renderFooter={() => <CustomFooter error={error} loading={loading} />}
          // alwaysShowSend={true}
        />
      </VStack>
    </SafeAreaView>
  );
};

export default ChatLayout2;
