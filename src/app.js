
import {Navigation} from 'react-native-navigation'

import {registerViews} from './views'
import HomeView from './views/home'
import SearchView from './views/search'

registerViews()

Navigation.startTabBasedApp({
  tabs: [
    HomeView.navigatorOptions,
    SearchView.navigatorOptions
  ]
})
