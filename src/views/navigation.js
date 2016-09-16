
import React, {Component} from 'react'
import {
  View,
  ListView,
  Text
} from 'react-native'

import TouchableRow from '../components/list/touchableRow'

import catalogStore from '../stores/catalog'

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

  state = {
    ds: null
  }

  constructor (props) {
    super(props)

    const src = new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b
    })

    catalogStore.get(this.props.root || '')
      .then(data => {
        this.setState({
          ds: src.cloneWithRows(data.map(item => {
            return {
              text: item,
              onPress: event => {
                console.log('pressed:', item)
                this.onNavigateTo(this.props.root
                  ? this.props.root + '.' + item
                  : item)
              }
            }
          }))
        })
      })
  }

  onNavigateTo (key) {
    let title = key.split('.').pop()
    this.props.navigator.push(Object.assign(NavigationView.navigatorOptions, {
      title: title,
      passProps: {
        title: title,
        root: key
      }
    }))
  }

  render () {
    if (!this.state.ds) {
      return (
        <View style={{flex: 1, padding: 16}}>
          <Text>Loading data...</Text>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={this.state.ds}
          renderRow={TouchableRow}
        />
      </View>
    )
  }
}
