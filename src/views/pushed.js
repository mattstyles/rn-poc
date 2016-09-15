
import React, {Component} from 'react'
import {
  Text,
  View
} from 'react-native'

export default class PushView extends Component {
  static navigatorOptions = {
    screen: 'kf.PushView',
    title: 'Pushed',
    overrideBackPress: true,
    navigatorStyle: {}
  }

  static navigatorStyle = {
    drawUnderTabBar: true
  }

  render () {
    return (
      <View style={{flex: 1, padding: 20}}>
        <Text>A pushed view</Text>
        <Text>{this.props.foo || 'Foo not passed as prop'}</Text>
      </View>
    )
  }
}
