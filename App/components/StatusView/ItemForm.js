import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
//import my component
import Button from './Button'
import TimeSetPicker from './TimeSetPicker'

const { height, width } = Dimensions.get('window')

export default class ItemForm extends Component {
  constructor(props) {
    super(props);
    const { name, datebegin, dateend, wateringtime1, wateringtime2, wateringtime3, wateringoff } = this.props;
    this.state = {
      item: {
        name: name ? name : '',
        datebegin: datebegin ? datebegin : '',
        dateend: dateend ? dateend : '',
        wateringtime1: wateringtime1 != '-1' ? '' + wateringtime1 : '',
        wateringtime2: wateringtime2 != '-1' ? '' + wateringtime2 : '',
        wateringtime3: wateringtime3 != '-1' ? '' + wateringtime3 : '',
        wateringoff: wateringoff ? '' + wateringoff : '',
      },
      date: new Date(),
      showDate1: false,
      showDate2: false,
    }
  }
  showDatepicker = () => {
    this.setState({ showDate1: true });
  }
  showDatepicker2 = () => {
    this.setState({ showDate2: true });
  }
  setDateBegin = (time) => {
    if (time.type == 'set') {
      this.setState({ showDate1: false });
      let x = new Date(time.nativeEvent.timestamp);
      console.log(x.getFullYear() + '-' + (x.getMonth() + 1) + '-' + x.getDate());
      this.handleChangeTimeBegin(x.getFullYear() + '-' + (x.getMonth() + 1) + '-' + x.getDate())
    }
  }
  setDateEnd = (time) => {
    if (time.type == 'set') {
      this.setState({ showDate2: false });
      let y = new Date(time.nativeEvent.timestamp);
      console.log(y.getFullYear() + '-' + (y.getMonth() + 1) + '-' + y.getDate());
      this.handleChangeTimeEnd(y.getFullYear() + '-' + (y.getMonth() + 1) + '-' + y.getDate())
    }
  }
  _getYear = (date) => {
    let res = date.split("-");
    console.log(res[0]);
    return parseInt(res[0]);
  }
  _getMonth = (date) => {
    let res = date.split("-");
    console.log(res[1]);
    return parseInt(res[1]);
  }
  _getDate = (date) => {
    let res = date.split("-");
    console.log(res[2]);
    return parseInt(res[2]);
  }

  handleChangeName = (text) => {
    const { item } = this.state;
    let newItem = item;
    newItem.name = text;
    this.setState({ item: newItem })
  }
  handleChangeTimeBegin = (text) => {
    const { item } = this.state;
    let newItem = item;
    newItem.datebegin = text;
    this.setState({ item: newItem })
  }
  handleChangeTimeEnd = (text) => {
    const { item } = this.state;
    let newItem = item;
    newItem.dateend = text;
    this.setState({ item: newItem })
  }
  handleChangePumpStartTime1 = (text) => {
    const { item } = this.state;
    let newItem = item;
    newItem.wateringtime1 = text;
    this.setState({ item: newItem })
  }
  handleChangePumpStartTime2 = (text) => {
    const { item } = this.state;
    let newItem = item;
    newItem.wateringtime2 = text;
    this.setState({ item: newItem })
  }
  handleChangePumpStartTime3 = (text) => {
    const { item } = this.state;
    let newItem = item;
    newItem.wateringtime3 = text;
    this.setState({ item: newItem })
  }
  handleChangeTimerValue = (text, itemIndex) => {
    const { item } = this.state;
    // console.log(itemIndex);
    let newItem = item;
    newItem.wateringoff = text;
    this.setState({ item: newItem })
  }

