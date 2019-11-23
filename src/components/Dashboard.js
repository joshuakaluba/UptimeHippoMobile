import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { Colors, StringDictionary } from "../constants";
import OfflineSitesList from "./OfflineSitesList";

export default class Dashboard extends React.Component {
  static propTypes = {
    monitors: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };

  /**
   * if "lastMonitorSuccess": true, then site is online else  site is offline
   *
   * @param status which status to check
   */
  _getNumberOfCurrentlySitesStatus = status => {
    if (!!this.props.monitors == false && this.props.monitors.length < 0) {
      return 0;
    }
    return this.props.monitors.filter(monitor => {
      return monitor.lastMonitorSuccess === status;
    }).length;
  };

  _getOfflineMonitors = monitors => {
    return monitors.filter(monitor => {
      return monitor.lastMonitorSuccess === false;
    });
  };

  render() {
    return (
      <View>
        <View style={styles.card}>
          <Text style={styles.cardHeaderText}>
            {StringDictionary.currentlyOffline}
          </Text>
          <Text style={[styles.cardBodyText, { color: Colors.danger }]}>
            {this._getNumberOfCurrentlySitesStatus(false)}
          </Text>
          {this._getNumberOfCurrentlySitesStatus(false) > 0 && (
            <OfflineSitesList
              monitors={this._getOfflineMonitors(this.props.monitors)}
            />
          )}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardHeaderText}>
            {StringDictionary.currentlyOnline}
          </Text>
          <Text style={[styles.cardBodyText, { color: Colors.success }]}>
            {this._getNumberOfCurrentlySitesStatus(true)}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardHeaderText}>{StringDictionary.sites}</Text>
          <Text style={styles.cardBodyText}>
            {this.props.monitors ? this.props.monitors.length : "0"}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: Colors.lightGrey
  },
  cardHeaderText: {
    color: Colors.darkGrey,
    fontWeight: "bold"
  },
  cardBodyText: {
    fontSize: 30,
    fontWeight: "bold"
  }
});
