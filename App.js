import React from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';

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
		this.state={
			session: true,
			initialRoute: ""
		};

	}
	
	UNSAFE_componentWillMount(){
		auth.onAuthStateChanged((user)=>{
			if(user){
				this.setState({initialRoute: "Home"});
				console.log('Usuario logueado');
				console.log('user 1===> ' + JSON.stringify(user));
			}
			else{
				this.setState({initialRoute: "Login"});
				console.log('Usuario no logueado');
				console.log('user2 ===> ' + JSON.stringify(user));
			}
		})
	} 
//
	render(){
		LogBox.ignoreLogs(['Setting a timer for a long period of time']);
		const routeInital = this.state.initialRoute;
		return(
			<Provider store = {store}>
				<NavigationContainer>
					<Stack.Navigator
					initialRouteName={routeInital}
					screenOptions= {{
				  		headerTitle: ()=> <Header/>
					}}>
						<Stack.Screen  
					  		options={{title: "log in"}} 
							name="Login" 
							component={Login}/>	
						<Stack.Screen  
					  		options={{title: "Home"}} 
							name="Home" 
							component={Home}/>		
						<Stack.Screen 
							options={{title: "Registro"}} 
							name="Register" 
							component={Register}/>	
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
		);
		};	
	};
	
	export default App;