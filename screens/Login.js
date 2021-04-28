import React, {useState} from 'react'
import { View, Text, Button, ScrollView, StyleSheet, TextInput} from 'react-native';
import firebase from '../controllers/firebase';

const Login = (props) => {

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
            password1: ""
	});

    const handleChangeText = (name, value) => {
		setState({ ...state, [name]: value});
	};

	const resetInput = () => {
		setState({
			email:"",
			password:"",
		});
    };	

    const verifyCorrectEmailAndPassword = (email, password) =>{
        if(emailRegex.test(email) === false || passwordRegex.test(password) === true){
            return false;
        }else{
            return true;
        };
    };

    const verifyPassword = (password1) => {
        if(password1 == state.password ){
            return true;
        }else{
            return false;
        };        
    };

    const verifyuserExist = async () => {
        const email = state.email;
        const password = state.password;
        if(verifyCorrectEmailAndPassword(email, password) === false){
            alert('El usuario o contraseña no es válido');
            return;
        }else{
            const user = firebase.db.collection('medicalstaff');
            const snapshot = await user.where('email', '==', state.email).get();
            if (snapshot.empty) {
                alert("La cuenta de usuario no está registrada")
                return;
            }
            else{
                snapshot.forEach(doc => {
                    setState({
                        id:doc.id,
                        name: doc.data().name,
                        lastname: doc.data().lastname,
                        admin: doc.data().admin,
                        active: doc.data().active,
                        password1: doc.data().password
                    });
                });
                if(verifyPassword(state.password1) === true){
                    resetInput();
                    props.navigation.navigate('Home');
                }
                else{
                    alert("Contraseña incorrecta");
                }
            };
        };
    };

		

    return (
		<ScrollView style={styles.container}>
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
				<Button title="Login" onPress={() => verifyuserExist()}/>
			</View>
		</ScrollView>
		);
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


export default Login;
