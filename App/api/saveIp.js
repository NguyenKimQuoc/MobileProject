import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native';

const saveIp = async (ip) => {
  try {
    await AsyncStorage.setItem('@ip', ip);
    // alert('store success');
  } catch (e) {
    // saving error
    // alert('fail to store');
  }
}

export default saveIp;

