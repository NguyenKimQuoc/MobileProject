import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Image, YellowBox,
  SafeAreaView, StatusBar
} from 'react-native';
import io from 'socket.io-client/dist/socket.io';
// Hide socket warning
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
// import component
import ChangeIp from './ChangeIp'
// import api
import getIp from '../../api/getIp'
import saveIp from '../../api/saveIp'
// import icon
import back_ground from '../../images/back_ground3.jpg'
import light_on from '../../images/light_on.png'
import light_off from '../../images/light_off.png'
import fan_on from '../../images/fan_on.png'
import fan_off from '../../images/fan_off.png'
import pump_on from '../../images/pump_on.png'
import pump_off from '../../images/pump_off.png'

const { height, width } = Dimensions.get('window')
export default class Control extends Component {
  state = {
    ip: '192.168.1.6',
    temperature: '30',
    humidity: '85',
    soilMoisture: '50',
    light1Status: false,
    light2Status: false,
    fanStatus: false,
    pump1Status: false,
    pump2Status: false,
    changeIp: false,
  };
  socketSetup = (ip) => {
    this.socket = io(`http://${ip}:3000`, {
      forceNew: true
    });
    // this.socket = io(`http://e181081e.ap.ngrok.io`, {
    //   forceNew: true
    // });
    this.socket.on('connect', () => console.log('Connection'));
    this.socket.on('DevicesSttData', (data) => {
      console.log('Devices Stt Data');
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        switch (data[i].name) {
          case 'light1':
            this.setState({ light1Status: data[i].stt });
            break;
          case 'pump1':
            this.setState({ pump1Status: data[i].stt });
            break;
          case 'fan':
            this.setState({ fanStatus: data[i].stt });
            break;
          default:
            break;
        }
      }
    });
    this.socket.on('SensorsData', (data) => {
      console.log('Sensors Data');
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        switch (data[i].name) {
          case 'temp':
            this.setState({ temperature: data[i].value });
            break;
          case 'humi':
            this.setState({ humidity: data[i].value });
            break;
          case 'groundhumi':
            this.setState({ soilMoisture: data[i].value });
            break;
          default:
            break;
        }
      }
    });
    this.socket.emit('DisplaySensorsValue');
    this.socket.emit('DisplayDevicesStt');
  }
  async componentDidMount() {
    let ipGet = await getIp();
    this.setState({ ip: ipGet });
    this.socketSetup(ipGet);
    StatusBar.setHidden(true);
  }
  handleToggleChangeIp = () => {
    this.setState({ changeIp: true })
  }
  handleChangeIp = (ip) => {
    this.setState({
      changeIp: false,
      ip: ip
    });
    this.socketSetup(ip);
    saveIp(ip);
  }
  handleToggleLight1 = () => {
    const { light1Status } = this.state;
    this.socket.emit('DevicesControl', { getDevicesName: 'light1', getDevicesStt: light1Status })
  }
  handleToggleFan = () => {
    const { fanStatus } = this.state;
    this.socket.emit('DevicesControl', { getDevicesName: 'fan', getDevicesStt: fanStatus })
  }
  handleTogglePump1 = () => {
    const { pump1Status } = this.state;
    this.socket.emit('DevicesControl', { getDevicesName: 'pump1', getDevicesStt: pump1Status })
  }

  render() {
    const { container, infoContainer, textStyle, controlContainer, topControl, bottomControl,
      icon, topInfo, bottomInfo, buttonText, ipContainer, authorDetails, textAuthorStyle } = styles;
    const { ip, temperature, humidity, soilMoisture, changeIp, light1Status, light2Status,
      fanStatus, pump1Status, pump2Status } = this.state;
    return (
      <SafeAreaView style={container}>
        {/* <ImageBackground source={back_ground} style={{ flex: 1 }} blurRadius={1}> */}
        <View>
          <TouchableOpacity onPress={this.handleToggleChangeIp}>
            <Text style={{ color: 'grey' }}>{ip}</Text>
          </TouchableOpacity>
        </View>
        <View style={ipContainer}>
          {changeIp && <ChangeIp onChangeIp={this.handleChangeIp} ip={ip} />}
        </View>
        <View style={authorDetails}>
          <Text style={[textAuthorStyle, { color: 'red' }]}>TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN</Text>
          <Text style={[textAuthorStyle, { color: 'red' }]}>KHOA KỸ THUẬT MÁY TÍNH</Text>
          <Text style={[textAuthorStyle,]}>ĐỒ ÁN MÔN HỌC</Text>
          <Text style={[textAuthorStyle, { color: 'blue', marginBottom: 0 }]}>ỨNG DỤNG QUẢN LÝ HỆ THỐNG KHU VƯỜN THÔNG MINH</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[textAuthorStyle, { color: 'green', marginBottom: 0 }]}>NGÔ QUỐC NHU          </Text>
            <Text style={[textAuthorStyle, { color: 'green', marginBottom: 0 }]}>17520857</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[textAuthorStyle, { color: 'green', marginTop: 0 }]}>NGUYỄN KIM QUỐC    </Text>
            <Text style={[textAuthorStyle, { color: 'green', marginTop: 0 }]}>18521310</Text>
          </View>

        </View>
        <View>
          <View style={infoContainer}>
            <View style={topInfo}>
              <Text style={textStyle}>Nhiệt độ: {temperature}°C</Text>
              <Text style={textStyle}>Độ ẩm: {humidity}%</Text>
            </View>
            <View style={bottomInfo}>
              <Text style={textStyle}>Độ ẩm đất: {soilMoisture}%</Text>
            </View>
          </View>
          {/************ Control view **************/}
          <View style={controlContainer}>
            <View style={topControl}>
              <TouchableOpacity onPress={this.handleToggleLight1} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={light1Status ? light_on : light_off} style={icon} />
                <Text style={buttonText}>ĐÈN : {light1Status ? 'ON ' : 'OFF'}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.handleToggleFan} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={fanStatus ? fan_on : fan_off} style={icon} />
                <Text style={buttonText}>QUẠT: {fanStatus ? 'ON ' : 'OFF'}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.handleTogglePump1} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={pump1Status ? pump_on : pump_off} style={icon} />
                <Text style={buttonText}>BƠM : {pump1Status ? 'ON ' : 'OFF'}</Text>
              </TouchableOpacity>
            </View>
            <View style={bottomControl}>

            </View>
          </View>
        </View>
        

        {/* </ImageBackground> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#DBDBDB",
    justifyContent: 'flex-start'
  },
  infoContainer: {
    justifyContent: 'space-around',
    marginTop: 30
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3B3C4A'
  },
  controlContainer: {
    justifyContent: 'space-around',
    marginTop: 30
  },
  topControl: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bottomControl: {
    marginTop: 30,
    justifyContent: 'space-around',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    height: 60,
    width: 60
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bottomInfo: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 13,
    color: "black",
    fontWeight: 'bold'
  },
  ipContainer: {
    width: width - 30,
    marginLeft: 15,
  },
  authorDetails: {
    margin: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 5
  },
  textAuthorStyle: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
    fontSize: 12
  }
})
