import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { View, Text, Button, ScrollView, StyleSheet, TextInput} from 'react-native';
import firebase from '../controllers/firebase';
import regexEvaluator from '../shared/regex';
import * as actions from '../redux_folder/actions/actionsCreators';
import {connect} from 'react-redux';
import {userinfo} from '../redux_folder/actions/actionsCreators';



class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            id: "",
			name:"",
			lastname:"",
			email:"Jara@gmail.com",
			password:"1234",
            speciality:"",
            password1: ""
        };

        this.handleChangeText = this.handleChangeText.bind(this);
        this.resetInput = this.resetInput.bind(this);
        this.verifyCorrectEmailAndPassword = this.verifyCorrectEmailAndPassword.bind(this);
        this.verifyPassword = this.verifyPassword.bind(this);
        this.verifyuserExist = this.verifyuserExist.bind(this);
        this.lowerCaseEmail = this.lowerCaseEmail.bind(this);


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
            const user = firebase.db.collection('medicalstaff');
            const snapshot = await user.where('email', '==', this.state.email).get();
            if (snapshot.empty) {
                alert("La cuenta de usuario no está registrada")
                return;
            }
            else{
                snapshot.forEach(doc => {
                    this.setState({
                        id:doc.id,
                        name: doc.data().name,
                        lastname: doc.data().lastname,
                        admin: doc.data().admin,
                        active: doc.data().active,
                        password1: doc.data().password
                    });
                });
                if(this.verifyPassword(this.state.password1) === true){
                    this.resetInput();
                    this.props.navigation.navigate('Home');
                }
                else{
                    alert("Contraseña incorrecta");
                };
            };
        };
    };


    render(){
        //console.log('=====> '+ JSON.stringify(this.props.userinfo));
        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputGroup}>
                    <TextInput 
                        placeholder="Email"
                        onChangeText={value => this.handleChangeText("email",  this.lowerCaseEmail(value))}
                        value={this.state.email}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput 
                        placeholder="Password"
                        onChangeText={value => this.handleChangeText("password", value)}
                        value={this.state.password}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Button title="Login" onPress={() => this.verifyuserExist()}/>
                </View>
            </ScrollView>
        );
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


const styles = StyleSheet.create({
	inputGroup: {
		flex:1,
		padding: 0,
		marginBottom: 40,
		borderWidth: 1,
		borderColor: '#cccccc'
	},
	container: {
		flex: 1,
		padding: 35
	}
});	


export default connect(mapStateToProps)(Login);



     





