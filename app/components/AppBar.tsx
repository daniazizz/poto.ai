import { Avatar, Box, HStack, Heading, Text } from "native-base";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const AppBar = () => {
  return (
    <HStack
      height={75}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={4}
    >
      <Heading color={"white"} fontWeight={"900"} fontFamily={"mono"}>
        POTO.AI
      </Heading>

      <HStack space="3" alignItems="center">
        <Box
          bg="gray.600"
          p={2}
          px={3}
          borderRadius={"40%"}
          display={"flex"}
          flexDirection={"row"}
          style={{ gap: 10 }}
        >
          <Text fontSize="lg" color={"white"} fontWeight={700}>
            5
          </Text>
          <MaterialIcons name="auto-awesome" size={24} color="white" />
        </Box>

        <MaterialIcons name="account-circle" size={50} color="white" />
      </HStack>
    </HStack>
  );
};

export default AppBar;
