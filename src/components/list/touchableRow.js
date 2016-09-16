
import React from 'react'
import {
  TouchableHighlight,
  Text
} from 'react-native'

const TouchableRow = ({onPress, text}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <Text>{text}</Text>
    </TouchableHighlight>
  )
}

export default TouchableRow
