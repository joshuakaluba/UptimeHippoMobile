import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, StyleSheet, Image } from "react-native";
import { Colors } from "../constants";

export default class LoadingModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  };

  render() {
    return (
      <View>
        <Modal isVisible={this.props.visible}>
          <View style={styles.modalContent}>
            <Image
              source={require("../../assets/images/loading.gif")}
              style={{ width: 250, height: 250 }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Colors.white,
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