  handleSubmit = () => {
    const { item } = this.state;
    const { onSubmit, name, datebegin, dateend, id, wateringtime1, wateringoff, pump } = this.props;
    if (item.name == '') {
      // alert('Vui lòng nhập tên cây trồng');
      Alert.alert(
        'Thông báo',
        'Vui lòng nhập tên cây trồng',
        [
          { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
    }
    else if (item.datebegin == '') {
      // alert('Vui lòng nhập ngày trồng');
      Alert.alert(
        'Thông báo',
        'Vui lòng chọn ngày trồng',
        [
          { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
    }
    else if (item.dateend == '') {
      // alert('Vui lòng nhập ngày thu hoạch');
      Alert.alert(
        'Thông báo',
        'Vui lòng chọn ngày thu hoạch',
        [
          { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
    }
    else if ((this._getYear(item.datebegin) > this._getYear(item.dateend))
      || (
        (this._getYear(item.datebegin) == this._getYear(item.dateend))
        && (this._getMonth(item.datebegin) > this._getMonth(item.dateend))
      )
      || (
        (this._getYear(item.datebegin) == this._getYear(item.dateend))
        && (this._getMonth(item.datebegin) == this._getMonth(item.dateend))
        && (this._getDate(item.datebegin) > this._getDate(item.dateend))
      )
    ) {
      Alert.alert(
        'Thông báo',
        'Ngày thu hoạch phải trùng hoặc sau ngày trồng',
        [
          { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
    }
    else if ((item.wateringtime1 == '-1' || item.wateringtime1 == '')
      && (item.wateringtime2 == '-1' || item.wateringtime2 == '')
      && (item.wateringtime3 == '-1' || item.wateringtime3 == '')) {
      Alert.alert(
        'Thông báo',
        'Vui lòng chọn thời gian hẹn tưới',
        [
          { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
    }
    else if (
      ((item.wateringtime1 == item.wateringtime2) && (item.wateringtime1 != '-1') && (item.wateringtime1 != ''))
      || ((item.wateringtime1 == item.wateringtime3) && (item.wateringtime1 != '-1') && (item.wateringtime1 != ''))
      || ((item.wateringtime3 == item.wateringtime2) && (item.wateringtime2 != '-1') && (item.wateringtime2 != ''))
    ) {
      Alert.alert(
        'Thông báo',
        'Thời gian hẹn giờ phải khác nhau',
        [
          { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
    }
    else if (item.wateringoff == '' || item.wateringoff == '-1') {
      this.handleChangeTimerValue('1');
      onSubmit(item);
    }
    else {
      onSubmit(item);
    }
  }
  render() {
    const { container, titleContainer, titleStyle, infoContainer, inputStyle, textStyle, buttonGroup,
      timeContainer, timeInputStyle } = styles;
    const { item, showDate1, showDate2, date } = this.state;
    const { name, onFormClose } = this.props;
    const submitText = name ? 'Cập nhật' : 'Thêm';
    const title = name ? 'Chỉnh sửa' : 'Thêm cây trồng'
    return (
      <View style={container}>
        <View style={titleContainer}>
          <Text style={titleStyle}>{title}</Text>
        </View>
        <View style={[infoContainer, { marginRight: 0 }]}>
          <Text style={textStyle}>Tên cây trồng:</Text>
          <TextInput
            style={inputStyle}
            placeholder="Cà chua..."
            onChangeText={this.handleChangeName}
            value={item.name}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={[infoContainer, { width: width / 2 - 30 }]}>
            <Text style={textStyle}>Ngày trồng:</Text>
            <TouchableOpacity style={inputStyle} onPress={this.showDatepicker}>
              <Text >{item.datebegin}</Text>
            </TouchableOpacity>
            {showDate1 && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={this.setDateBegin}
              />
            )}
          </View>
          <View style={[infoContainer, { width: width / 2 - 30 }]}>
            <Text style={textStyle}>Dự kiến thu hoạch:</Text>
            <TouchableOpacity style={inputStyle} onPress={this.showDatepicker2}>
              <Text >{item.dateend}</Text>
            </TouchableOpacity>
            {showDate2 && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={this.setDateEnd}
              />
            )}
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <Text style={textStyle}>Hẹn giờ:</Text>
          <TimeSetPicker
            selectedValue={item.wateringtime1}
            onValueChange={this.handleChangePumpStartTime1}
          />
          <TimeSetPicker
            selectedValue={item.wateringtime2}
            onValueChange={this.handleChangePumpStartTime2}
          />
          <TimeSetPicker
            selectedValue={item.wateringtime3}
            onValueChange={this.handleChangePumpStartTime3}
          />

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={[infoContainer, { flexDirection: 'row', alignItems: 'center' }]}>
            <Text style={textStyle}>Tắt sau:  </Text>

            <Picker
              selectedValue={item.wateringoff}
              style={{ height: 20, width: 100 }}
              onValueChange={this.handleChangeTimerValue}
              mode={'dropdown'}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
            </Picker>
          </View>
        </View>
        <View style={buttonGroup}>
          <Button small color='#21BA45' title={submitText} onPress={this.handleSubmit} />
          <Button small color='#DB2828' title='Hủy' onPress={onFormClose} />
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
    // flex:1
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#39B739'
  },
  infoContainer: {
    marginTop: 5,
    // flex: 1,
    marginRight: 5
  },

  textStyle: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: 'bold',
    marginTop: 5
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timeInputStyle: {
    height: 35,
    width: width / 5 - 5,
    padding: 5,
    fontSize: 14,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7,
    marginLeft: 10
  },
  inputStyle: {
    height: 35,
    padding: 5,
    fontSize: 14,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7
  },
})