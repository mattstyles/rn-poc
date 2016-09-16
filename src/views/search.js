
import React, {Component} from 'react'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import NavigationView from './navigation'

export default class SearchView extends Component {
  static navigatorOptions = {
    screen: 'kf.SearchView',
    title: 'Search',
    label: 'Search',
    overrideBackPress: true,
    navigatorStyle: {}
  }

  static navigatorStyle = {
    drawUnderTabBar: true
  }

  constructor (props) {
    super(props)

    this.toggleTabs = true
  }

  onToggle = event => {
    this.toggleTabs = !this.toggleTabs
    this.props.navigator.toggleTabs({
      to: this.toggleTabs
        ? 'shown'
        : 'hidden',
      animated: true
    })
  }

  onPush = event => {
    this.props.navigator.push(Object.assign(NavigationView.navigatorOptions, {
      passProps: {
        foo: 'bar'
      }
    }))
  }

  render () {
    return (
      <View style={{flex: 1, padding: 20}}>
        <TouchableOpacity onPress={this.onToggle}>
          <Text>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onPush}>
          <Text>Push</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
