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
} from "native-base";
import MainScreen from "./app/screens/MainScreen";
import { Platform, SafeAreaView, View } from "react-native";

export default function App() {
  // 2. Use at the root of your app
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <KeyboardAvoidingView
          h={{
            base: "100%",
            lg: "auto",
          }}
          p={4}
          bgColor={"gray.600"}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <MainScreen />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
