import React, { Component } from 'react';
import { } from 'react-native';

import Item from './Item'
import ItemForm from './ItemForm'
export default class EditAbleItem extends Component {
  state = {
    isOpen: false
  }
  handleFormClose = () => {
    this.setState({ isOpen: false })
  }
  handleSubmit = (item) => {
    const { onUpdate } = this.props;
    onUpdate(item);
    this.setState({ isOpen: false })
  }
  handleUpdatePress = () => {
    this.setState({ isOpen: true })
  }
  render() {
    const { isOpen } = this.state
    const { id, name, datebegin, onRemove, dateend, wateringtime1, wateringtime2,
      wateringtime3, wateringoff, pump } = this.props;
    if (isOpen) {
      return (
        <ItemForm
          // id={id}
          name={name}
          datebegin={datebegin}
          dateend={dateend}
          wateringtime1={wateringtime1}
          wateringtime2={wateringtime2}
          wateringtime3={wateringtime3}
          wateringoff={wateringoff}
          // pump={pump}
          onFormClose={this.handleFormClose}
          onSubmit={this.handleSubmit}
        />
      )
    }
    return (
      <Item
        // id={id}
        name={name}
        datebegin={datebegin}
        dateend={dateend}
        wateringtime1={wateringtime1}
        wateringtime2={wateringtime2}
        wateringtime3={wateringtime3}
        wateringoff={wateringoff}
        // pump={pump}
        onRemove={onRemove}
        onUpdatePress={this.handleUpdatePress}
      />
    )
  }
}