
import React from 'react'
import {
  TouchableHighlight,
  Text,
  Image,
  View,
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
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    flex: 1,
    marginLeft: 16
  },
  image: {
    width: 44,
    height: 44
  }
})

const TouchableRow = ({onPress, text, img}) => {
  let image = img
    ? <Image source={{uri: img}} style={styles.image} />
    : null
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        {image}
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default TouchableRow
