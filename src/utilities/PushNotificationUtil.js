import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import UserAccountRepository from "../dataaccesslayer/UserAccountRepository";
import StorageHelper from "./StorageHelper";

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
      await StorageHelper.savePushNotificationToken(token);
    } catch (error) {
      console.log(error);
    }
  }
};
