
import React, {Component} from 'react'
import {
  Text,
  View
} from 'react-native'

import NavigationView from './navigation'

var lastNavId = null

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
    // this.props.navigator.setOnNavigatorEvent(debounce(this.onNavigationEvent, 300, true))
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent)
  }

  onNavigationEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'navigation') {
        // @TODO this debounce hack fixes a double tap issue which should
        // be fixed in React-Native-Navigation
        if (lastNavId === 'navigation') {
          return
        }
        lastNavId = 'navigation'

        this.props.navigator.push(Object.assign(NavigationView.navigatorOptions, {
          title: 'Navigation',
          passProps: {
            title: null,
            root: null
          }
        }))

        setTimeout(() => {
          lastNavId = null
        }, 300)
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
