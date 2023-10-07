import React, { useContext, useEffect } from "react";
import { Box, HStack, ScrollView, Skeleton, Text, VStack } from "native-base";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { packs } from "@constants/packs.json";
import { UserDataContext } from "@contexts/context";
import Purchases, { PurchasesStoreProduct } from "react-native-purchases";
import Package from "./components/Package";
import constants from "@constants/constants";

const ShopScreen = () => {
  const [products, setProducts] = React.useState<PurchasesStoreProduct[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedProduct, setSelectedProduct] = React.useState(1);
  const navigation = useNavigation();
  const { setCredits, credits } = useContext(UserDataContext);

  useEffect(() => {
    Purchases.getProducts(packs.map((pack) => pack.id)).then((res) => {
      // console.log(res);
      const sorted = res.sort((a, b) => {
        return Number(a.price) - Number(b.price);
      });
      setProducts(sorted);
      setLoading(false);
    });
  }, []);

  const purchase = (product: PurchasesStoreProduct) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // try {
    //   setLoading(true);
    //   Purchases.purchaseStoreProduct(product)
    //     .then((res) => {
    //       console.log(res);
    //       const pack = packs.find((pack) => pack.id === product.identifier);
    //       if (pack) {
    //         setCredits(credits + pack.amount);
    //       }
    //       navigation.goBack();
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // } catch (err: any) {
    //   console.warn(err.code, err.message);
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, width: "100%", height: "100%" }}>
      <VStack w={"100%"} h={"100%"} space={5} pb={2}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Pressable onPress={() => navigation.goBack()}>
            <Box p={2}>
              <Ionicons name="chevron-back" size={35} color="white" />
            </Box>
          </Pressable>
          <Text color={"white"} fontSize={20} fontWeight={700} mr={10}>
            Store
          </Text>
          <Box />
        </HStack>

        <ScrollView h={"100%"}>
          <VStack space={5} flexGrow={1}>
            <VStack space={2}>
              <Text
                color={"white"}
                fontSize={14}
                fontWeight={700}
                textAlign={"center"}
              >
                💡 Every user receives a <Text fontStyle={"italic"}>daily</Text>{" "}
                refill of{" "}
                <Text fontStyle={"italic"} underline>
                  10 credits
                </Text>
              </Text>
              <Text
                color={"white"}
                fontSize={14}
                fontWeight={700}
                textAlign={"center"}
              >
                💡 If you choose to do so, you can{" "}
                <Text italic underline>
                  support us
                </Text>{" "}
                by requesting an instant refill:
              </Text>
            </VStack>

            <VStack
              flex={1}
              alignItems={"center"}
              space={2}
              px={5}
              // justifyContent={"flex-end"}
            >
              {products.length > 0
                ? products.map((product, index) => {
                    const pack = packs.find(
                      (pack) => pack.id === product.identifier
                    );
                    return (
                      pack && (
                        <Package
                          key={pack.id}
                          emoji={pack.emoji}
                          name={pack.name}
                          amount={pack.amount}
                          price={product.priceString}
                          onPress={() => {
                            setSelectedProduct(index);
                            Haptics.impactAsync(
                              Haptics.ImpactFeedbackStyle.Light
                            );
                            // purchase(product.productId);
                          }}
                          selected={selectedProduct === index}
                        />
                      )
                    );
                  })
                : // SKELETON
                  packs.map((pack, index) => {
                    return (
                      <Skeleton
                        key={index}
                        height={85}
                        width={"100%"}
                        borderRadius={10}
                        mb={2}
                      />
                    );
                  })}
            </VStack>
          </VStack>
        </ScrollView>

        <VStack flexGrow={1} justifyContent={"flex-end"} space={3}>
          {/* <VStack alignItems={"center"}>
            <VStack space={2} alignItems={"flex-start"} mx={4}>
              <HStack space={2}>
                <Text>✅ </Text>
                <Text
                  color={"white"}
                  fontSize={15}
                  fontWeight={700}
                  textAlign={"center"}
                >
                  Explore 200+ historical figures
                </Text>
              </HStack>
              <HStack space={2}>
                <Text>✅ </Text>
                <Text
                  color={"white"}
                  fontSize={15}
                  fontWeight={700}
                  textAlign={"center"}
                >
                  New figures added daily
                </Text>
              </HStack>
            </VStack>
          </VStack> */}
          <Pressable
            disabled={loading}
            onPress={() => purchase(products[selectedProduct])}
          >
            <HStack
              alignItems={"center"}
              justifyContent={"space-between"}
              p={5}
              bgColor={constants.BUTTON_COLOR}
              mx={5}
              rounded={"2xl"}
              opacity={loading ? 0.5 : 1}
            >
              {loading ? (
                <Text
                  color={"white"}
                  fontSize={20}
                  fontWeight={500}
                  textAlign={"center"}
                  w={"100%"}
                >
                  Loading...
                </Text>
              ) : (
                <HStack
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text
                    color={"white"}
                    fontSize={20}
                    fontWeight={500}
                    textAlign={"right"}
                  >
                    Continue
                  </Text>
                  <HStack alignItems={"center"}>
                    <Text color={"white"} fontSize={18} fontWeight={500}>
                      {products[selectedProduct] &&
                        products[selectedProduct].priceString}
                    </Text>
                    <Ionicons name="chevron-forward" size={35} color="white" />
                  </HStack>
                </HStack>
              )}
            </HStack>
          </Pressable>
          <VStack mx={4}>
            <Text color={"white"} fontSize={14} textAlign={"center"}>
              For any issues, questions or feedback, please
            </Text>

            <Text
              color={"blue.600"}
              fontWeight={700}
              underline
              fontSize={15}
              textAlign={"center"}
              onPress={() => navigation.navigate("Contact" as never)}
            >
              contact us
            </Text>
          </VStack>
        </VStack>
        {/* <Pressable>
          <Text
            color={"white"}
            fontSize={13}
            fontWeight={500}
            textAlign={"center"}
            mb={5}
          >
            Terms and Conditions
          </Text>
        </Pressable> */}
      </VStack>
    </SafeAreaView>
  );
};

export default ShopScreen;
