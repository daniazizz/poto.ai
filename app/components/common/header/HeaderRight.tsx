import { HStack, Text, Box, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/core";

const HeaderRight = () => {
  const navigation = useNavigation();
  return (
    <HStack space="3" alignItems="center">
      <Box
        bg="gray.600"
        p={2}
        px={3}
        borderRadius={"40%"}
        display={"flex"}
        flexDirection={"row"}
        style={{ gap: 10 }}
        alignItems={"center"}
      >
        <Text fontSize="sm" color={"white"} fontWeight={700}>
          999
        </Text>
        {/* <MaterialIcons name="auto-awesome" size={24} color="white" /> */}
        <MaterialIcons name="confirmation-num" size={18} color="white" />
      </Box>

      {/* <MaterialIcons name="account-circle" size={50} color="white" /> */}
      <Pressable
        p={2}
        onPress={() => navigation.navigate({ name: "Settings" } as never)}
      >
        <MaterialIcons name="settings" size={25} color="white" />
      </Pressable>
    </HStack>
  );
};

export default HeaderRight;
