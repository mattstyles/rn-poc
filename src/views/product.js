
import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'

import productStore from '../stores/product'

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
  },

  container: {
    flex: 1,
    padding: 8
  },
  image: {

  }
})

export default class ProductView extends Component {
  static navigatorOptions = {
    screen: 'kf.ProductView',
    title: 'Product',
    label: 'Product',
    overrideBackPress: true,
    navigatorStyle: {}
  }

  static navigatorStyle = {
    drawUnderTabBar: true
  }

  _isMounted = false

  state = {
    product: null
  }

  componentWillMount () {
    this._isMounted = true

    console.log('props:', this.props)

    productStore
      .getProduct(this.props.item.id)
      .then(this.onData)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  onData = product => {
    if (!this._isMounted) {
      return
    }

    this.setState({
      product: Object.assign(product, {
        img: product.img.replace(/http:\/\//, 'https://')
      })
    })
  }

  render () {
    if (!this.state.product) {
      return (
        <View style={styles.loadContainer}>
          <Text style={styles.load}>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.state.img}}
          style={styles.image}
        />
        <Text>TODO: Product Page</Text>
        <Text>{JSON.stringify(this.state.product)}</Text>
      </View>
    )
  }
}
