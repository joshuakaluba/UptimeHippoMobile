import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "../constants";
import * as Icon from "@expo/vector-icons";
import PrimaryButton from "./PrimaryButton";
import PropTypes from "prop-types";

export default class NoDataCard extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    noDataOutput: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.card}>
        <Icon.Entypo name={this.props.icon} size={35} color={Colors.accent} />
        <Text style={styles.noRecords}>{this.props.noDataOutput}</Text>
        {this.props.noDataActionCall && this.props.noDataActionTitle && (
          <PrimaryButton
            onPress={() => {
              this.props.noDataActionCall();
            }}
            title={this.props.noDataActionTitle}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 50,
    paddingBottom: 50,
    borderColor: Colors.lightGrey,
    borderWidth: 2,
    borderRadius: 12
  },
  noRecords: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
    color: Colors.darkGrey
  }
});
