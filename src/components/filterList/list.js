
import React from 'react'
import {
  Text,
  View
} from 'react-native'
import styles from './styles'

const List = ({items}) => {
  if (!items) {
    return null
  }
  let children = items.map((item, index) => {
    let style = Object.assign({}, styles.listItem, {
      background: index % 2
        ? 'rgb(64,64,64)'
        : 'rgb(44,44,44)'
    })
    return (
      <Text
        key={'list' + index}
        style={style}
      >
        {item.firstname + ' ' + item.surname}
      </Text>
    )
  })
  return (
    <View>
      {children}
    </View>
  )
}

export default List
