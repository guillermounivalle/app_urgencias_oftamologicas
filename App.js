import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])
const AppStack = () => {
	return(
		<Stack.Navigator>
			<Stack.Screen  name="Register" component={Register}/>
			<Stack.Screen  name="Login" component={Login}/>
			<Stack.Screen  name="Home" component={Home}/>
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<NavigationContainer>
			<AppStack/>
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
