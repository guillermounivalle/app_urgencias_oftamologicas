import React from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import { LogBox } from 'react-native';
//import {createStore} from 'redux';
//import store from './redux_folder/store';
import {ConfigureStore}  from './redux_folder/store';
import SwiperImage from './components/swiperimage';

//Redux  (flux architecture)
import { Provider } from 'react-redux';
const store = ConfigureStore();
const Stack = createStackNavigator();


class App extends React.Component{
	constructor(props){
		super(props);
	}
	
	componentDidMount(){
		
	} 
	
	render(){
		LogBox.ignoreLogs(['Setting a timer for a long period of time'])
;
		return(
			<Provider store = {store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen  
							name="Register" 
							component={Register}/>
						<Stack.Screen  
							name="Login" 
							component={Login}/>	
						<Stack.Screen  
							name="Home" 
							component={Home}/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
			);
		};	
	};
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
		},
	});
	export default App;