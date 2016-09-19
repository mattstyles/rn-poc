
import {Navigation} from 'react-native-navigation'

// Tabbed views
import HomeView from './home'
import SearchView from './search'
import PaymentView from './payment'
import BasketView from './basket'

// Page Views
import PushView from './pushed'
import NavigationView from './navigation'
import ProductView from './product'

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
    PaymentView,
    BasketView,
    PushView,
    NavigationView,
    ProductView
  ].forEach(register)
}
