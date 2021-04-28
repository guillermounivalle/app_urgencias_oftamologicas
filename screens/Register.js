import React , {useState}from 'react'
import {View, Text, Button, ScrollView, StyleSheet, TextInput} from 'react-native';
import firebase from '../controllers/firebase';



const Register = (props) => {

	//Validación de caracteres especiales en email y contraseña
	let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	let passwordRegex = /[$%&|?()<>#]/;

	const [state, setState] = useState({
		id: "",
		name:"",
		lastname:"",
		email:"",
		password:"",
		speciality:"",
		active: false,
		admin: false
	});
	
	const handleChangeText = (name, value) => {
		setState({ ...state, [name]: value});
	};

	const resetInput = () => {
		setState({
			id: "",
			name:"",
			lastname:"",
			email:"",
			password:"",
			speciality:"",
		});

	};	
	
	
	const createNewUser = async (id) => {
		if(passwordRegex.test(state.password) === true){
			alert('La contraseña no puede contener los siguiente caracteres ( ) $ % & | < > #');
		}else if(emailRegex.test(state.email) === false){
			alert('El email ingresado contiene caracteres erroneos');
		}else{
			await firebase.db.collection('medicalstaff').doc(id).set({
				name: state.name,
				lastname: state.lastname,
				email: state.email,
				password: state.password,
				speciality: state.speciality,
				active: state.active,
				admin: state.admin
			})
			.then(() => {
				console.log("Document successfully written!");
				alert('User have been saved');
				resetInput();
				props.navigation.navigate('Home');
			})
			.catch((error) => { 
				console.error("Error writing document: ", error);
				alert('User have not been saved');
			});
			

		}
	};
	
	const verifyuserExist = async () => {
		const iD = state.id;
		const user = firebase.db.collection('medicalstaff').doc(iD);
		const doc = await user.get();
		if (!doc.exists) {
			  console.log('No such document!');
			  createNewUser(iD);
		} else {
			  console.log('Document data:', doc.data());
			  alert('El usuario ya existe');
			  resetInput();
		};
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<TextInput 
					placeholder="id"
					keyboardType={"number-pad"}
					onChangeText={value => handleChangeText("id", value)}
					value={state.id}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput 
					placeholder="Nombre"
					onChangeText={value => handleChangeText("name", value)}
					value={state.name}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput 
					placeholder="Apellido"
					onChangeText={value => handleChangeText("lastname", value)}
					value={state.lastname}
				/>
			</View>
			<View style={styles.inputGroup}>
			<TextInput 
					placeholder="Email"
					onChangeText={value => handleChangeText("email", value)}
					value={state.email}
				/>
			</View>
			<View style={styles.inputGroup}>
			<TextInput 
					placeholder="Password"
					onChangeText={value => handleChangeText("password", value)}
					value={state.password}
				/>
			</View>
			<View style={styles.inputGroup}>
			<TextInput 
					placeholder="Speciality"
					onChangeText={value => handleChangeText("speciality", value)}
					value={state.speciality}
				/>
			</View>
			<View style={styles.inputGroup}>
				<Button title="Registarse" onPress={() => verifyuserExist()}/>
			</View>

		</ScrollView>
		)
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

export default Register;
