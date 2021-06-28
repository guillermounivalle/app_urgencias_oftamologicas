import React from 'react'
import { View, Text, StyleSheet} from 'react-native';
import { auth }from '../controllers/firebase';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import Register from './Register';
import Login from './Login';
import Home from './Home';
import HomeControl from './HomeControl';
import Evaluation from './Evaluation';
import Hospitalization from './Hospitalization';
import PatientData from './PatientData';
import ProfileUser from './ProfileUser';
import Reports from './Reports';
import Surgery from './Surgery';
import UserManager from './UserManager';


//Components
import Header from '../components/header';
import SpinnerApp from '../components/spinnerapp';


const Stack = createStackNavigator();


class Main extends React.Component {
    constructor(props){
        super(props);

        this.state = {
			initScreenMain: true,
            spinner: false,
			isUserSessionActivated: false
        };
		this.verifySessionUser = this.verifySessionUser.bind(this);
		this.showScreeninitial = this.showScreeninitial.bind(this);
    };

	
    componentDidMount(){
		setTimeout(() => {
			this.setState({
				spinner: true
			  });
	   }, 2000);
		
        setTimeout(() => {
             this.verifySessionUser();
        }, 5000);
    };

	verifySessionUser = () => {
		auth.onAuthStateChanged((user)=>{
			if(user){
				this.setState({
					spinner: false,
					isUserSessionActivated: true,
					initScreenMain: false
				  });
				console.log('Usuario logueado');
				console.log('user 1===> ' + JSON.stringify(user));
			}
			else{
				this.setState({
					spinner: false,
					isUserSessionActivated: false,
					initScreenMain: false
				  });
				console.log('Usuario no logueado');
				console.log('user2 ===> ' + JSON.stringify(user));
			}
		})
	}

	showScreeninitial = () => {
		if(this.state.initScreenMain){
			return(
				<SpinnerApp/>
			);
		}
		if(this.state.isUserSessionActivated){
			return(
				<NavigationContainer>
						<Stack.Navigator
							screenOptions= {{
							headerTitle: ()=> <Header/>,
							headerLeft: null
						}}>
							<Stack.Screen  
								options={{title: "Home"}} 
								name="Home" 
								component={Home}/>
							<Stack.Screen  
								options={{title: "HomeControl"}} 
								name="HomeControl" 
								component={HomeControl}/>
							<Stack.Screen  
								options={{title: "Evaluation"}} 
								name="Evaluation" 
								component={Evaluation}/>
							<Stack.Screen  
								options={{title: "Hospitalization"}} 
								name="Hospitalization" 
								component={Hospitalization}/>					
							<Stack.Screen  
								options={{title: "PatientData"}} 
								name="PatientData" 
								component={PatientData}/>
							<Stack.Screen  
								options={{title: "ProfileUser"}} 
								name="ProfileUser" 
								component={ProfileUser}/>
							<Stack.Screen  
								options={{title: "Reports"}} 
								name="Reports" 
								component={Reports}/>
							<Stack.Screen  
								options={{title: "Surgery"}} 
								name="Surgery" 
								component={Surgery}/>
							<Stack.Screen  
								options={{title: "UserManager"}} 
								name="UserManager" 
								component={UserManager}/>				
					</Stack.Navigator>
				</NavigationContainer>
			);
		}
		else{
			return(
				<NavigationContainer>
						<Stack.Navigator>
							<Stack.Screen  
								options={{title: "log in"}} 
								name="Login" 
								component={Login}/>			
							<Stack.Screen 
								options={{title: "Registro"}} 
								name="Register" 
								component={Register}/>	
					</Stack.Navigator>
				</NavigationContainer>
			);
		};
	};


    render(){
		return(
			this.showScreeninitial()
		);
		
    }
}

const styles = StyleSheet.create({

    
  });

  export default Main;