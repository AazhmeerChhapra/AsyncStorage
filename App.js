import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function App() {

  const Stack = createNativeStackNavigator();

  const checkUsernameInLocalStorage = async () => {
    const username = await AsyncStorage.getItem("username");
    return username !== null;
}

  return (
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen 
    name='LoginScreen'
    component={LoginScreen}
    options={{
      headerShown:false
    }}
    
    />
    <Stack.Screen 
    name='Dashboard'
    component={Dashboard}
    options={{
      headerShown:true
    }}
    
    />
  </Stack.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
