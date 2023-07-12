import {
  VStack,
  HStack,
  Box,
  Text,
  Pressable,
  Input,
  Button,
  FormControl,
  TextArea,
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import storeService, { Issue } from "../../services/storeService";

const isValidEmail = (email: string) => {
  // Basic email validation, you can use a more comprehensive regex or library
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const ContactScreen = () => {
  const navigation = useNavigation();

  const [issue, setIssue] = useState<Issue>({
    email: "",
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const validateForm = () => {
    const { email, title, content } = issue;
    const errors = {
      email: "",
      title: "",
      content: "",
    };

    // Validate email
    if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }

    // Validate title
    if (!title) {
      errors.title = "Title is required";
    }

    // Validate content
    if (!content) {
      errors.content = "Content is required";
    }

    setErrors(errors);
    console.log(errors);

    return Object.values(errors).every((err) => err.length === 0);
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      // Form is valid, submit the issue or perform desired actions
      setLoading(true);
      storeService
        .sendIssue(issue)
        .then((res) => {
          console.log(res);
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setNetworkError(true);
        })
        .finally(() => {
          setLoading(false);
        });
      console.log("Submitting issue:", issue);
    }
  };
  console.log("contact screen");

  return (
    <SafeAreaView style={{ flex: 1, width: "100%", height: "100%" }}>
      <VStack w={"100%"} flexGrow={1} space={5}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Pressable onPress={() => navigation.goBack()}>
            <Box p={2}>
              <Ionicons name="chevron-back" size={35} color="white" />
            </Box>
          </Pressable>
          <Text color={"white"} fontSize={20} fontWeight={700} mr={10}>
            Contact Us
          </Text>
          <Box />
        </HStack>

        {/* FORM */}
        <KeyboardAvoidingView behavior={"padding"} height={"4/5"}>
          <VStack flexGrow={1}>
            <ScrollView>
              <VStack
                px={5}
                w={"100%"}
                flexGrow={1}
                alignItems={"center"}
                space={2}
              >
                {/* EMAIL */}
                <FormControl isRequired isInvalid={errors.email.length > 0}>
                  <FormControl.Label
                    _text={{
                      bold: true,
                      fontSize: "lg",
                      color: "white",
                    }}
                  >
                    Email
                  </FormControl.Label>
                  <Input
                    keyboardType="email-address"
                    autoComplete="email"
                    maxLength={100}
                    fontSize={"md"}
                    color={"white"}
                    focusOutlineColor={"gray.400"}
                    borderColor={"gray.700"}
                    keyboardAppearance="dark"
                    onChangeText={(value) =>
                      setIssue({ ...issue, email: value })
                    }
                  />
                  {errors.email.length > 0 && (
                    <FormControl.ErrorMessage>
                      {errors.email}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                {/* TITLE */}
                <FormControl isRequired isInvalid={errors.title.length > 0}>
                  <FormControl.Label
                    _text={{
                      bold: true,
                      fontSize: "lg",
                      color: "white",
                    }}
                  >
                    Title
                  </FormControl.Label>
                  <Input
                    maxLength={100}
                    fontSize={"md"}
                    color={"white"}
                    focusOutlineColor={"gray.400"}
                    borderColor={"gray.700"}
                    keyboardAppearance="dark"
                    onChangeText={(value) =>
                      setIssue({ ...issue, title: value })
                    }
                  />
                  {errors.title.length > 0 && (
                    <FormControl.ErrorMessage>
                      {errors.title}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                {/* CONTENT */}
                <FormControl isRequired isInvalid={errors.content.length > 0}>
                  <FormControl.Label
                    _text={{
                      bold: true,
                      fontSize: "lg",
                      color: "white",
                    }}
                  >
                    Description
                  </FormControl.Label>
                  <TextArea
                    color={"white"}
                    fontSize={"md"}
                    placeholder=""
                    autoCompleteType={"off"}
                    maxLength={1000}
                    minHeight={200}
                    borderColor={"gray.700"}
                    focusOutlineColor={"gray.400"}
                    keyboardAppearance="dark"
                    onChangeText={(value) =>
                      setIssue({ ...issue, content: value })
                    }
                  />
                  {errors.content.length > 0 && (
                    <FormControl.ErrorMessage>
                      {errors.content}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
              </VStack>
            </ScrollView>
          </VStack>
        </KeyboardAvoidingView>
      </VStack>
      {/* SUBMIT */}
      <VStack flexGrow={1} justifyContent={"flex-end"}>
        <Pressable
          w={"full"}
          onPress={handleSubmit}
          disabled={loading || success}
        >
          <HStack
            alignItems={"center"}
            justifyContent={"center"}
            p={5}
            bgColor={"blue.600"}
            mx={5}
            rounded={"2xl"}
            opacity={loading || success ? 0.7 : 1}
          >
            <Text
              color={"white"}
              fontSize={20}
              fontWeight={500}
              textAlign={"right"}
            >
              {loading
                ? "Loading..."
                : success
                ? "Submitted!"
                : networkError
                ? "Network Error"
                : "Submit"}
            </Text>
          </HStack>
        </Pressable>
      </VStack>
    </SafeAreaView>
  );
};

export default ContactScreen;
