import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Linking } from "react-native";
import { Menu, Divider } from "react-native-paper";
import * as Icon from "@expo/vector-icons";
import { Col, Grid, Row } from "react-native-easy-grid";
import { StringDictionary, Colors, MonitorTypes } from "../constants";
import Validator from "validator";

export default class MonitorListItem extends React.Component {
  static propTypes = {
    monitor: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onViewMonitorLogs: PropTypes.func.isRequired
  };

  state = {
    menuVisible: false
  };

  _openMenu = () => this.setState({ menuVisible: true });

  _closeMenu = () => this.setState({ menuVisible: false });

  _onEdit = () => {
    this.props.onEdit(this.props.monitor);
    this._closeMenu();
  };

  _onSelect = () => {
    this.props.onSelect(this.props.monitor);
    this._closeMenu();
  };

  _onDelete = () => {
    this.props.onDelete(this.props.monitor);
    this._closeMenu();
  };

  _onViewMonitorLogs = () => {
    this.props.onViewMonitorLogs(this.props.monitor);
    this._closeMenu();
  };

  _openUrl = () => {
    try {
      if (Validator.isURL(this.props.monitor.url)) {
        Linking.openURL(this.props.monitor.url);
      }
    } catch (error) {
      //do nothing
    }
  };

  render() {
    return (
      <View style={styles.card}>
        <Grid>
          <Row>
            <Col size={5}>
              <Text
                style={{
                  fontWeight: "700",
                  color:
                    this.props.monitor.lastMonitorSuccess === true
                      ? Colors.darkGrey
                      : Colors.danger
                }}
              >
                {this.props.monitor.name}
              </Text>
            </Col>
            <Col size={1}>
              <View style={{ alignItems: "flex-end" }}>
                <Menu
                  visible={this.state.menuVisible}
                  onDismiss={this._closeMenu}
                  anchor={
                    <Icon.Entypo
                      name={"dots-three-vertical"}
                      onPress={this._openMenu}
                      size={20}
                    />
                  }
                >
                  <Menu.Item
                    onPress={this._onViewMonitorLogs}
                    title={StringDictionary.viewMonitorLogs}
                  />
                  <Divider />
                  <Menu.Item
                    onPress={this._onEdit}
                    title={StringDictionary.edit}
                  />
                  <Divider />
                  <Menu.Item
                    onPress={this._onDelete}
                    title={StringDictionary.delete}
                  />
                </Menu>
              </View>
            </Col>
          </Row>
          <Row>
            <Text style={styles.urlText} onPress={this._openUrl}>
              {this.props.monitor.url}
            </Text>
          </Row>
          <Row>
            <Col size={6}>
              <Text>
                {MonitorTypes[this.props.monitor.type].value}
                {this.props.monitor.type === 1 &&
                  `: ${this.props.monitor.keyWord}`}
                {this.props.monitor.type === 3 &&
                  `: ${this.props.monitor.port}`}
              </Text>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: Colors.lightGrey
  },
  urlText: {
    color: Colors.primary,
    marginBottom: 5
  }
});
