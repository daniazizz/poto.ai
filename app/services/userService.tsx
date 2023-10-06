import { AppUser } from "@app/types/userTypes";
import apiService from "./apiService";

const endpoint = "/get_me";

const getUser = () => {
  return apiService.instance.get<AppUser>(endpoint);
};

export default {
  getUser,
};
