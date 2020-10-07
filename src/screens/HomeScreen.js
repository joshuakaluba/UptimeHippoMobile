import React, { Component } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Text
} from "react-native";
import { Colors, StringDictionary, ApplicationDefaultSettings } from "../constants";
import { Dashboard, SuccessCard, NoDataCard } from "../components";
import { MonitorRepository } from "../dataaccesslayer";
import { Lib } from "../utilities";

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: StringDictionary.status,
      headerStyle: ApplicationDefaultSettings.headerStyle,
      headerTintColor: ApplicationDefaultSettings.headerTintColor,
      headerTitleStyle: ApplicationDefaultSettings.headerTitleStyle
    };
  };

  state = {
    loading: false,
    lastUpdated: "",
    monitors: []
  };

  _getMonitors = async () => {
    try {
      this.setState({ monitors: [], loading: true, lastUpdated: "" });
      const monitors = await MonitorRepository.getMonitors();
      this.setState({
        monitors,
        loading: false,
        lastUpdated: Lib.getCurrentTimeFormatted()
      });
    } catch (error) {
      Lib.showError(error);
    }
  };

  async componentWillMount() {
    await this._getMonitors();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, styles.body]}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={async () => {
                  await this._getMonitors();
                }}
              />
            }
          >
            {Lib.showDashboard(this.state.monitors) ? (
              <Dashboard
                monitors={this.state.monitors}
                loading={this.state.loading}
              />
            ) : this.state.loading === false &&
              !!this.state.monitors &&
              this.state.monitors.length > 0 ? (
              <SuccessCard />
            ) : (
              <NoDataCard
                noDataOutput={StringDictionary.noMonitors}
                icon="emoji-happy"
              />
            )}
          </ScrollView>
        </View>
        {this.state.loading === false && (
          <View style={[styles.box, styles.footer, { alignItems: "center" }]}>
            <Text
              style={styles.footerText}
            >{`${StringDictionary.lastUpdated} ${this.state.lastUpdated}`}</Text>
          </View>
        )}
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
  footer: {
    flex: 1,
    marginTop: "auto",
    justifyContent: "flex-end"
  },
  footerText: {
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.darkGrey
  }
});
