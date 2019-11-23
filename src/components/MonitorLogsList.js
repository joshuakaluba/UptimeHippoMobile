import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import MonitorLogsListItem from "./MonitorLogsListItem";

export default class MonitorLogsList extends React.Component {
  static propTypes = {
    monitorLogs: PropTypes.array.isRequired
  };

  render() {
    return (
      <View>
        {this.props.monitorLogs.map(monitorLog => (
          <MonitorLogsListItem key={monitorLog.id} monitorLog={monitorLog} />
        ))}
      </View>
    );
  }
}
