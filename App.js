import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';



import Article from './Screen/Article';
import Calculator from './Screen/Calculator';
import Graph from './Screen/Graph';
import Login from './Screen/Login';
import Measurment from './Screen/Measurment';
import Profile from './Screen/Profile';
import Tabs from './Screen/Tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screen/Home';
import DetailArticle from './Screen/DetailArticle';
import Calculator_res from './Screen/Calculator_res';
import Measurment_res from './Screen/Measurment _res';
import NewCalculatorRes from './Screen/NewCalculatorRes';
import NewMeasurmentRes from './Screen/NewMeasurmentRes';


export default function App() {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='HomeScreen'
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={Tabs} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DetailArticle"
          component={DetailArticle} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Article"
          component={Article} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Calculator"
          component={Calculator} />
          <Stack.Screen
          options={{ headerShown: false }}
          name="Calculator_res"
          component={NewCalculatorRes} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Graph"
          component={Graph} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Measurment"
          component={Measurment} />
          <Stack.Screen
          options={{ headerShown: false }}
          name="Measurment_res"
          component={NewMeasurmentRes} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

