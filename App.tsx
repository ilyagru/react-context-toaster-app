/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import RootStackNavigationContainer from './src/navigation'
import { PortalProvider, PortalConsumer } from './src/toaster'

const App = () => {
  return (
    <PortalProvider>
      <StatusBar barStyle="dark-content" />
      <PortalConsumer gateName="toaster" />
      <RootStackNavigationContainer />
    </PortalProvider>
  )
}

export default App
