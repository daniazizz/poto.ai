import { HStack, Center, VStack } from "native-base";
import React from "react";

const ConversationItem = () => {
  return (
    <HStack space="3" alignItems="center">
      <VStack space="5">
        <Center bg="primary.400" size="16"></Center>
        <Center bg="secondary.400" size="16"></Center>
        <Center bg="emerald.400" size="16"></Center>
      </VStack>

      <Center bg="primary.400" size="16"></Center>
      <Center bg="secondary.400" size="16"></Center>
      <Center bg="emerald.400" size="16"></Center>
    </HStack>
  );
};

export default ConversationItem;
