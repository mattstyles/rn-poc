
import {Navigation} from 'react-native-navigation'

import {registerViews} from './views'
import HomeView from './views/home'
import SearchView from './views/search'
import BasketView from './views/basket'
import PaymentView from './views/payment'

registerViews()

const getNavigatorOptions = list => {
  return list.map(item => item.navigatorOptions)
}

Navigation.startTabBasedApp({
  tabs: getNavigatorOptions([
    HomeView,
    SearchView,
    BasketView,
    PaymentView
  ])
})
