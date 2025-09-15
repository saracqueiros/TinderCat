import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import TabsStack from './src/routes/TabsStack';
import { StatusBar } from "expo-status-bar";

enableScreens(true);

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <TabsStack />
    </NavigationContainer>
  );
}

export default App;
