import { View, Text, Box } from "native-base";
import React from "react";

interface Props {
  title: string;
}

const HeaderTitle = (props: Props) => {
  return (
    <Text color={"white"} fontSize={24} fontWeight={"bold"}>
      {props.title}
    </Text>
  );
};

export default HeaderTitle;
