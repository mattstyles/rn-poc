
import React, {Component} from 'react'
import {
  Text,
  View
} from 'react-native'

export default class PaymentView extends Component {
  static navigatorOptions = {
    screen: 'kf.ProductView',
    title: 'Product',
    label: 'Product',
    overrideBackPress: true,
    navigatorStyle: {}
  }

  static navigatorStyle = {
    drawUnderTabBar: true
  }

  render () {
    return (
      <View style={{flex: 1, padding: 16}}>
        <Text>TODO: Product Page</Text>
      </View>
    )
  }
}
