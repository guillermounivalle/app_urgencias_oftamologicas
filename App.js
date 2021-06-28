import React from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import Main from './screens/Main';


//Components
import Header from './components/header';

import { LogBox } from 'react-native';
//import {createStore} from 'redux';
//import store from './redux_folder/store';
import {ConfigureStore}  from './redux_folder/store';
import SwiperImage from './components/swiperimage';

import { auth }from './controllers/firebase'

//Redux  (flux architecture)
import { Provider } from 'react-redux';
const store = ConfigureStore();

const Stack = createStackNavigator();


class App extends React.Component{
	constructor(props){
		super(props);
			}
	
	

	render(){
		LogBox.ignoreLogs(['Setting a timer for a long period of time']);
		return(
			<Provider store = {store}>
				<Main/>
			</Provider>
			);
		};	
	};
	
	export default App;