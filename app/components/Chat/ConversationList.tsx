import React from "react";
import ConversationItem from "./ConversationItem";
import { VStack } from "native-base";

const convs = [
  {
    name: "ai",
    messages:
      "Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Phasellus magna. Praesent ut ligula non mi varius sagittis. Fusce a quam. Fusce convallis metus id felis luctus adipiscing.",
  },
  {
    name: "user",
    messages:
      "Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Phasellus magna. Praesent ut ligula non mi varius sagittis. Fusce a quam. Fusce convallis metus id felis luctus adipiscing.",
  },
  {
    name: "ai",
    messages:
      "Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Phasellus magna. Praesent ut ligula non mi varius sagittis. Fusce a quam. Fusce convallis metus id felis luctus adipiscing.",
  },
  {
    name: "user",
    messages:
      "Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Phasellus magna. Praesent ut ligula non mi varius sagittis. Fusce a quam. Fusce convallis metus id felis luctus adipiscing.",
  },
  {
    name: "ai",
    messages:
      "Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Phasellus magna. Praesent ut ligula non mi varius sagittis. Fusce a quam. Fusce convallis metus id felis luctus adipiscing.",
  },
];

const ConversationList = () => {
  return (
    <VStack space="5">
      {convs.map((conv, index) => (
        <ConversationItem key={index} />
      ))}
    </VStack>
  );
};

export default ConversationList;
