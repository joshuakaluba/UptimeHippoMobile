import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import PrimaryButton from "./PrimaryButton";
import PrimaryFormInput from "./PrimaryFormInput";
import PrimaryFormDropDown from "./PrimaryFormDropDown";
import { Dialog, Portal } from "react-native-paper";
import { StringDictionary, MonitorTypes, MonitorInterval } from "../constants";

export default class MonitorInputDialog extends React.Component {
  static propTypes = {
    monitor: PropTypes.object.isRequired,
    saveMonitorActionPress: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onChangeNameText: PropTypes.func.isRequired,
    onChangeKeyWord: PropTypes.func.isRequired,
    onChangeUrlText: PropTypes.func.isRequired,
    onChangePort: PropTypes.func.isRequired,
    onChangeMonitorType: PropTypes.func.isRequired,
    onChangeMonitorInterval: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    primaryButtonText: PropTypes.string.isRequired
  };

  _onDismiss = () => this.props.onDismiss();

  _onPrimaryButtonPress = () => {
    if (
      (this.props.monitor.type === 0 || this.props.monitor.type === 1) &&
      !this.props.monitor.url.includes("http")
    ) {
      alert(StringDictionary.pleaseIncludeProtocol);
    } else {
      this.props.saveMonitorActionPress();
    }
  };

  _validateMonitor = () =>
    this.props.monitor.name.trim().length < 1 ||
    this.props.monitor.url.trim().length < 1;

  render() {
    return (
      <Portal>
        <Dialog
          visible={this.props.visible}
          style={styles.dialogBody}
          onDismiss={this._onDismiss}
        >
          <Dialog.Content>
            <PrimaryFormInput
              label={StringDictionary.name}
              placeholder={StringDictionary.name}
              value={this.props.monitor.name}
              onChangeText={this.props.onChangeNameText}
            />
            <PrimaryFormInput
              label={StringDictionary.monitorUrl}
              placeholder={StringDictionary.monitorUrl}
              value={this.props.monitor.url}
              onChangeText={this.props.onChangeUrlText}
            />

            <PrimaryFormDropDown
              label={StringDictionary.type}
              data={MonitorTypes}
              selectedValue={this.props.monitor.type}
              onChangeDropDownSelection={this.props.onChangeMonitorType}
            />

            <PrimaryFormDropDown
              label={StringDictionary.interval}
              data={MonitorInterval}
              selectedValue={this.props.monitor.interval}
              onChangeDropDownSelection={this.props.onChangeMonitorInterval}
            />

            {this.props.monitor.type === 1 && (
              <PrimaryFormInput
                label={StringDictionary.keyWord}
                placeholder={StringDictionary.keyWordToSearchFor}
                value={this.props.monitor.keyWord}
                onChangeText={this.props.onChangeKeyWord}
              />
            )}

            {this.props.monitor.type === 3 && this.props.monitor.type !== 0 && (
              <PrimaryFormInput
                label={StringDictionary.port}
                placeholder={StringDictionary.port}
                value={`${this.props.monitor.port}`}
                onChangeText={this.props.onChangePort}
              />
            )}
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <PrimaryButton
              title={this.props.primaryButtonText}
              onPress={this._onPrimaryButtonPress}
              loading={this.props.loading}
              disabled={this._validateMonitor() || this.props.loading}
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  dialogBody: {
    paddingBottom: 10
  },
  dialogActions: {
    justifyContent: "center",
    alignItems: "center"
  }
});
