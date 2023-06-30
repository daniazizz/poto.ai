import apiService from "./apiService";

const endpoint = "/get_me";

export interface UserData {
  credits: number;
  subscription: boolean;
  max_chats: number;
}

export interface AppUser {
  id: number;
  username: string;
  user_data: UserData;
}

const getUser = () => {
  return apiService.instance.get<AppUser>(endpoint);
};

export default {
  getUser,
};
