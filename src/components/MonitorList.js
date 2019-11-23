import React from "react";
import PropTypes from "prop-types";
import { View } from 'react-native';
import MonitorListItem from "./MonitorListItem";

export default class MonitorList extends React.Component {
  static propTypes = {
    monitors: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onViewMonitorLogs: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View>
        {this.props.monitors.map(monitor => (
          <MonitorListItem
            key={monitor.id}
            monitor={monitor}
            onSelect={this.props.onSelect}
            onEdit={this.props.onEdit}
            onDelete={this.props.onDelete}
            onViewMonitorLogs={this.props.onViewMonitorLogs}
          />
        ))}
      </View>
    );
  }
}


