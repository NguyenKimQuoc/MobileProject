import React from 'react';
import{ TouchableOpacity, StyleSheet, Text, ColorPropType } from 'react-native';

export default function Button({
  color,
  title,
  small,
  onPress
})  {

  return(
    <TouchableOpacity style={[styles.button,{borderColor:color}]} onPress={onPress}>
      <Text style={[styles.buttonText, small? styles.small: styles.large, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles=StyleSheet.create({
  button:{
    margin:10,
    marginBottom:0,
    minWidth:100,
    borderWidth:2,
    borderRadius:10
  },
  small:{
    fontSize:14,
    padding:5
  },
  large:{
    fontSize:16,
    padding:10
  },
  buttonText:{
    textAlign:'center',
    fontWeight:'bold'
  },
  title:{
    fontSize:14,
    fontWeight:'bold'
  },
  elapsedTime: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  }
});