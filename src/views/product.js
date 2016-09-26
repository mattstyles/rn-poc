
import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Dimensions
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
    width: Dimensions.get('window').width - 16,
    height: Dimensions.get('window').width - 16
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '300'
  },
  sku: {
    fontSize: 11,
    color: '#808080',
    marginTop: 3
  },
  price: {
    fontSize: 36,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 16
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
    drawUnderTabBar: false
  }

  _isMounted = false

  state = {
    product: null
  }

  componentWillMount () {
    this._isMounted = true

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

    let {product} = this.state

    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            resizeMode='contain'
            source={{uri: product.img}}
            style={styles.image}
          />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.sku}>{'Product code:' + product.code}</Text>
          <Text style={styles.price}>{'£' + product.price + '/each'}</Text>
          <Text>{product.description}</Text>
          <Text style={{marginTop: 20, fontSize: 11}}>{JSON.stringify(product)}</Text>
        </View>
      </ScrollView>
    )
  }
}
