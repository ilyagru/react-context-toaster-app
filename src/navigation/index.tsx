import React, { createRef } from 'react'
import { Button } from 'react-native'
import { NavigationContainerRef, ParamListBase } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen, DetailsScreen } from './screens'
import RootStackParamList from './rootStackParamList'

const navigationRef = createRef<NavigationContainerRef>()

const navigate = (name: keyof RootStackParamList, params?: ParamListBase) => {
  navigationRef.current?.navigate(name, params)
}

const RootStack = createStackNavigator<RootStackParamList>()

const RootStackNavigationContainer = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRightContainerStyle: {
            marginRight: 20,
          },
        }}>
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: options => (
              <Button
                color={options.tintColor}
                onPress={() => navigate('Details')}
                title="Details"
              />
            ),
          }}
        />
        <RootStack.Screen name="Details" component={DetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default RootStackNavigationContainer
