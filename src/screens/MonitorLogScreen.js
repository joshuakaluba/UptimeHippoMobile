import React, { Component } from "react";
import { View, StyleSheet, RefreshControl, ScrollView } from "react-native";
import { Colors, StringDictionary } from "../constants";
import { MonitorLogsRepository } from "../dataaccesslayer";
import { MonitorLogsList, NoDataCard } from "../components";
import { Lib } from "../utilities";

export default class MonitorLogScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
      headerStyle: ApplicationDefaultSettings.headerStyle,
      headerTintColor: ApplicationDefaultSettings.headerTintColor,
      headerTitleStyle: ApplicationDefaultSettings.headerTitleStyle
    };
  };

  state = {
    loading: false,
    monitorLogs: [],
    monitor: {}
  };

  _startLoading = () => {
    this.setState({ loading: true });
  };

  _endLoading = () => {
    this.setState({ loading: false });
  };

  async componentWillMount() {
    const monitor = this.props.navigation.getParam("monitor");

    this.props.navigation.setParams({
      title: monitor.name
    });

    this.setState({ monitor });
    await this._getMonitorLogsAsync(monitor);
  }

  _getMonitorLogsAsync = async monitor => {
    try {
      this._startLoading();
      const monitorLogs = await MonitorLogsRepository.getMonitorLogsByMonitor(
        monitor
      );
      this.setState({ loading: false, monitorLogs });
    } catch (error) {
      Lib.showError(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, styles.body]}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={async () => {
                  await this._getMonitorLogsAsync(this.state.monitor);
                }}
              />
            }
          >
            {this.state.monitorLogs && this.state.monitorLogs.length > 0 ? (
              <MonitorLogsList monitorLogs={this.state.monitorLogs} />
            ) : (
              this.state.loading === false && (
                <NoDataCard
                  noDataOutput={StringDictionary.noMonitorLogs}
                  icon="emoji-happy"
                />
              )
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.bodyBackgroundColor,
    flexDirection: "column"
  },
  box: {
    flex: 1
  },
  body: {
    flex: 10
  },
  card: {
    backgroundColor: Colors.white,
    paddingTop: 10,
    paddingBottom: 10,
    height: 50,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: Colors.lightGrey
  }
});
