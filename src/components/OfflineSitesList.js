import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants";

export default class OfflineSitesList extends React.Component {
  static propTypes = {
    monitors: PropTypes.array.isRequired
  };

  render() {
    return (
      <View>
        {this.props.monitors.map(monitor => (
          <Text style={styles.offlineText} key={monitor.id}>
            {`${monitor.name} - ${monitor.url}`}
          </Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  offlineText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: Colors.danger
  }
});
