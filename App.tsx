import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HeaderRight from "./app/components/common/header/HeaderRight";
import HeaderTitle from "./app/components/common/header/HeaderTitle";
import SettingsScreen from "./app/screens/settings/SettingsScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import firebase from "./firebase";
import { User } from "firebase/auth";
import apiService from "./app/services/apiService";
import { Platform, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import charactersService, {
  CategoryCharacters,
  Character,
} from "./app/services/charactersService";
import userService, { AppUser } from "./app/services/userService";
import chatService, { Chat, ChatMessage } from "./app/services/chatService";
import ShopScreen from "./app/screens/shop/ShopScreen";
import {
  UserDataContext,
  ChatContext,
  CharacterContext,
} from "./app/context/context";
import ChatListScreen from "./app/screens/chat/ChatListScreen";
import ExploreScreen from "./app/screens/explore/ExploreScreen";
import ChatScreen from "./app/screens/chat/ChatScreen";
import ExploreSearchScreen from "./app/screens/explore/ExploreSearchScreen";
import CharacterScreen from "./app/screens/explore/CharacterScreen";
import Purchases from "react-native-purchases";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContactScreen from "./app/screens/shop/ContactScreen";

const nativeBaseTheme = extendTheme({
  colors: {
    primary: {
      100: "#f0f4f2",
      200: "#d2dfd7",
      300: "#b4cabc",
      400: "#97b5a2",
      500: "#79a087",
      600: "#5f866d",
      700: "#4a6855",
    },
    secondary: {
      100: "#faf4eb",
    },
    theprimary: "#F8F8F8",
    thesecondary: "#faf4eb",
  },
});

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#18181b",
    card: "#18181b",
    text: "rgb(255, 255, 255)",
  },
};

// Define your screen names and corresponding param types
export type RootTabsParamList = {
  Explore: { categories: CategoryCharacters[] };
  Chat: undefined;
  // Add more screens and their corresponding params as needed
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [bottomTabBarVisible, setBottomTabBarVisible] = useState(true);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // ICONS
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Chat") {
            return focused ? (
              <Ionicons name={"ios-chatbubbles"} size={size} color={color} />
            ) : (
              <Ionicons
                name={"ios-chatbubbles-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Explore") {
            return focused ? (
              <Ionicons name={"ios-people"} size={size} color={color} />
            ) : (
              <Ionicons name={"ios-people-outline"} size={size} color={color} />
            );
          }
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",

        headerTitleAlign: "left",
        headerStyle: {
          height: 110,
          shadowColor: "transparent",
        },
        headerRight: () => <HeaderRight />,
        tabBarStyle: {
          borderTopWidth: 0,
          marginTop: 10,
          display: bottomTabBarVisible ? "flex" : "none",
        },
      })}
      initialRouteName="Explore"
    >
      {/* TABS */}

      {/* CHAT TAB */}
      <Tab.Screen
        name="Chat"
        options={{
          headerTitle: () => <HeaderTitle title="Chats" />,
        }}
        component={ChatListScreen}
      />

      {/* EXPLORE TAB */}
      <Tab.Screen
        name="Explore"
        options={{
          headerTitle: () => <HeaderTitle title="Explore" />,
          // lazy: false,
        }}
        component={ExploreScreen}
      />
    </Tab.Navigator>
  );
};

// MAIN STACK NAVIGATION
// TO ALLOW FOR SETTINGS SCREEN

const Stack = createNativeStackNavigator();

export type MainStackParamList = {
  ChatListScreen: undefined;
  ChatScreen: { character: Character; chat?: Chat };
  ExploreSearchScreen: { characters: Character[] };
  CharacterScreen: { character: Character };
};

const MainStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Main"
        options={{
          headerTitle: "",
          headerShown: false,
        }}
        component={TabNavigation}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen
        name="ExploreSearchScreen"
        options={{ animation: "fade", headerShown: false }}
        component={ExploreSearchScreen}
      />
      <Stack.Screen name="CharacterScreen" component={CharacterScreen} />
    </Stack.Navigator>
  );
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState<User>();
  const [chats, setChats] = useState<Chat[]>([]);
  const [appUser, setAppUser] = useState<AppUser | undefined>();
  const [subscription, setSubscription] = useState<boolean>(false);
  const [credits, setCredits] = useState<number>(0);
  const [maxChats, setMaxChats] = useState<number>(0);
  const [appIsReady, setAppIsReady] = useState(false);
  const [appIsLoaded, setAppIsLoaded] = useState(false);
  const [allCategories, setAllCategories] = useState<CategoryCharacters[]>([]);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);

  // SPLASH SCREEN UNTIL APP IS READY
  // USER LOGIN
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);

        // Sign in user
        await firebase.auth
          .signInAnonymously(firebase.auth.getAuth())
          .then(async ({ user }) => {
            if (user) {
              await user
                .getIdToken()
                .then(async (idToken) => {
                  apiService.setBearerToken(idToken);
                  setUser(user);

                  await Promise.all([
                    userService.getUser().then(({ data }) => {
                      setCredits(data.user_data.credits);
                      setSubscription(data.user_data.subscription);
                      setMaxChats(data.user_data.max_chats);
                      setAppUser(data);
                    }),
                    chatService.getChats().then(({ data }) => {
                      console.log(data.length);
                      setChats(data);
                    }),
                  ]);
                })
                .finally(() => {
                  setAppIsLoaded(true);
                });
            } else {
              apiService.setBearerToken("undefined");
              setUser(undefined);
            }
          });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    appIsLoaded && SplashScreen.hideAsync();
  }, [appIsLoaded]);

  // IN APP PURCHASES
  useEffect(() => {
    if (user) {
      console.log(user.uid);
      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

      if (Platform.OS === "ios") {
        Purchases.configure({
          apiKey: "appl_PORutsiLWByHNYbeTWCcivuruhl",
          appUserID: user.uid,
        });
      } else if (Platform.OS === "android") {
        Purchases.configure({
          apiKey: "<public_google_api_key>",
          appUserID: user.uid,
        });
      }
    }
  }, [user]);

  // GET ALL CHARACTERS
  useEffect(() => {
    if (user) {
      charactersService
        .getCharactersByCategory()
        .then(({ data }) => {
          setAllCategories(data);
          const characters = data
            .map((category) => category.characters)
            .flat()
            .filter((character, index, array) => {
              // Filter out characters with duplicate names
              return (
                array.findIndex((c) => c.name === character.name) === index
              );
            });
          setAllCharacters([...new Set(characters)]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  // SET DEFAULT VALUES FOR REVIEW
  useEffect(() => {
    // AsyncStorage.clear();
    AsyncStorage.getItem("reviewed").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("reviewed", "false");
      }
    });
    AsyncStorage.getItem("actionsUntilReview").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("actionsUntilReview", "7");
      }
    });
  }, []);

  const newChat = async (characterId: string) => {
    const { data } = await chatService.newChat(characterId);
    setChats((prev) => [data, ...prev].slice(0, maxChats));
    return data;
  };

  const addMessage = (chatId: string, message: ChatMessage) => {
    setChats((prev) => {
      const newChats = prev.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, message],
          };
        } else {
          return chat;
        }
      });
      // Make sure that the chat is at the top of the list
      // const chatIndex = newChats.findIndex((chat) => chat.id === chatId);
      // const chat = newChats.splice(chatIndex, 1)[0];
      // return [chat, ...newChats];
      return newChats;
    });
  };

  return (
    <NativeBaseProvider theme={nativeBaseTheme}>
      <ChatContext.Provider value={{ chats, newChat, addMessage }}>
        <CharacterContext.Provider value={{ allCategories, allCharacters }}>
          <UserDataContext.Provider
            value={{ appUser, credits, setCredits, subscription, maxChats }}
          >
            {/* <SplashScreenContext.Provider value={{ setAppIsReady }}> */}
            <View style={{ flex: 1 }}>
              <NavigationContainer theme={navigatorTheme}>
                <MainStackNavigation />
              </NavigationContainer>
            </View>
            {/* </SplashScreenContext.Provider> */}
          </UserDataContext.Provider>
        </CharacterContext.Provider>
      </ChatContext.Provider>
    </NativeBaseProvider>
  );
}
