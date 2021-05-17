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

import { auth }from './controllers/firebase'

//Redux  (flux architecture)
import { Provider } from 'react-redux';
const store = ConfigureStore();

const Stack = createStackNavigator();


class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			session: true
		};

		this.moduleInit = this.moduleInit.bind(this);
	}
	
	UNSAFE_componentWillMount(){
		auth.onAuthStateChanged((user)=>{
			if(user){
				//this.setState({session: true});
				console.log('Usuario logueado');
				console.log('user ====> ' + JSON.stringify(user));
			}
			else{
				//this.setState({session: false});
				console.log('Usuario no logueado');
			}
		})
	} 

	moduleInit = () =>{
		if(this.state.session){
			return(
				<Provider store = {store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen  
							name="Home" 
							component={Home}/>
						<Stack.Screen 
							options={{title: "Registro"}} 
							name="Register" 
							component={Register}/>	
						<Stack.Screen  
						  options={{title: "log in"}} 
							name="Login" 
							component={Login}/>	
								
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
			);
		}else{
			return(
				<Provider store = {store}>
				<NavigationContainer>
					<Stack.Navigator>
					<Stack.Screen 
							options={{title: "Registro"}} 
							name="Register" 
							component={Register}/>
						<Stack.Screen  
						  options={{title: "log in"}} 
							name="Login" 
							component={Login}/>	
						<Stack.Screen  
							name="Home" 
							component={Home}/>		
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
			)
		}
	}
	
	render(){
		LogBox.ignoreLogs(['Setting a timer for a long period of time']);
		return(
				this.moduleInit()
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