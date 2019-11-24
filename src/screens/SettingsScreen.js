import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Vibration,
  Alert,
  Text,
  ActivityIndicator,
  ScrollView
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { Colors, StringDictionary } from "../constants";
import { UserAccountRepository } from "../dataaccesslayer";
import { AsyncStorageUtil, Lib } from "../utilities";
import { PrimaryButton, PrimaryFormInput } from "../components";
import { Col, Grid } from "react-native-easy-grid";
import { CheckBox } from "react-native-elements";
import { Snackbar } from "react-native-paper";

export default class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: StringDictionary.settings,
      headerStyle: ApplicationDefaultSettings.headerStyle,
      headerTintColor: ApplicationDefaultSettings.headerTintColor,
      headerTitleStyle: ApplicationDefaultSettings.headerTitleStyle,
      headerRight: (
        <Grid style={{ marginBottom: -3, marginRight: 10 }}>
          <Col>
            <Icon.Ionicons
              onPress={() => {
                params.promptToLogout();
              }}
              name={"md-log-out"}
              size={30}
              color={Colors.headerTintColor}
            />
          </Col>
        </Grid>
      )
    };
  };

  state = {
    loading: false,
    isEditing: false,
    pushNotificationsEnabled: false,
    notificationEmailsEnabled: false,
    notificationTextMessagesEnabled: false,
    email: "",
    phoneNumber: "",
    showSaveConfirmationAlert: false
  };

  async componentWillMount() {
    this.props.navigation.setParams({
      promptToLogout: this._promptToLogout.bind(this)
    });

    await this._getMySettingsAsync();
  }

  _startLoading = () => {
    this.setState({ loading: true });
  };

  _endLoading = () => {
    this.setState({ loading: false });
  };

  _logOutAsync = async () => {
    try {
      await UserAccountRepository.unRegisterPushNotifications();
      await AsyncStorageUtil.clear();

      this.props.navigation.navigate("Auth");
    } catch (error) {
      this._endLoading();
      Lib.showError(error);
    }
  };

  _promptToLogout = async () => {
    let validToken = await AsyncStorageUtil.validTokenExists();
    if (validToken == true) {
      Alert.alert(
        StringDictionary.logout,
        StringDictionary.logoutConfirmation,
        [
          {
            text: StringDictionary.cancel,
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: StringDictionary.ok, onPress: this._logOutAsync }
        ],
        { cancelable: false }
      );
    } else {
      Vibration.vibrate(1000);
    }
  };

  _getMySettingsAsync = async () => {
    try {
      this._startLoading();
      const settings = await UserAccountRepository.getMySettings();
      this.setState(settings);
      this._endLoading();
    } catch (error) {
      Lib.showError(error);
    }
  };

  _saveSettingsAsync = async () => {
    this.setState({ loading: true });
    const settings = {
      pushNotificationsEnabled: this.state.pushNotificationsEnabled,
      notificationEmailsEnabled: this.state.notificationEmailsEnabled,
      notificationTextMessagesEnabled: this.state
        .notificationTextMessagesEnabled,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber
    };

    await UserAccountRepository.saveUserSettings(settings);

    this.setState({
      isEditing: false,
      loading: false,
      showSaveConfirmationAlert: true
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading === true && (
          <View style={[styles.box, styles.loadingContainer]}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <View style={[styles.box, styles.body]}>
          <ScrollView>
            <CheckBox
              title={StringDictionary.receivePushNotifications}
              disabled={!this.state.isEditing}
              onPress={() =>
                this.setState({
                  pushNotificationsEnabled: !this.state.pushNotificationsEnabled
                })
              }
              checked={this.state.pushNotificationsEnabled}
            />

            <CheckBox
              title={StringDictionary.receiveEmails}
              disabled={!this.state.isEditing}
              onPress={() =>
                this.setState({
                  notificationEmailsEnabled: !this.state
                    .notificationEmailsEnabled
                })
              }
              checked={this.state.notificationEmailsEnabled}
            />

            <View style={styles.formInputContainer}>
              <Text style={styles.labelText}>{this.state.email}</Text>
            </View>

            <CheckBox
              title={StringDictionary.receiveTextMessages}
              disabled={!this.state.isEditing}
              onPress={() =>
                this.setState({
                  notificationTextMessagesEnabled: !this.state
                    .notificationTextMessagesEnabled
                })
              }
              checked={this.state.notificationTextMessagesEnabled}
            />

            <View style={styles.formInputContainer}>
              {this.state.isEditing === true ? (
                <PrimaryFormInput
                  label={StringDictionary.phoneNumber}
                  value={this.state.phoneNumber}
                  placeholder={StringDictionary.phoneNumber}
                  editable={true}
                  onChangeText={value => this.setState({ phoneNumber: value })}
                />
              ) : (
                <Text style={styles.labelText}>{this.state.phoneNumber}</Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              {this.state.isEditing === false ? (
                <PrimaryButton
                  title={StringDictionary.edit}
                  onPress={() => {
                    this.setState({ isEditing: true });
                  }}
                />
              ) : (
                <PrimaryButton
                  title={StringDictionary.save}
                  disabled={this.state.loading}
                  onPress={this._saveSettingsAsync.bind(this)}
                />
              )}
            </View>
          </ScrollView>
        </View>
        <Snackbar
          visible={this.state.showSaveConfirmationAlert}
          onDismiss={() => this.setState({ showSaveConfirmationAlert: false })}
          action={{
            label: StringDictionary.dismiss,
            onPress: () => this.setState({ showSaveConfirmationAlert: false })
          }}
        >
          {StringDictionary.yourSettingsHaveBeenSaved}
        </Snackbar>
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
  card: {
    backgroundColor: Colors.scrollViewBackgroundColor,
    margin: 5,
    padding: 10
  },
  box: {
    flex: 1
  },
  body: {
    flex: 10
  },
  loadingContainer: {
    flex: 1,
    marginTop: "auto",
    paddingTop: 10,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  formInputContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  labelText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.darkGrey
  },
  buttonContainer: {
    alignItems: "center"
  }
});
