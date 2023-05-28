import { Avatar, Box, Image, StyledProps } from "native-base";
import { InterfaceAvatarProps } from "native-base/lib/typescript/components/composites/Avatar/types";
import React from "react";
import { ViewProps } from "react-native";

interface Props extends InterfaceAvatarProps {
  name: string;
  image?: string;
}

const CharacterAvatar = (props: Props) => {
  return (
    <Avatar
      style={props.style}
      size={props.size}
      source={{
        uri: props.image,
      }}
    >
      {props.name[0]}
    </Avatar>
  );
};

export default CharacterAvatar;
