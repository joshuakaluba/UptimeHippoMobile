import { StringDictionary, Uri } from "../constants";
import AsyncStorageUtil from "../utilities/AsyncStorageUtil";

export default UserAccountRepository = {
  async logIn(credentials) {
    const response = await fetch(`${Uri.baseServerApi}/Authentication/Login`, {
      method: "post",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const json = await response.json();

    if (response.status != 200) {
      throw new Error(
        json.message ? json.message : StringDictionary.logInError
      );
    }
    return json;
  },

  async register(credentials) {
    const response = await fetch(
      `${Uri.baseServerApi}/Authentication/Register`,
      {
        method: "post",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const json = await response.json();

    if (response.status != 200) {
      throw new Error(
        json.message ? json.message : StringDictionary.registerError
      );
    }
    return json;
  },

  async registerPushNotifications(pushNotificationToken) {
    const token = await AsyncStorageUtil.getAccessToken();
    const response = await fetch(
      `${Uri.baseServerApi}/Authentication/RegisterPushNotifications`,
      {
        method: "post",
        body: JSON.stringify({ token: pushNotificationToken }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    const json = await response.json();

    if (response.status != 200) {
      throw new Error(
        json.message
          ? json.message
          : StringDictionary.pushNotificationActivationError
      );
    }
    return json;
  },

  async getMySettings() {
    const token = await AsyncStorageUtil.getAccessToken();
    const response = await fetch(
      `${Uri.baseServerApi}/UserSettings/GetMySettings`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    const json = await response.json();

    if (response.status != 200) {
      throw new Error(
        json.message ? json.message : StringDictionary.unableToGetUserSettings
      );
    }
    return json;
  },

  async saveUserSettings(userSettings) {
    const token = await AsyncStorageUtil.getAccessToken();
    const response = await fetch(
      `${Uri.baseServerApi}/UserSettings/UpdateUserSettings`,
      {
        method: "post",
        body: JSON.stringify(userSettings),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    const json = await response.json();

    if (response.status != 200) {
      throw new Error(
        json.message
          ? json.message
          : StringDictionary.unableToSaveSettings
      );
    }
    return json;
  },

  async unRegisterPushNotifications() {
    try {
      const pushNotificationToken = await AsyncStorageUtil.getPushNotificationToken();

      const response = await fetch(
        `${Uri.baseServerApi}/Authentication/UnRegisterPushNotifications`,
        {
          method: "post",
          body: JSON.stringify({ token: pushNotificationToken }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const json = await response.json();

      if (response.status != 200) {
        throw new Error(
          json.message
            ? json.message
            : StringDictionary.pushNotificationActivationError
        );
      }
      return json;
    } catch (error) {
      console.log(error);
      // eat the error.
    }
  }
};
