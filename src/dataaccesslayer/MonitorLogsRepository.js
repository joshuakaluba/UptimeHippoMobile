import { StringDictionary, Uri } from "../constants";
import { AsyncStorageUtil, Lib } from "../utilities";

export default MonitorLogsRepository = {
  async getMonitorLogsByMonitor(monitor) {
    const token = await AsyncStorageUtil.getAccessToken();
    const response = await fetch(
      `${Uri.baseServerApi}/MonitorLogs/GetMonitorLogs/${monitor.id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    const json = await response.json();

    await Lib.processServerResponse(
      response.status,
      json,
      StringDictionary.unableToGetMonitorLogs
    );

    return json;
  }
};
