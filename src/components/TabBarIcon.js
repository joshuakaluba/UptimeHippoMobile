import React from 'react';
import * as Icon from '@expo/vector-icons';
import { Colors } from '../constants';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={this.props.focused ? 26: 20}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.darkGrey : Colors.lightGrey}
      />
    );
  }
}