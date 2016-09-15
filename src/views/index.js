
import {Navigation} from 'react-native-navigation'

import HomeView from './home'
import SearchView from './search'
import PushView from './pushed'

const register = View => {
  Navigation.registerComponent(
    View.navigatorOptions.screen,
    () => View
  )
}

export function registerViews () {
  register(HomeView)
  register(SearchView)
  register(PushView)
}
