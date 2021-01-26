import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

export default class Item extends Component {
  state = {}
  handleRemovePress = () => {
    const { onRemove } = this.props;
    Alert.alert(
      'Xóa cây trồng?',
      'Cây này sẽ được xóa khỏi hệ thống',
      [
        { text: 'Hủy', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Đồng ý', onPress: () => onRemove() },
      ],
      { cancelable: false }
    )

  }
  handleUpdatePress = () => {
    const { onUpdatePress } = this.props;
    onUpdatePress();
  }
  render() {
    const { container, textRemoveStyle, textUpdateStyle } = styles;
    const { name, datebegin, dateend, wateringtime1, wateringtime2, wateringtime3, wateringoff } = this.props;
    const submitText = name ? 'Chỉnh sửa' : 'Thêm';
    return (
      <View style={container}>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Cây trồng: {name}</Text>

        <View style={{ marginBottom: 7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 17 }}>Ngày trồng:         </Text>
          <Text style={{ fontSize: 17 }}>{datebegin}</Text>
          <View></View>
        </View>
        <View style={{ marginBottom: 7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 17 }}>Ngày thu hoạch: </Text>
          <Text style={{ fontSize: 17 }}>{dateend}</Text>
          <View></View>
        </View>
        {/* <Text style={{ fontSize: 17, marginBottom: 7 }}>Ngày trồng: {datebegin}</Text>
        <Text style={{ fontSize: 17, marginBottom: 7 }}>Ngày thu hoạch: {dateend}</Text> */}

        <View style={{ marginBottom: 7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 17 }}>Tưới nước vào: </Text>
          <Text style={{ fontSize: 17 }}>{wateringtime1 != '-1' ? wateringtime1 + ' (h)' : ''}</Text>
          <Text style={{ fontSize: 17 }}>{wateringtime2 != '-1' ? wateringtime2 + ' (h)' : ''}</Text>
          <Text style={{ fontSize: 17 }}>{wateringtime3 != '-1' ? wateringtime3 + ' (h)' : ''}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 17, marginBottom: 7 }}>Bơm sẽ tắt sau:           {wateringoff != '-1' ? wateringoff + ' (phút)' : ''} </Text>
          {/* <Text style={{ fontSize: 17, marginBottom: 5, marginLeft: 15 }}>Máy bơm: {pump}</Text> */}
        </View>

        <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.handleUpdatePress}>
            <Text style={textUpdateStyle}>{submitText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleRemovePress}>
            <Text style={textRemoveStyle}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: '#D6D7DA',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    marginBottom: 10,
    justifyContent: 'space-around'
  },
  textRemoveStyle: {
    marginLeft: 5,
    color: '#DB2828',
    textDecorationLine: 'underline'
  },
  textUpdateStyle: {
    marginLeft: 5,
    color: 'blue',
    textDecorationLine: 'underline'
  }


})