import { View, Text, Box } from "native-base";
import React from "react";

interface Props {
  title: string;
}

const HeaderTitle = (props: Props) => {
  return (
    <Text fontSize={24} fontWeight={"bold"} color={"white"}>
      {props.title}
    </Text>
  );
};

export default HeaderTitle;
