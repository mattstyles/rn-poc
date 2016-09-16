
import React, {Component} from 'react'
import {
  Text,
  View,
  ListView
} from 'react-native'

const ListRow = data => {
  return <Text style={{padding: 20}}>{data}</Text>
}

export default class HomeView extends Component {
  static navigatorOptions = {
    screen: 'kf.BasketView',
    title: 'Basket',
    label: 'Basket',
    overrideBackPress: true,
    navigatorStyle: {}
  }

  static navigatorStyle = {
    drawUnderTabBar: true
  }

  constructor (props) {
    super(props)

    const ds = new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b
    })
    this.state = {
      data: ds.cloneWithRows([
        'No items in basket',
        'No more'
      ])
    }
  }

  render () {
    return (
      <View style={{flex: 1, padding: 0}}>
        <ListView
          dataSource={this.state.data}
          renderRow={ListRow}
        />
      </View>
    )
  }
}
