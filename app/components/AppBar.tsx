import { Avatar, Box, Divider, HStack, Heading, Text } from "native-base";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Logo from "./common/logo";

const AppBar = () => {
  return (
    <>
      <HStack
        height={75}
        alignItems={"center"}
        justifyContent={"space-between"}
        py={4}
      >
        <Logo width={125} height={60} />

        {/* <Heading color={"white"} fontSize={"2xl"}>
          Explore
        </Heading> */}

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
          <MaterialIcons name="settings" size={25} color="white" />
        </HStack>
      </HStack>
    </>
  );
};

export default AppBar;
