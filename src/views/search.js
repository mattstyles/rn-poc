
import React, {Component} from 'react'
import {
  View,
  ListView,
  Text
} from 'react-native'

import TouchableRow from '../components/list/touchableRow'
import searchStore from '../stores/search'

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

  state = {
    ds: null
  }

  componentWillMount () {
    console.log('search:mounting')
    console.log(this.props)

    if (this.props.searchKey) {
      searchStore
        .get(this.props.searchKey)
        .then(this.onResults)
    }
  }

  onResults = res => {
    const src = new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b
    })

    this.setState({
      ds: src.cloneWithRows(res.map(item => {
        return {
          text: item.title,
          onPress: event => {
            console.log('Search node pressed:', item)
          }
        }
      }))
    })
  }

  render () {
    if (!this.state.ds) {
      return (
        <View style={{flex: 1, padding: 16}}>
          <Text>Search View</Text>
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
