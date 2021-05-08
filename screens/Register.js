import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Button, ScrollView, StyleSheet, TextInput} from 'react-native';
import firebase from '../controllers/firebase';


class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
            id: "",
			name:"",
			lastname:"",
			email:"",
			password:"",
			speciality:"",
			active: false,
			admin: false
		};
		
		this.handleChangeText = this.handleChangeText.bind(this);
		this.resetInput = this.resetInput.bind(this);
		this.verifyuserExist = this.verifyuserExist.bind(this);
		this.createNewUser = this.createNewUser.bind(this);
	};


	handleChangeText = (name, value) => {
		this.setState({[name]: value});
	};


	resetInput = () => {
		this.setState({
			id: "",
			name:"",
			lastname:"",
			email:"",
			password:"",
			speciality:"",
		});
	};	


	verifyuserExist = async () => {
		const iD = this.state.id;
		const user = firebase.db.collection('medicalstaff').doc(iD);
		const doc = await user.get();
		if (!doc.exists) {
			  console.log('No such document!');
			  this.createNewUser(iD);
		} else {
			  console.log('Document data:', doc.data());
			  alert('El usuario ya existe');
			  this.resetInput();
		};
	};


	createNewUser = async (id) => {
		let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		let passwordRegex = /[$%&|?()<>#]/;
		if(passwordRegex.test(this.state.password) === true){
			alert('La contraseña no puede contener los siguiente caracteres ( ) $ % & | < > #');
		}else if(emailRegex.test(this.state.email) === false){
			alert('El email ingresado contiene caracteres erroneos');
		}else{
			await firebase.db.collection('medicalstaff').doc(id).set({
				name: this.state.name,
				lastname: this.state.lastname,
				email: this.state.email,
				password: this.state.password,
				speciality: this.state.speciality,
				active: this.state.active,
				admin: this.state.admin
			})
			.then(() => {
				console.log("Document successfully written!");
				alert('User have been saved');
				this.resetInput();
				this.props.navigation.navigate('Home');
			})
			.catch((error) => { 
				console.error("Error writing document: ", error);
				alert('User have not been saved');
			});
		};
	};

	render(){
		return (
			<ScrollView style={styles.container}>
				<View style={styles.inputGroup}>
					<TextInput 
						placeholder="id"
						keyboardType={"number-pad"}
						onChangeText={value => this.handleChangeText("id", value)}
						value={this.state.id}
					/>
				</View>
				<View style={styles.inputGroup}>
					<TextInput 
						placeholder="Nombre"
						onChangeText={value => this.handleChangeText("name", value)}
						value={this.state.name}
					/>
				</View>
				<View style={styles.inputGroup}>
					<TextInput 
						placeholder="Apellido"
						onChangeText={value => this.handleChangeText("lastname", value)}
						value={this.state.lastname}
					/>
				</View>
				<View style={styles.inputGroup}>
				<TextInput 
						placeholder="Email"
						onChangeText={value => this.handleChangeText("email", value)}
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
				<TextInput 
						placeholder="Speciality"
						onChangeText={value => this.handleChangeText("speciality", value)}
						value={this.state.speciality}
					/>
				</View>
				<View style={styles.inputGroup}>
					<Button title="Registrarse" onPress={() => this.verifyuserExist()}/>
				</View>
	
			</ScrollView>
		);
	}
};


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

export default Register;
