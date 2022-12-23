import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import IntervalScreen from './IntervalScreen';
import TimerScreen from './TimerScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Interval" component={IntervalScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Timer" component={TimerScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} export default App;