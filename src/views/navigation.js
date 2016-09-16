
import React, {Component} from 'react'
import {
  View,
  ListView
} from 'react-native'

import TouchableRow from '../components/list/touchableRow'

export default class NavigationView extends Component {
  static navigatorOptions = {
    screen: 'kf.NavigationView',
    title: 'Navigation',
    overrideBackPress: true,
    navigatorStyle: {}
  }

  static navigatorStyle = {
    drawUnderTabBar: true
  }

  constructor (props) {
    super(props)

    const src = new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b
    })

    const data = [
      'Tools',
      'Garden',
      'Home'
    ]

    this.ds = src.cloneWithRows(data.map(item => {
      return {
        text: item,
        onPress: event => {
          console.log('pressed:', item)
        }
      }
    }))
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={this.ds}
          renderRow={TouchableRow}
        />
      </View>
    )
  }
}
