import constants from "@constants/constants";
import { Avatar } from "native-base";
import { InterfaceAvatarProps } from "native-base/lib/typescript/components/composites/Avatar/types";
import React from "react";
import FastImage from "react-native-fast-image";

interface Props extends InterfaceAvatarProps {
  name: string;
  image?: string;
}

const CharacterAvatar = (props: Props) => {
  return (
    <Avatar
      style={props.style}
      size={props.size}
      bgColor={constants.SECUNDARY_COLOR}
    >
      {props.image ? (
        <FastImage
          source={{
            uri: props.image,
          }}
          style={{ width: "100%", height: "100%", borderRadius: 100 }}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        props.name[0]
      )}
    </Avatar>
  );
};

export default CharacterAvatar;
