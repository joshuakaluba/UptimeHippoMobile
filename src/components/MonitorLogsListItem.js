import React from "react";
import PropTypes from "prop-types";
import { Colors, StringDictionary } from "../constants";
import { Text, View, StyleSheet } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { Lib } from "../utilities";

export default class MonitorLogsListItem extends React.Component {
  static propTypes = {
    monitorLog: PropTypes.object.isRequired
  };

  render() {
    return (
      <View style={styles.card}>
        <Grid>
          <Row>
            <Text
              style={{
                fontWeight: "700",
                color:
                  this.props.monitorLog.successful === false
                    ? Colors.danger
                    : Colors.darkGrey
              }}
            >
              {this.props.monitorLog.monitor.name}
            </Text>
          </Row>
          <Row>
            <Col size={6}>
              <Text style={{ paddingTop: 3 }}>
                {Lib.getFormattedDate(this.props.monitorLog.dateCreated)}
              </Text>
            </Col>
            <Col size={4}>
              <Text>
                {this.props.monitorLog.monitor.type === 0 &&
                  `${StringDictionary.responseCode}: ${this.props.monitorLog.responseCode}`}
                {this.props.monitorLog.successful === true &&
                  this.props.monitorLog.monitor.type === 1 &&
                  `${StringDictionary.keyWordFound}`}
              </Text>
            </Col>
          </Row>
          {this.props.monitorLog.successful === false && (
            <Row>
              <Col>
                <Text style={{ paddingTop: 3 }}>
                  {this.props.monitorLog.exceptionMessage}
                </Text>
              </Col>
            </Row>
          )}
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
