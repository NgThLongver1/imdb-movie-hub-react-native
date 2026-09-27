import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import MovieListScreen from './screens/MovieListScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';

const Stack = createNativeStackNavigator();

// Web deep linking configuration
const linking = {
  prefixes: ['/'],
  config: {
    screens: {
      Home: '',               // Root URL: http://localhost:8081/
      MovieList: 'movies',    // Movie List URL: http://localhost:8081/movies
      Details: 'details',     // Details URL: http://localhost:8081/details
    },
  },
};

export default function App() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer theme={DarkTheme} linking={linking}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
          />
          <Stack.Screen 
            name="MovieList" 
            component={MovieListScreen} 
          />
          <Stack.Screen 
            name="Details" 
            component={MovieDetailsScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}