import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors, StringDictionary } from "../constants";
import * as Icon from "@expo/vector-icons";

export default class SuccessCard extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Icon.AntDesign name={"checksquare"} size={75} color={Colors.success} />
        <Text style={styles.noMonitorsDown}>
          {StringDictionary.allSitesAreUp}
        </Text>
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
  noMonitorsDown: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
    color: Colors.darkGrey
  }
});
