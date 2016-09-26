
import React, {Component} from 'react'

import Signal from './signal'
import render from './render'

const initialState = {
  items: [
    {
      key: 'a',
      firstname: 'Aaron',
      surname: 'Zeebo'
    },
    {
      key: 'b',
      firstname: 'Betsy',
      surname: 'Youn'
    },
    {
      key: 'c',
      firstname: 'Chuck',
      surname: 'Xavier'
    },
    {
      key: 'd',
      firstname: 'Dave',
      surname: 'Walters'
    },
    {
      key: 'e',
      firstname: 'Elliot',
      surname: 'Vivian'
    }
  ],
  orderBy: 'firstname'
}

export default class FilterList extends Component {
  state = initialState

  constructor (props) {
    super(props)

    this.store = new Signal(initialState)
    this.store.register(this.onChange)

    this.unsubscribe = null

    this.render = render.bind(this)
  }

  componentWillMount () {
    this.unsubscribe = this.store.subscribe(state => {
      this.setState(state)
    })
  }

  componentWillUnmount () {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  onChange = (state, event) => {
    if (event.action === 'REORDER') {
      state.orderBy = event.payload
      state.items = state.items.sort((a, b) => {
        return a[event.payload] > b[event.payload]
      })
      return state
    }

    return state
  }

  onReorder = orderBy => {
    this.store.emit({
      action: 'REORDER',
      payload: orderBy
    })
  }

  getButtonHighlight (stateOrder, name) {
    return stateOrder === name
      ? 'rgb(35,206,107)'
      : 'rgb(44,44,44)'
  }
}
