import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default class ChangeIp extends Component {
  constructor(props){
    super(props);
    const {ip}= this.props;
    this.state = {
      ip: ip? ip:'192.168.1.0'
    }
  }
  
  handleChangeIp = () => {
    const { onChangeIp } = this.props;
    const { ip } = this.state;
    onChangeIp(ip);
  }
  render() {
    const { container, button, textInput, textStyle } = styles;
    const { ip } = this.state;
    return (
      <View style={container}>
        <TextInput
          style={textInput}
          placeholder="Nhập ip localhost"
          defaultValue={ip}
          onChangeText={(text) => { this.setState({ ip: text }) }}
        />
        <TouchableOpacity style={button} onPress={this.handleChangeIp}>
          <Text style={textStyle}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  button: {
    padding: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    marginLeft: 10,
    borderRadius: 7,

  },
  textInput: {
    height: 40,
    // padding: 3,
    fontSize: 12,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7,
    flex: 7,
  },
  textStyle: {
    color: 'red'
  }
})