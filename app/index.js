import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, observer } from 'mobx-react';
import stores from './stores';
import SignInContainer from './screens/SignIn/SignInContainer';
import DashboardContainer from './screens/Dashboard/DashboardContainer';
import MovieDetailsContainer from './screens/MovieDetails/MovieDetailsContainer';

const __DEV__ = true;
if (!__DEV__) {
  console.log = () => { };
}
console.disableYellowBox = true;

const Stack = createStackNavigator();


@observer
class App extends React.Component {
  render() {
    const { isSignedIn } = authStore
    return (
      <NavigationContainer>
        <Provider stores={stores}>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            {
              isSignedIn ? (
                <>
                  <Stack.Screen name="Dashboard" component={DashboardContainer} />
                  <Stack.Screen name="MovieDetails" component={MovieDetailsContainer} />
                </>
              ) : (
                  <>
                    <Stack.Screen name="SignIn" component={SignInContainer} />
                  </>
                )
            }
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    );
  }

}

export default App;