
import React, {Component} from 'react'
import {
  Text,
  View
} from 'react-native'

export default class HomeView extends Component {
  static navigatorOptions = {
    screen: 'kf.HomeView',
    title: 'Home',
    label: 'Home',
    overrideBackPress: true,
    navigatorStyle: {}
  }

  static navigatorStyle = {
    drawUnderTabBar: true
  }

  render () {
    return (
      <View style={{flex: 1, padding: 20}}>
        <Text>Hello World</Text>
      </View>
    )
  }
}
