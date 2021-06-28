import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { View, Text, TouchableHighlight, StyleSheet, TextInput, Dimensions, TouchableOpacity, TouchableOpacityBase} from 'react-native';
import firebase from '../controllers/firebase';
import regexEvaluator from '../shared/regex';
import * as actions from '../redux_folder/actions/actionsCreators';
import {connect} from 'react-redux';
import {userinfo} from '../redux_folder/actions/actionsCreators';
import SwiperImage from '../components/swiperimage';
import { auth }from '../controllers/firebase';
import { Ionicons } from '@expo/vector-icons'; 

import SpinnerApp from '../components/spinnerapp';




class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            id: "",
			name:"",
			lastname:"",
			email:"guilo@gmail.com",
			password:"9876543",
            speciality:"",
            iconShowOrHidePassword:"eye-outline",
            showPassword:true,
            spinner: false
        };

        this.handleChangeText = this.handleChangeText.bind(this);
        this.resetInput = this.resetInput.bind(this);
        this.verifyCorrectEmailAndPassword = this.verifyCorrectEmailAndPassword.bind(this);
        this.verifyPassword = this.verifyPassword.bind(this);
        this.verifyuserExist = this.verifyuserExist.bind(this);
        this.lowerCaseEmail = this.lowerCaseEmail.bind(this);
        this.navigateToRegister = this.navigateToRegister.bind(this);
        this.verifyTextInputIsEmpty = this.verifyTextInputIsEmpty.bind(this);
        this.showOrHidePassword = this.showOrHidePassword.bind(this);
        this.iconShowOrHidePassword = this.iconShowOrHidePassword.bind(this);

    };
    componentDidMount(){
        
    }

    handleChangeText = (name, value) => {
		this.setState({ [name]: value});
    };

    
    resetInput = () => {
		this.setState({
			email:"",
			password:"",
		});
    };
    
    lowerCaseEmail = (value) => {
		const email = value;
		const lowercaseemail = email.toLowerCase();
		return lowercaseemail;
    };

    navigateToRegister(){
        this.props.navigation.navigate('Register');
    };

    showOrHidePassword = () => {
        if(this.state.showPassword)
            this.setState({showPassword: !this.state.showPassword});

            this.setState({showPassword: !this.state.showPassword});
    };

    iconShowOrHidePassword = () => {
        if(this.state.showPassword){
            return(
                <Ionicons 
                        name="eye-outline"
                        size={24} 
                        color="black"
                        onPress={() => this.showOrHidePassword()} />
            );
        }else{
            return(
                <Ionicons 
                        name="eye-off-outline"
                        size={24} 
                        color="black"
                        onPress={() => this.showOrHidePassword()} />
            );
        };
    };

    verifyTextInputIsEmpty(){
		if(!this.state.email.trim()){
			alert('El campo "Email" debe estar diligenciado');
			return;
		}
		if(!this.state.password.trim()){
			alert('El campo "Contraseña" debe estar diligenciado');
			return;
		}
		else{
			this.verifyuserExist();
		}
	};
    
    verifyCorrectEmailAndPassword = (email, password) =>{
        let emailRegex = regexEvaluator.emailRegex;
		let passwordRegex = regexEvaluator.passwordRegex;
        if(emailRegex.test(email) === false || passwordRegex.test(password) === true){
            return false;
        }else{
            return true;
        };
    };


    verifyPassword = (password1) => {
        if(password1 == this.state.password ){
            return true;
        }else{
            return false;
        };        
    };

