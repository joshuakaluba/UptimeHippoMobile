import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { CheckBox } from "react-native-elements";
import { StringDictionary, DefaultStyles, Uri, Colors } from "../constants";
import { PrimaryButton, PrimaryFormInput } from "../components";
import { UserAccountRepository } from "../dataaccesslayer";
import { AsyncStorageUtil, PushNotificationUtil, Lib } from "../utilities";
import Validator from "validator";

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: StringDictionary.registerTitle,
    headerStyle: {
      backgroundColor: Colors.headerBackgroundColor
    },
    headerTintColor: Colors.headerTintColor,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  state = {
    loading: false,
    acceptedTerms: false,
    invalidEmail: false,
    invalidPassword: false,
    invalidConfirmPassword: false,
    email: "",
    password: "",
    fullName: ""
  };

  _registerAsync = async () => {
    try {
      if (!Validator.isEmail(this.state.email)) {
        this.setState({ invalidEmail: true });
        alert(StringDictionary.invalidEmail);
        return;
      }

      if (this.state.password.length < 6) {
        this.setState({ invalidPassword: true });
        alert(StringDictionary.invalidPassword);
        return;
      }

      if (this.state.password !== this.state.confirmPassword) {
        this.setState({ invalidConfirmPassword: true });
        alert(StringDictionary.invalidConfirmPassword);
        return;
      }

      let credentials = {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        phoneNumber: ""
      };

      this.setState({ loading: true });

      let response = await UserAccountRepository.register(credentials);

      await AsyncStorageUtil.saveToken(response);

      await PushNotificationUtil.registerForPushNotificationsAsync();

      this.props.navigation.navigate("App");

      return;
    } catch (error) {
      this.setState({ loading: false });
      Lib.showError(error);
    }

    this.setState({ loading: false });
  };

  _openPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync(Uri.privacyPolicy);
  };

  render() {
    return (
      <View
        style={[DefaultStyles.container, { backgroundColor: Colors.white }]}
      >
        <View style={DefaultStyles.mainView}>
          <PrimaryFormInput
            label={StringDictionary.email}
            placeholder={StringDictionary.email}
            editable={!this.state.loading}
            onChangeText={value => this.setState({ email: value })}
            displayValidationMessage={this.state.invalidEmail}
            validationMessage={StringDictionary.invalidEmail}
          />

          <PrimaryFormInput
            label={StringDictionary.password}
            placeholder={StringDictionary.password}
            editable={!this.state.loading}
            onChangeText={value => this.setState({ password: value })}
            displayValidationMessage={this.state.invalidPassword}
            secureTextEntry={true}
            validationMessage={StringDictionary.invalidPassword}
          />

          <PrimaryFormInput
            label={StringDictionary.confirmPassword}
            placeholder={StringDictionary.confirmPassword}
            editable={!this.state.loading}
            onChangeText={value => this.setState({ confirmPassword: value })}
            displayValidationMessage={this.state.confirmPassword}
            secureTextEntry={true}
            validationMessage={StringDictionary.invalidConfirmPassword}
          />

          <TouchableOpacity
            onPress={this._openPrivacyPolicy}
            style={DefaultStyles.textLink}
          >
            <Text style={DefaultStyles.textLinkText}>
              {StringDictionary.terms}
            </Text>
          </TouchableOpacity>

          <CheckBox
            title={StringDictionary.acceptedTerms}
            onPress={() =>
              this.setState({ acceptedTerms: !this.state.acceptedTerms })
            }
            checked={this.state.acceptedTerms}
          />
          <PrimaryButton
            title={StringDictionary.register}
            icon={"person-add"}
            onPress={this._registerAsync}
            loading={this.state.loading}
            disabled={!this.state.acceptedTerms}
          />
        </View>
      </View>
    );
  }
}
