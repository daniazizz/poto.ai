import {
  Center,
  VStack,
  Heading,
  Input,
  Text,
  Button,
  KeyboardAvoidingView,
} from "native-base";
import { Platform } from "react-native";

const Example = () => {
  return (
    <KeyboardAvoidingView
      h={{
        base: "400px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Center>
        <VStack flex="1" justifyContent="flex-end" w="100%" maxW="300">
          <Heading mb="3">Forgot Password</Heading>
          <Text color="muted.400">
            Not to worry! Enter email address associated with your account and
            we’ll send a link to reset your password.
          </Text>
          <Button mb="4">Proceed</Button>
        </VStack>
        <Input placeholder="Email Address" mt="10" mb="4" />
      </Center>
    </KeyboardAvoidingView>
  );
};

export default Example;