//this.props.actions para enviar
//this.props.

    verifyuserExist = async () => {
        const email = this.state.email;
        const password = this.state.password;
        if(this.verifyCorrectEmailAndPassword(email, password) === false){
            alert('El usuario o contraseña no es válido');
            return;
        }else{
            this.setState({ spinner: true});
            const user = firebase.db.collection('medicalstaff');
            const snapshot = await user.where('email', '==', this.state.email).where('password', '==', this.state.password).get();
            if (snapshot.empty) {
                this.setState({ spinner: false});
                alert("El usuario o contraseña no está registrado")
                return;
            }
            else{
                auth.signInWithEmailAndPassword( this.state.email,  this.state.password)
                .then((userCredential) => {
                var user = userCredential.user;
                })
                .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                });
                snapshot.forEach(doc => {
                    this.setState({
                        id:doc.id,
                        name: doc.data().name,
                        lastname: doc.data().lastname,
                        admin: doc.data().admin,
                        active: doc.data().active,
                        password1: doc.data().password
                    });
                    setTimeout(() => {
                        this.setState({ spinner: false}),
                        this.props.navigation.navigate('Home', {screen: 'Home'});
                    }, 2000);
                    
                });
            };
        };
    };


    render(){
        if(this.state.spinner){
            return(
                <SpinnerApp/>
            );
        }
        else{
            return (
                <View style={styles.container}>
                    
                    <SwiperImage />	
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.textInput} 
                            placeholder="Email"
                            onChangeText={value => this.handleChangeText("email",  this.lowerCaseEmail(value))}
                            value={this.state.email}
                        />
                    </View>
                    <View style={[styles.inputGroup, {flexDirection:'row', alignItems:'center'}]}>
                        <TextInput 
                            style={[styles.textInput, {position:'absolute'}]}
                            placeholder="Contraseña"
                            secureTextEntry={this.state.showPassword}
                            onChangeText={value => this.handleChangeText("password", value)}
                            value={this.state.password}
                        />
                        <View style={styles.iconShoworhidePassword}>
                            {this.iconShowOrHidePassword()}
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.verifyTextInputIsEmpty()}>
                        <View style={styles.buttonLogin}>
                            <Text style={styles.textButtonRegister}>
                                LOGIN
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.containerTextGoToRegister}>
                        <Text style={[styles.textInput, {color: '#585858'}]}>
                            No tienes una cuenta?
                        </Text>
                        <Text 
                            style={styles.textGoToRegister}
                            onPress={() => this.navigateToRegister()}>
                            Registrate
                        </Text>
                    </View>
                </View>
            );
        }
        
    };
};

/**
 const mapDispatchToProps = (dispatch) => {
	return{
        userinfo : (user) => dispatch(userinfo(user));
    };
};*/

const mapStateToProps = state => {
    return {
        userinfo: state.userinfo
    }
}

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
	inputGroup: {
		padding: 0,
		height: screen.height * 0.07,
		marginBottom: screen.height * 0.035,
		borderWidth: 2,
		borderColor: '#BDBDBD',
		borderRadius:5,
		opacity: 0.8, 
		justifyContent: 'center',
		fontFamily: 'Open Sans'
	},
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#FAFAFA',
    },
    textGoToRegister:{
		fontSize: 18,
		color: '#2E64FE',
		fontWeight: "100",
		textDecorationLine: "underline",
		paddingLeft:30
    },
    containerTextGoToRegister:{
		flexDirection: 'row',
        paddingLeft: 8,
        paddingTop: 20
    },
    textInput: {
        fontSize: 18,
        color: '#585858',
        left: 15
   },
   buttonLogin:{
    fontSize: 20,
    color: '#E6E6E6',
    textAlign: 'center',
   },
   buttonLogin: {
    borderWidth: 3,
    borderColor: '#BDBDBD',
    borderRadius:5,
    height: screen.height * 0.07,
    backgroundColor: '#5882FA',
    justifyContent: 'center',
    marginBottom: 10
   },
   textButtonRegister:{
    fontSize: 20,
    color: '#E6E6E6',
    textAlign: 'center',
    },
    iconShoworhidePassword:{
        position: 'absolute',
		right: 25
    },
    spinnerTextStyle: {
        color: '#2E64FE'
      },
      containerspinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
      },
});	


export default connect(mapStateToProps)(Login);



     





