import { VStack, Text } from "native-base";
import React from "react";

interface Props {
  message: string;
}

const error = (props: Props) => {
  return (
    <VStack p={2} justifyContent={"center"} justifyItems={"center"}>
      <Text>{props.message}</Text>
    </VStack>
  );
};

export default error;
