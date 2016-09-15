
import {Navigation} from 'react-native-navigation'

import HomeView from './home'
import SearchView from './search'
import PushView from './pushed'
import PaymentView from './payment'
import BasketView from './basket'

const register = View => {
  Navigation.registerComponent(
    View.navigatorOptions.screen,
    () => View
  )
}

export function registerViews () {
  [
    HomeView,
    SearchView,
    PushView,
    PaymentView,
    BasketView
  ].forEach(register)
}
