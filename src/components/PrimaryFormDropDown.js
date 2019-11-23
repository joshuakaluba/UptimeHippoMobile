import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants";
import { Dropdown } from "react-native-material-dropdown";

export default class PrimaryFormDropDown extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    selectedValue: PropTypes.number.isRequired,
    onChangeDropDownSelection: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
  };

  componentWillMount() {
    const selectedValue = this.props.selectedValue;
    if (this.props.data && this.props.data[selectedValue]) {
      const dropDownValue = this.props.data[selectedValue].value;
      this.setState({
        dropDownValue
      });
    }
  }

  state = {
    dropDownValue: ""
  };

  render() {
    return (
      <View styles={styles.container}>
        <Dropdown
          containerStyle={styles.dropDown}
          label=""
          labelHeight={0}
          inputContainerStyle={{ borderBottomColor: "transparent" }}
          value={this.state.dropDownValue}
          data={this.props.data}
          onChangeText={(value, index, data) => {
            if (data && data[index] && data[index].id) {
              this.props.onChangeDropDownSelection(data[index].id);
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 15
  },
  dropDown: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: Colors.bodyBackgroundColor,
    marginTop: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.lightGrey
  }
});
