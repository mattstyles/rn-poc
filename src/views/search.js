
import React, {Component} from 'react'
import {
  View,
  ListView,
  Text
} from 'react-native'
import SearchBar from 'react-native-search-bar'

import TouchableRow from '../components/list/touchableRow'
import searchStore from '../stores/search'

const searchMapper = item => {
  return {
    text: item.title,
    onPress: event => {
      console.log('Search node pressed:', item)
    }
  }
}

export default class SearchView extends Component {
  static navigatorOptions = {
    screen: 'kf.SearchView',
    title: 'Search',
    label: 'Search',
    overrideBackPress: true,
    navigatorStyle: {}
  }

  static navigatorStyle = {
    drawUnderTabBar: false
  }

  static defaultProps = {
    searchBar: true,
    searchKey: null
  }

  state = {
    ds: new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b
    })
  }

  // @TODO Warning: anti-pattern. Handle async loading properly
  _isMounted = false

  componentWillMount () {
    this._isMounted = true

    if (this.props.searchKey) {
      searchStore
        .getCategory(this.props.searchKey)
        .then(this.onResults)
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  onResults = res => {
    if (!this._isMounted) {
      return
    }

    let data = res.map(searchMapper)

    this.setState({
      ds: this.state.ds.cloneWithRows(data)
    })
  }

  onSearchTextUpdate = text => {
    if (text.length < 3) {
      return
    }

    searchStore
      .getQuery(text)
      .then(this.onResults)
  }

  render () {
    let searchBar = this.props.searchBar
      ? <SearchBar
        ref='search'
        placeholder='Search'
        onChangeText={this.onSearchTextUpdate}
      />
      : null

    return (
      <View style={{flex: 1}}>
        {searchBar}
        <ListView
          dataSource={this.state.ds}
          renderRow={TouchableRow}
        />
      </View>
    )
  }
}
