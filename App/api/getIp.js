import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native';

const getIp = async ()=>{
  try {
    const value = await AsyncStorage.getItem('@ip');
    // alert(value);
    if (value !== null){
      return value;
    }
    else return '';
  } catch (error) {
    console.log('NO ip !!!');
    return '';
  }
}
export default getIp;