import { HStack, Text, Box, Pressable, useTheme } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/core";
import { UserDataContext } from "../../context/context";

const HeaderRight = () => {
  const navigation = useNavigation();
  const { credits } = useContext(UserDataContext);
  const theme = useTheme();
  return (
    <HStack space="3" alignItems="center" px={4}>
      <Pressable onPress={() => navigation.navigate({ name: "Shop" } as never)}>
        <Box
          bgColor={"gray.600"}
          p={2}
          px={3}
          borderRadius={40}
          display={"flex"}
          flexDirection={"row"}
          style={{ gap: 10 }}
          alignItems={"center"}
        >
          <Text fontSize="sm" fontWeight={700} color={"white"}>
            {credits}
          </Text>
          {/* <MaterialIcons name="auto-awesome" size={24} color="white" /> */}
          <MaterialIcons name="confirmation-num" size={18} color="white" />
        </Box>
      </Pressable>

      {/* <MaterialIcons name="account-circle" size={50} color="white" /> */}
      {/* <Pressable
        p={2}
        onPress={() => navigation.navigate({ name: "Settings" } as never)}
      >
        <MaterialIcons name="settings" size={25} color="white" />
      </Pressable> */}
    </HStack>
  );
};

export default HeaderRight;
