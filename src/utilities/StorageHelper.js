import { AsyncStorage } from "react-native";

const TOKEN_STORAGE_KEY = "TOKEN_STORAGE_KEY_";
const USER_STORAGE_KEY = "USER_STORAGE_KEY";
const PUSH_NOTIFICATION_KEY = "PUSH_NOTIFICATION_KEY";

export default StorageHelper = {
  async saveToken(user) {
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, user.accessToken);
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  async savePushNotificationToken(token) {
    await AsyncStorage.setItem(PUSH_NOTIFICATION_KEY, token);
  },

  async getPushNotificationToken() {
    const token = await AsyncStorage.getItem(PUSH_NOTIFICATION_KEY);
    return token;
  },

  async getUser() {
    const user = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return JSON.parse(user);
  },

  async getAccessToken() {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    return token;
  },

  async clear() {
    console.log("StorageHelper.clear() - Clearing AsyncStorage");
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    await AsyncStorage.removeItem(PUSH_NOTIFICATION_KEY);
  },

  async validTokenExists() {
    let token = await this.getAccessToken();
    return token != null && token.length > 0 ? true : false;
  }
};
