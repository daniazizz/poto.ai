import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HeaderRight from "./app/components/common/header/HeaderRight";
import HeaderTitle from "./app/components/common/header/HeaderTitle";
import SettingsScreen from "./app/screens/settings/SettingsScreen";
import ChatNavigation from "./app/screens/chat/ChatNavigation";
import ExploreNavigation from "./app/screens/explore/ExploreNavigation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createContext, useEffect, useState } from "react";
import firebase from "./firebase";
import { User } from "firebase/auth";
import apiService from "./app/services/apiService";
import { View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { CategoryCharacters } from "./app/services/charactersService";
import userService, { AppUser } from "./app/services/userService";
import chatService, { Chat, ChatMessage } from "./app/services/chatService";
import ShopScreen from "./app/screens/shop/ShopScreen";
import {
  UserDataContext,
  ChatContext,
  BottomBarContext,
} from "./app/context/context";

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
    <BottomBarContext.Provider
      value={{ bottomTabBarVisible, setBottomTabBarVisible }}
    >
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
                <Ionicons
                  name={"ios-people-outline"}
                  size={size}
                  color={color}
                />
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
          component={ChatNavigation}
        />

        {/* EXPLORE TAB */}
        <Tab.Screen
          name="Explore"
          options={{
            headerTitle: () => <HeaderTitle title="Explore" />,
            // lazy: false,
          }}
          component={ExploreNavigation}
        />
      </Tab.Navigator>
    </BottomBarContext.Provider>
  );
};

// MAIN STACK NAVIGATION
// TO ALLOW FOR SETTINGS SCREEN

const Stack = createNativeStackNavigator();

interface MainStackNavigationProps {
  user: User;
}

const MainStackNavigation = (props: MainStackNavigationProps) => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: true }}
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

  // SPLASH SCREEN UNTIL APP IS READY
  // USER LOGIN
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);

        await firebase.auth
          .signInAnonymously(firebase.auth.getAuth())
          .then(({ user }) => {
            if (user) {
              user.getIdToken().then((idToken) => {
                apiService.setBearerToken(idToken);
                setUser(user);
                // Get the user's chats
                chatService.getChats().then(({ data }) => {
                  setChats(data);
                  // console.log(data);
                });
                // Get the user's data
                userService.getUser().then(({ data }) => {
                  console.log(data);
                  setCredits(data.user_data.credits);
                  setSubscription(data.user_data.subscription);
                  setMaxChats(data.user_data.max_chats);
                  setAppUser(data);
                });
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
        setAppIsLoaded(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    true && appIsLoaded && SplashScreen.hideAsync();
  }, [appIsLoaded]);

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
      return newChats;
    });
  };

  return (
    <NativeBaseProvider theme={nativeBaseTheme}>
      <UserDataContext.Provider
        value={{ appUser, credits, setCredits, subscription, maxChats }}
      >
        <ChatContext.Provider value={{ chats, newChat, addMessage }}>
          {/* <SplashScreenContext.Provider value={{ setAppIsReady }}> */}
          <View style={{ flex: 1 }}>
            <NavigationContainer theme={navigatorTheme}>
              {user && <MainStackNavigation user={user} />}
            </NavigationContainer>
          </View>
          {/* </SplashScreenContext.Provider> */}
        </ChatContext.Provider>
      </UserDataContext.Provider>
    </NativeBaseProvider>
  );
}
