
import React from 'react'
import {
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 13,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
    backgroundColor: '#ffffff'
  },
  text: {
    fontSize: 14
  }
})

const TouchableRow = ({onPress, text}) => {
  return (
    <TouchableHighlight style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  )
}

export default TouchableRow
