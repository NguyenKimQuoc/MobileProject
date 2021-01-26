import React, { Component } from 'react';
import { View, Dimensions, YellowBox } from 'react-native';

import io from 'socket.io-client/dist/socket.io';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
//import component
import EditAbleItem from './EditAbleItem'

//import api
import getIp from '../../api/getIp'

const { height, width } = Dimensions.get('window')
export default class StatusView extends Component {
  state = {
    data:
    {
      // id: '1',
      name: '',
      datebegin: '',
      dateend: '',
      wateringtime1: -1,
      wateringtime2: -1,
      wateringtime3: -1,
      wateringoff: -1,
      // pump: '1',
    },
    ip: ''
  }
  socketSetup = (ip) => {
    this.socket = io(`http://${ip}:3000`, {
      forceNew: true
    });
    // this.socket = io(`http://e181081e.ap.ngrok.io`, {
    //   forceNew: true
    // });
    this.socket.on('connect', () => console.log('Connection'));
    this.socket.on('PlantAreasData', (dataPlant) => {
      console.log('PlantsData');
      console.log(dataPlant);
      this.setState({ data: dataPlant[0] });
    });
    this.socket.emit('DisplayPlantAreas');
  }
  async componentDidMount() {
    let ipGet = await getIp();
    this.setState({ ip: ipGet }); 
    this.socketSetup(ipGet);
  }
  handleRemove = () => {
    this.socket.emit('DelPlantAreas', 1);
  }

  handleUpdate = (item) => {
    console.log('update');
    console.log(item);
    const newData = {
      id: 1,
      name: item.name,
      datebegin: item.datebegin,
      dateend: item.dateend,
      wateringtime1: (item.wateringtime1 == '-1' || item.wateringtime1 == '') ? -1 : parseInt(item.wateringtime1),
      wateringtime2: (item.wateringtime2 == '-1' || item.wateringtime2 == '') ? -1 : parseInt(item.wateringtime2),
      wateringtime3: (item.wateringtime3 == '-1' || item.wateringtime3 == '') ? -1 : parseInt(item.wateringtime3),
      wateringoff: parseInt(item.wateringoff),
    }
    console.log(newData);
    this.socket.emit('EditPlantAreas', newData);
  }
  render() {
    const { data } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <EditAbleItem
          name={data.name}
          datebegin={data.datebegin}
          dateend={data.dateend}
          wateringtime1={data.wateringtime1 ? data.wateringtime1 : -1}
          wateringtime2={data.wateringtime2 ? data.wateringtime2 : -1}
          wateringtime3={data.wateringtime3 ? data.wateringtime3 : -1}
          wateringoff={data.wateringoff ? data.wateringoff : -1}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </View>
    );
  }
}