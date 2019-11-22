import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Image } from "react-native";

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
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
