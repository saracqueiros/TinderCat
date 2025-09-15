import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

type RootStackParamList = {
  Home: undefined;
  Details: { itemId?: number } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
function HomeScreen({ navigation }: HomeProps) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details', { itemId: 42 })} />
      <StatusBar style="auto" />
    </View>
  );
}

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
function DetailsScreen({ route, navigation }: DetailsProps) {
  const { itemId } = route.params ?? {};
  return (
    <View style={styles.container}>
      <Text>Details {itemId ?? 'N/A'}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false, title: 'Home' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
