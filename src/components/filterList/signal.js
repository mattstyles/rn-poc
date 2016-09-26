
import * as most from 'most'
import EventEmitter from 'eventemitter3'

const iteratorFold = (it, fn, initial) => {
  for (const value of it) {
    initial = fn(initial, value)
  }
  return initial
}

const uid = () => {
  return (Math.random() * 10000000)
    .toFixed(0)
    .toString(16)
}

class Signal {
  constructor (initialState) {
    this.emitter = new EventEmitter()
    this.reducers = new Map()

    this.source = most
      .fromEvent('action', this.emitter)
      .scan((state, event) => {
        return iteratorFold(this.reducers.values(), (state, reducer) => {
          return reducer(state, event)
        }, state)
      }, initialState)
  }

  emit = (payload) => {
    if (typeof payload !== 'object') {
      throw new Error('Incorrect payload type, expects object')
    }

    this.emitter.emit('action', payload)
  }

  subscribe = (onAction, onError, onComplete) => {
    this.source.observe(
      onAction,
      onError,
      onComplete
    )
  }

  register = (reducer, key) => {
    let k = key || uid()
    this.reducers.set(k, reducer)

    return function dispose () {
      this.reducers.delete(k)
    }
  }
}

export default Signal
