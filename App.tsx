import { StatusBar } from "expo-status-bar";
import {
  NativeBaseProvider,
  Text,
  Box,
  Button,
  Avatar,
  Image,
  KeyboardAvoidingView,
  Center,
  VStack,
  HStack,
} from "native-base";
import MainScreen from "./app/screens/MainScreen";
import { Platform, SafeAreaView, View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  RouteProp,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SavedChatScreen from "./app/screens/chat/SavedChatScreen";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderRight from "./app/components/common/header/HeaderRight";
import HeaderTitle from "./app/components/common/header/HeaderTitle";
import { Character } from "./app/services/charactersService";
import ExploreScreen from "./app/screens/explore/ExploreScreen";
import ChatListScreen from "./app/screens/chat/ChatListScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import ChatNavigation from "./app/screens/chat/ChatNavigation";
import ExploreNavigation from "./app/screens/explore/ExploreNavigation";
import Ionicons from "@expo/vector-icons/Ionicons";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(0, 0, 0)",
    // secondary: "rgb(0, 0, 0)",
    card: "rgb(0, 0, 0)",
    text: "rgb(255, 255, 255)",
    primary: "rgb(255, 255, 255)",
  },
};

// Define your screen names and corresponding param types
export type RootTabsParamList = {
  Explore: undefined;
  Chat: undefined;
  // Add more screens and their corresponding params as needed
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        padding: 5,
      }}
      screenOptions={({ route }) => ({
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
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",

        headerTitleAlign: "left",
        headerStyle: {
          height: 110,
          // borderColor: "transparent",
          shadowColor: "transparent",
        },
        headerRight: () => <HeaderRight />,
        tabBarStyle: {
          borderTopWidth: 0,
        },
      })}
      initialRouteName="Explore"
    >
      <Tab.Screen
        name="Chat"
        component={ChatNavigation}
        options={{
          headerTitle: () => <HeaderTitle title="Chats" />,
        }}
      />

      <Tab.Screen
        name="Explore"
        component={ExploreNavigation}
        options={{
          headerTitle: () => <HeaderTitle title="Explore" />,
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer theme={MyTheme}>
        {/* <KeyboardAvoidingView
          h={"100%"}
          bgColor={"black"}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        > */}

        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{ headerShown: true }}
        >
          <Stack.Screen
            name="Main"
            component={TabNavigation}
            options={{
              headerTitle: "",
              headerShown: false,
            }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
        {/* </KeyboardAvoidingView> */}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
