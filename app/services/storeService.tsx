import api from "./apiService";
import { packs } from "@constants/packs.json";
import { UserData } from "@app/types/userTypes";

const endpoint = "/process_purchase";

const processPurchase = (
  receipt: string,
  purchaseType: "credits" | "subscription",
  productId: "pack1" | "pack2" | "pack3"
) => {
  const amount = packs.find((pack) => pack.id === productId)?.amount;
  return api.instance.post<UserData>(endpoint, {
    receipt: receipt,
    purchase_type: purchaseType,
    amount: amount,
  });
};

export interface Issue {
  email: string;
  title: string;
  content: string;
}

const sendIssue = (issue: Issue) => {
  return api.instance.post("/issues/", issue);
};

export default {
  processPurchase,
  sendIssue,
};
