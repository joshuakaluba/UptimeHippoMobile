import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import UserAccountRepository from "../dataaccesslayer/UserAccountRepository";
import AsyncStorageUtil from "./AsyncStorageUtil";

export default PushNotificationUtil = {
  async registerForPushNotificationsAsync() {
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        return;
      }

      let token = await Notifications.getExpoPushTokenAsync();
      await UserAccountRepository.registerPushNotifications(token);
      await AsyncStorageUtil.savePushNotificationToken(token);
    } catch (error) {
      console.log(error);
    }
  }
};
