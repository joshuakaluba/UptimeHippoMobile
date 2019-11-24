import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  DeviceEventEmitter
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { Col, Grid } from "react-native-easy-grid";
import { NoDataCard, MonitorList, MonitorInputDialog } from "../components";
import { MonitorRepository } from "../dataaccesslayer";
import { Lib } from "../utilities";
import { Snackbar } from "react-native-paper";
import {
  Colors,
  StringDictionary,
  ApplicationDefaultSettings,
  DeviceEvents
} from "../constants";

const DEFAULT_NEW_MONITOR = {
  url: "",
  name: "",
  interval: 0,
  type: 0,
  keyWord: "",
  port: 80
};

export default class ActivitiesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: StringDictionary.monitors,
      headerStyle: ApplicationDefaultSettings.headerStyle,
      headerTintColor: ApplicationDefaultSettings.headerTintColor,
      headerTitleStyle: ApplicationDefaultSettings.headerTitleStyle,
      headerRight: (
        <Grid style={{ marginBottom: -3, marginRight: 10 }}>
          <Col>
            <Icon.Ionicons
              onPress={() => {
                params.showAddNewMonitorDialog();
              }}
              name={"md-add"}
              size={35}
              color={Colors.headerTintColor}
            />
          </Col>
        </Grid>
      )
    };
  };

  state = {
    loading: true,
    monitors: [],
    showNewMonitorDialog: false,
    showEditMonitorDialog: false,
    newMonitor: DEFAULT_NEW_MONITOR,
    selectedMonitor: DEFAULT_NEW_MONITOR,
    showSaveConfirmationAlert: false
  };

  async componentWillMount() {
    this.props.navigation.setParams({
      showAddNewMonitorDialog: this._showAddNewMonitorDialog.bind(this)
    });

    DeviceEventEmitter.addListener(DeviceEvents.getMonitors, async () => {
      await this._getMonitors();
    });

    await this._getMonitors();
  }

  _endLoading = () => this.setState({ loading: false });

  _showAddNewMonitorDialog = () => {
    this.setState({ showNewMonitorDialog: true });
  };

  _showEditMonitorDialog = () => {
    this.setState({ showEditMonitorDialog: true });
  };

  _hideNewMonitorDialog = () =>
    this.setState({
      showNewMonitorDialog: false,
      newMonitor: DEFAULT_NEW_MONITOR
    });

  _hideEditMonitorDialog = () =>
    this.setState({
      showEditMonitorDialog: false,
      selectedMonitor: DEFAULT_NEW_MONITOR
    });

  _getMonitors = async () => {
    try {
      this.setState({ monitors: [], loading: true });
      const monitors = await MonitorRepository.getMonitors();
      console.log(monitors);
      this.setState({ monitors, loading: false, showNewMonitorDialog: false });
    } catch (error) {
      Lib.showError(error);
    }
  };

  _deleteMonitor = async monitor => {
    Alert.alert(
      StringDictionary.delete,
      `${StringDictionary.deleteConfirmation}${monitor.name}`,
      [
        {
          text: StringDictionary.cancel,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: StringDictionary.ok,
          onPress: async () => {
            await MonitorRepository.deleteMonitor(monitor);
            await this._getMonitors();
          }
        }
      ],
      { cancelable: true }
    );
  };

  _showEditMonitorDialog = monitor => {
    this.setState({ selectedMonitor: monitor, showEditMonitorDialog: true });
  };

  _showSelectMonitorDialog = monitor => {
    // TODO, currently not doing anything. Will need for V2 of UI
    console.log(monitor);
  };

  _showSuccessSnackBar = () =>
    this.setState({ showSaveConfirmationAlert: true });

  _saveNewMonitor = async () => {
    this.setState({ loading: true });
    await MonitorRepository.createNewMonitor(this.state.newMonitor);
    await this._getMonitors();
    this._hideNewMonitorDialog();
    this._showSuccessSnackBar();
  };

  _editSelectedMonitor = async () => {
    this.setState({ loading: true });
    await MonitorRepository.updateMonitor(this.state.selectedMonitor);
    await this._getMonitors();
    this._hideEditMonitorDialog();
    this._showSuccessSnackBar();
  };

  _viewMonitorLogs = monitor => {
    this.props.navigation.push("MonitorLogs", { monitor });
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
                  await this._getMonitors();
                }}
              />
            }
          >
            {this.state.monitors && this.state.monitors.length > 0 ? (
              <MonitorList
                monitors={this.state.monitors}
                onSelect={this._showSelectMonitorDialog.bind(this)}
                onEdit={this._showEditMonitorDialog.bind(this)}
                onDelete={this._deleteMonitor.bind(this)}
                onViewMonitorLogs={this._viewMonitorLogs.bind(this)}
              />
            ) : (
              this.state.loading === false && (
                <NoDataCard
                  noDataOutput={StringDictionary.noMonitors}
                  icon="emoji-sad"
                  noDataActionCall={this._showAddNewMonitorDialog.bind(this)}
                  noDataActionTitle={StringDictionary.addNewMonitor}
                />
              )
            )}
          </ScrollView>
        </View>

        <MonitorInputDialog
          monitor={this.state.newMonitor}
          loading={this.state.loading}
          onChangeNameText={value =>
            this.setState({
              newMonitor: { ...this.state.newMonitor, name: value }
            })
          }
          onChangeUrlText={value =>
            this.setState({
              newMonitor: { ...this.state.newMonitor, url: value }
            })
          }
          onChangeMonitorType={value =>
            this.setState({
              newMonitor: { ...this.state.newMonitor, type: value }
            })
          }
          onChangeMonitorInterval={value =>
            this.setState({
              newMonitor: { ...this.state.newMonitor, interval: value }
            })
          }
          onChangeKeyWord={value =>
            this.setState({
              newMonitor: { ...this.state.newMonitor, keyWord: value }
            })
          }
          onChangePort={value =>
            this.setState({
              newMonitor: { ...this.state.newMonitor, port: value }
            })
          }
          saveMonitorActionPress={this._saveNewMonitor.bind(this)}
          onDismiss={this._hideNewMonitorDialog.bind(this)}
          visible={this.state.showNewMonitorDialog}
          title={StringDictionary.addNewMonitor}
          primaryButtonText={StringDictionary.addNewMonitor}
        />

        <MonitorInputDialog
          monitor={this.state.selectedMonitor}
          loading={this.state.loading}
          onChangeNameText={value =>
            this.setState({
              selectedMonitor: { ...this.state.selectedMonitor, name: value }
            })
          }
          onChangeUrlText={value =>
            this.setState({
              selectedMonitor: { ...this.state.selectedMonitor, url: value }
            })
          }
          onChangeMonitorType={value =>
            this.setState({
              selectedMonitor: { ...this.state.selectedMonitor, type: value }
            })
          }
          onChangeMonitorInterval={value =>
            this.setState({
              selectedMonitor: {
                ...this.state.selectedMonitor,
                interval: value
              }
            })
          }
          onChangeKeyWord={value =>
            this.setState({
              selectedMonitor: { ...this.state.selectedMonitor, keyWord: value }
            })
          }
          onChangePort={value =>
            this.setState({
              selectedMonitor: { ...this.state.selectedMonitor, port: value }
            })
          }
          saveMonitorActionPress={this._editSelectedMonitor.bind(this)}
          onDismiss={this._hideEditMonitorDialog.bind(this)}
          visible={this.state.showEditMonitorDialog}
          title={StringDictionary.editMonitor}
          primaryButtonText={StringDictionary.save}
        />

        <Snackbar
          visible={this.state.showSaveConfirmationAlert}
          onDismiss={() => this.setState({ showSaveConfirmationAlert: false })}
          action={{
            label: StringDictionary.dismiss,
            onPress: () => this.setState({ showSaveConfirmationAlert: false })
          }}
        >
          {StringDictionary.savedSuccessfully}
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: "column",
    backgroundColor: Colors.bodyBackgroundColor
  },
  box: {
    flex: 1
  },
  body: {
    flex: 10
  }
});
