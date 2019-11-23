import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TextInput } from "react-native";
import { Colors } from "../constants";

export default class PrimaryFormInput extends React.Component {
  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          label={this.props.label}
          editable={this.props.editable}
          value={this.props.value}
          placeholder={this.props.placeholder ? this.props.placeholder : ""}
          onChangeText={this.props.onChangeText}
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={
            this.props.secureTextEntry ? this.props.secureTextEntry : false
          }
        ></TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    width: "100%",
    height: 45,
    backgroundColor: Colors.bodyBackgroundColor,
    textAlign: "center",
    fontSize: 15,
    marginTop: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.lightGrey,
    color: Colors.darkGrey,
    fontWeight: "700"
  }
});
