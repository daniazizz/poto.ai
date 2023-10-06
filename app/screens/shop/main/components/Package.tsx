import React from "react";
import { VStack, HStack, Pressable, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

interface PackageProps {
  name: string;
  amount: number;
  emoji?: string;
  // description: string;
  price: string;
  onPress: () => void;
  selected: boolean;
  loading?: boolean;
}

const Package = (props: PackageProps) => {
  return (
    <Pressable style={{ width: "100%" }} onPress={props.onPress}>
      <HStack
        bgColor={"gray.800"}
        rounded={"2xl"}
        p={4}
        px={5}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderWidth={4}
        borderColor={props.selected ? "blue.600" : "transparent"}
      >
        <HStack space={3} alignItems={"center"}>
          {props.emoji && (
            <Text color={"white"} fontSize={25} fontWeight={700}>
              {props.emoji}
            </Text>
          )}
          <Text color={"white"} fontSize={18} fontWeight={500}>
            {props.name}
          </Text>
        </HStack>
        <VStack>
          <HStack alignItems={"center"} space={1}>
            <Text color={"white"} fontSize={18} fontWeight={700}>
              {props.amount}
            </Text>
            <MaterialIcons name="confirmation-num" size={18} color="white" />
          </HStack>
          <Text
            color={"white"}
            fontSize={16}
            fontWeight={400}
            textAlign={"right"}
          >
            {props.price}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default Package;
