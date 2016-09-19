
import React, {Component} from 'react'
import {
  View,
  ListView,
  Text,
  StyleSheet
} from 'react-native'
import SearchBar from 'react-native-search-bar'

import ProductView from './product'
import TouchableRow from '../components/list/touchableRow'
import searchStore from '../stores/search'

const styles = StyleSheet.create({
  loadContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
    backgroundColor: '#ffffff'
  },
  load: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 13,
    textAlign: 'center'
  }
})

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
    }),
    isLoading: false
  }

  // @TODO Warning: anti-pattern. Handle async loading properly
  _isMounted = false

  componentWillMount () {
    this._isMounted = true

    if (this.props.searchKey) {
      this.setState({
        isLoading: true
      })
      searchStore
        .getCategory(this.props.searchKey)
        .then(this.onResults)
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  componentDidMount () {
    // Tabbed view mounts immediately. Navigator does not currently intercept
    // tab button clicks. @see https://github.com/wix/react-native-navigation/issues/268
    // if (!this.props.searchKey) {
    //   setTimeout(() => {
    //     this.refs.search.focus()
    //   }, 1000)
    // }
  }

  searchMapper = item => {
    return {
      text: item.title,
      onPress: event => {
        console.log('Search node pressed:', item)
        this.onNavigateTo(item)
      }
    }
  }

  onNavigateTo = item => {
    this.refs.search.unFocus()
    this.props.navigator.push(Object.assign(ProductView.navigatorOptions, {
      title: item.title,
      passProps: {
        item: item
      }
    }))
  }

  onResults = res => {
    if (!this._isMounted) {
      return
    }

    // Append navigator and push through the search mapper
    let data = res
      .map(this.searchMapper)

    this.setState({
      ds: this.state.ds.cloneWithRows(data),
      isLoading: false
    })
  }

  onSearchTextUpdate = text => {
    if (text.length < 3) {
      return
    }

    this.setState({
      isLoading: true
    })
    searchStore
      .getQuery(text)
      .then(this.onResults)
  }

  onSearchCancel = event => {
    console.log(event)
    this.refs.search.unFocus()
  }

  render () {
    let searchBar = this.props.searchBar
      ? <SearchBar
        ref='search'
        placeholder='Search'
        showsCancelButton
        onChangeText={this.onSearchTextUpdate}
        onCancelButtonPress={this.onSearchCancel}
        onSearchButtonPress={this.onSearchCancel}
      />
      : null

    let loadIndicator = this.state.isLoading
      ? <View style={styles.loadContainer}>
        <Text style={styles.load}>Loading...</Text>
      </View>
      : null

    return (
      <View style={{flex: 1}}>
        {searchBar}
        {loadIndicator}
        <ListView
          dataSource={this.state.ds}
          renderRow={TouchableRow}
        />
      </View>
    )
  }
}
