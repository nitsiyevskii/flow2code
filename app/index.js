import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { registerScreens } from './views'
import { Navigation } from 'react-native-navigation'

const __DEV__ = true;
if (!__DEV__) {
	console.log = () => { };
}
console.disableYellowBox = true;

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginContainer} />
        <Stack.Screen name="Dashboard" component={DashboardContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;