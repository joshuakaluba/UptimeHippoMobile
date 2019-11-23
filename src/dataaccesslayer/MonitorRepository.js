import { StringDictionary, Uri } from "../constants";
import { AsyncStorageUtil, Lib } from "../utilities";

export default MonitorRepository = {
  async getMonitors() {
    const token = await AsyncStorageUtil.getAccessToken();
    const response = await fetch(`${Uri.baseServerApi}/Monitors/GetMonitors`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const json = await response.json();

    await Lib.processServerResponse(
      response.status,
      json,
      StringDictionary.unableToGetMonitors
    );
    return json;
  },

  async checkMonitorStatus() {
    const token = await AsyncStorageUtil.getAccessToken();
    const response = await fetch(
      `${Uri.baseServerApi}/Monitors/CheckMonitorsStatus`,
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
      StringDictionary.unableToGetMonitors
    );
    return json;
  },

  async deleteMonitor(monitor) {
    const token = await AsyncStorageUtil.getAccessToken();
    const endPoint = `${Uri.baseServerApi}/Monitors/DeleteMonitor/${monitor.id}`;
    const response = await fetch(endPoint, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const json = await response.json();

    await Lib.processServerResponse(
      response.status,
      json,
      StringDictionary.unableToDeleteMonitor
    );
  },

  async createNewMonitor(monitor) {
    const token = await AsyncStorageUtil.getAccessToken();
    const response = await fetch(
      `${Uri.baseServerApi}/Monitors/CreateMonitor`,
      {
        method: "post",
        body: JSON.stringify(monitor),
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
      StringDictionary.unableToSaveMonitor
    );
  },

  async updateMonitor(monitor) {
    const token = await AsyncStorageUtil.getAccessToken();
    const endPoint = `${Uri.baseServerApi}/Monitors/UpdateMonitor/${monitor.id}`;
    const response = await fetch(endPoint, {
      method: "put",
      body: JSON.stringify(monitor),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const json = await response.json();

    await Lib.processServerResponse(
      response.status,
      json,
      StringDictionary.unableToSaveMonitor
    );
  }
};
