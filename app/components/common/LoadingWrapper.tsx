import { Box, Spinner } from "native-base";
import React from "react";

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

const LoadingWrapper = (props: Props) => {
  return (
    <Box w={"100%"} h={"100%"} position={"relative"}>
      {props.loading && (
        <Box
          position={"absolute"}
          zIndex={5}
          w={"100%"}
          h={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          bgColor={"black"}
        >
          <Box
            p={5}
            bgColor={"gray.900"}
            rounded={"lg"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Spinner size={"lg"} color={"white"} />
          </Box>
        </Box>
      )}

      {props.children}
    </Box>
  );
};

export default LoadingWrapper;
