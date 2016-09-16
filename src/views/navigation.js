
import React, {Component} from 'react'
import {
  View,
  ListView,
  Text
} from 'react-native'

import TouchableRow from '../components/list/touchableRow'
import SearchView from './search'

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
              text: item.text,
              onPress: event => {
                console.log('navigation node pressed:', item)
                this.onNavigateTo(item)
              }
            }
          }))
        })
      })
  }

  onNavigateTo (node) {
    let path = this.props.root
      ? this.props.root + '.' + node.text
      : node.text
    let title = path.split('.').pop()

    if (node.type === 'category') {
      this.props.navigator.push(Object.assign(NavigationView.navigatorOptions, {
        title: title,
        passProps: {
          title: title,
          root: path
        }
      }))
      return
    }

    if (node.type === 'product') {
      console.log('Product reached:', node.text)
      this.props.navigator.push(Object.assign(SearchView.navigatorOptions, {
        title: title,
        passProps: {
          searchBar: false,
          searchKey: title
        }
      }))
      return
    }

    // Should never get here, but lets at least have some warning if we do
    console.log('INVALID NAVIGATION NODE')
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
