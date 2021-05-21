import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Dimensions, Modal, TouchableHighlight} from 'react-native';
import firebase from '../controllers/firebase';
import regexEvaluator from '../shared/regex';
import SwiperImage from '../components/swiperimage';
import {ModalPicker} from '../components/modalPicker';
import { auth }from '../controllers/firebase';
import { Ionicons } from '@expo/vector-icons'; 





class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id: "",
			name:"",
			lastname:"",
			email:"",
			password:"",
			validatepassword:"",
			speciality:"Especialidad",
			colorTextSpeciality: '#A4A4A4',
			active: false,
			admin: false,
			isModalVisible: false,
			iconShowOrHidePassword:"eye-outline",
            showPassword:true
		};
		

		this.handleChangeText = this.handleChangeText.bind(this);
		this.resetInput = this.resetInput.bind(this);
		this.verifyTextInputIsEmpty = this.verifyTextInputIsEmpty.bind(this);
		this.verifyuserExist = this.verifyuserExist.bind(this);
		this.createNewUser = this.createNewUser.bind(this);
		this.lowerCaseEmail = this.lowerCaseEmail.bind(this);
		this.navigateToLogin = this.navigateToLogin.bind(this);
		this.changeModalVisible = this.changeModalVisible.bind(this);
		this.setData = this.setData.bind(this);
		this.isEqualPassword = this.isEqualPassword.bind(this);
		this.showOrHidePassword = this.showOrHidePassword.bind(this);
    this.iconShowOrHidePassword = this.iconShowOrHidePassword.bind(this);
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
			validatepassword: "",
			speciality:"Especialidad",
			colorTextSpeciality:'#A4A4A4',
			isModalVisible: false
		});
	};	
	
	lowerCaseEmail = (value) => {
		const email = value;
		const lowercaseemail = email.toLowerCase();
		return lowercaseemail;
	}
	
	isEqualPassword = () => {
		if(this.state.password === this.state.validatepassword){
			return true;
		}
		else{
			alert('Las contraseñas no son iguales');
			return false;
		}
	}

	navigateToLogin = () => {
		this.props.navigation.navigate('Login');
	}

	changeModalVisible = (bool) => {
		this.setState({isModalVisible: bool});
	}

	setData = (option) => {
		this.setState({speciality: option, colorTextSpeciality:'#2E2E2E'});
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
		if(!this.state.id.trim()){
			alert('El campo "id" debe estar diligenciado');
			return;
		}
		if(!this.state.name.trim()){
			alert('El campo "Nombre" debe estar diligenciado');
			return;
		}
		if(!this.state.lastname.trim()){
			alert('El campo "Apellido" debe estar diligenciado');
			return;
		}
		if(!this.state.email.trim()){
			alert('El campo "Email" debe estar diligenciado');
			return;
		}
		if(!this.state.password.trim()){
			alert('El campo "Contraseña" debe estar diligenciado');
			return;
		}
		if(this.state.speciality == "Especialidad"){
			alert('Por favor ingrese una especialidad');
			return;
		}
		if(!this.isEqualPassword()){
			return;
		}
		else{
			this.verifyuserExist();
		};
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
		let emailRegex = regexEvaluator.emailRegex;
		let passwordRegex = regexEvaluator.passwordRegex;
		if(passwordRegex.test(this.state.password) === true){
			alert('La contraseña no puede contener los siguiente caracteres ( ) $ % & | < > #');
		}else if(emailRegex.test(this.state.email) === false){
			alert('El email ingresado no está escrito correctamente');
			this.setState({email:""})
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
				auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then(()=> {
					console.log("Document successfully written!");
					alert('User have been saved');
					this.resetInput();
					this.props.navigation.navigate('Home');
				})
				.catch((error) => { 
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log('ErrorCode ==> '+ errorCode + " ErrorMessage ===> " + errorMessage );
				});
			})
			.catch((error)=> {
				console.error("Error writing document: ", error);
				alert('User have not been saved');
			});
			
		};
	};
	
	render(){
		return (
			<View style={styles.container}>
				<SwiperImage />
				<ScrollView style={{flex:1}}>
				<View style={styles.inputGroup}>
					<TextInput
						style={styles.textInput}
						placeholderTextColor="#A4A4A4"
						placeholder="id"
						keyboardType={"number-pad"}
						onChangeText={value => this.handleChangeText("id", value)}
						value={this.state.id}/>
				</View>
				<View style={styles.inputGroup}>
					<TextInput 
						style={styles.textInput}
						placeholderTextColor = "#A4A4A4"
						placeholder="Nombre"
						onChangeText={value => this.handleChangeText("name", value)}
						value={this.state.name}/>
				</View>
				<View style={styles.inputGroup}>
					<TextInput 
						style={styles.textInput}
						placeholderTextColor = "#A4A4A4"
						placeholder="Apellido"
						onChangeText={value => this.handleChangeText("lastname", value)}
						value={this.state.lastname}/>
				</View>
				<View style={styles.inputGroup}>
					<TextInput 
						style={styles.textInput}
						placeholderTextColor = "#A4A4A4"
						placeholder="Email"
						onChangeText={value => this.handleChangeText("email", this.lowerCaseEmail(value))}
						value={this.state.email}/>
				</View>
				<View style={[styles.inputGroup, {flexDirection:'row', alignItems:'center'}]}>
                    <TextInput 
                        style={[styles.textInput, {position:'absolute'}]}
						placeholder="Contraseña"
						placeholderTextColor = "#A4A4A4"
                        secureTextEntry={this.state.showPassword}
                        onChangeText={value => this.handleChangeText("password", value)}
                        value={this.state.password}
                    />
                    <View style={styles.iconShoworhidePassword}>
                        {this.iconShowOrHidePassword()}
                    </View>
                </View>
				<View style={[styles.inputGroup, {flexDirection:'row', alignItems:'center'}]}>
                    <TextInput 
                        style={[styles.textInput, {position:'absolute'}]}
						placeholder="Confirmar Contraseña"
						placeholderTextColor = "#A4A4A4"
                        secureTextEntry={this.state.showPassword}
                        onChangeText={value => this.handleChangeText("validatepassword", value)}
                        value={this.state.validatepassword}
                    />
                    <View style={styles.iconShoworhidePassword}>
                        {this.iconShowOrHidePassword()}
                    </View>
                </View>
				<View style={styles.inputGroup}>
					<TouchableOpacity
						onPress={()=> this.changeModalVisible(true)}>
						<Text style={{color:this.state.colorTextSpeciality, fontSize:20}}>{this.state.speciality}</Text>
					</TouchableOpacity>
					<Modal
						style={styles.centeredViewModal}
						transparent={true}
						animationType='fade'
						visible={this.state.isModalVisible}
						onRequestClose={()=> this.changeModalVisible(false)}>
						<View style={styles.centeredViewModal}>
						<ModalPicker
							changeModalVisible={this.changeModalVisible}
							setData={this.setData}
							modalModuleCall="register">
						</ModalPicker>
						</View>
					</Modal> 
				</View>
				<TouchableHighlight onPress={() => this.verifyTextInputIsEmpty()}>
						<View style={styles.buttonRegister}>
							<Text style={styles.textButtonRegister}>
								REGISTRAR CUENTA
							</Text>
						</View>
				</TouchableHighlight>
				<View style={styles.containerTextGoToLogin}>
					<Text style={[styles.textInput, {color: '#585858'}]}>
						Tienes una cuenta?
					</Text>
					<Text 
						style={styles.textGoToLogin}
						onPress={() => this.navigateToLogin()}>
						Login
					</Text>
				</View>
			</ScrollView>
			</View>
			);
		}
	};
	
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
	textInput: {
		 fontSize: 20,
		 color: '#424242',
		 left: 15
	},
	buttonRegister: {
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
	containerTextGoToLogin:{
		flexDirection: 'row',
		paddingLeft: 8
	},
	textGoToLogin:{
		fontSize: 18,
		color: '#2E64FE',
		fontWeight: "100",
		textDecorationLine: "underline",
		paddingLeft:20
	},
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#FAFAFA',
		
	},
	centeredViewModal: {
		width:screen.width, 
		height: screen.height*0.7,
	  },
	  modalView: {
		margin: 5,
		marginTop: 200,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
   		shadowRadius: 4,
		elevation: 5,
		borderRadius: 10,
		borderColor: '#BDBDBD',
		borderWidth: 3,
	},
	iconShoworhidePassword:{
        position: 'absolute',
		right: 25
    }
});	
	
export default Register;
