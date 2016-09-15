
import React, {Component} from 'react'
import {
  Text,
  View
} from 'react-native'

export default class PaymentView extends Component {
  static navigatorOptions = {
    screen: 'kf.PaymentView',
    title: 'Payment',
    label: 'Payment',
    overrideBackPress: true,
    navigatorStyle: {}
  }

  static navigatorStyle = {
    drawUnderTabBar: true
  }

  render () {
    return (
      <View style={{flex: 1, padding: 20}}>
        <Text>TO DO</Text>
      </View>
    )
  }
}
