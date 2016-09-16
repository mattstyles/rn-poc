
import React, {Component} from 'react'
import {
  Text,
  View
} from 'react-native'
import debounce from 'debounce'

import NavigationView from './navigation'

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

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Navigation',
        id: 'navigation'
      }
    ]
  }

  constructor (props) {
    super(props)

    // @TODO this debounce is a hack, the navigator events are firing twice for some reason
    this.props.navigator.setOnNavigatorEvent(debounce(this.onNavigationEvent, 300, true))
  }

  onNavigationEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'navigation') {
        this.props.navigator.push(Object.assign(NavigationView.navigatorOptions, {
          title: 'Home'
        }))
      }
    }
  }

  render () {
    return (
      <View style={{flex: 1, padding: 20}}>
        <Text>Hello World</Text>
      </View>
    )
  }
}
