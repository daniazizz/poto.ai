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
