import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import Component
import Control from './components/Control/Control'
import StatusView from './components/StatusView/StatusView'
// import icon
import control from './images/control.png'
import control_s from './images/control_s.png'
import list from './images/list.png'
import list_s from './images/list_s.png'

const BottomTab = createBottomTabNavigator();

export default class App extends Component {
  state = {};
  render() {
    return (
      <NavigationContainer>
        <BottomTab.Navigator tabBarOptions={{ activeTintColor: '#15D421' }}>
          <BottomTab.Screen
            name='Control'
            component={Control}
            options={{
              tabBarLabel: 'Bảng Điều Khiển',
              tabBarOptions: {
                activeTintColor: '#15D421'
              },
              tabBarIcon: ({ focused }) => (
                focused ?
                  <Image source={control_s} style={styles.icon} />
                  :
                  <Image source={control} style={styles.icon} />
              )
            }}
          />
          <BottomTab.Screen
            name='Status View'
            component={StatusView}
            options={{
              tabBarLabel: 'Trồng cây',
              tabBarOptions: {
                activeTintColor: '#15D421'
              },
              tabBarIcon: ({ focused }) => (
                focused ?
                  <Image source={list_s} style={styles.icon} />
                  :
                  <Image source={list} style={styles.icon} />
              )
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  icon: { width: 25, height: 25 }
})