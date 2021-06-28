import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions,ScrollView, TouchableHighlight} from 'react-native';
import {SimpleLineIcons , FontAwesome, Ionicons, Fontisto  } from '@expo/vector-icons';



const OPTIONS_REGISTER = ['Ninguna', 'Especialidad 1', 'Especialidad 2', 'Especialidad 3', 'Especialidad 4', 'Especialidad 5']
const OPTIONS_USER = ['profile', 'logout'];
const OPTIONS_MENU = ["Evaluation", 'HomeControl', 'Hospitalization', 'PatientData', ];
const OPTIONS_MENU_APP = ['Evaluación', 'Control Ambulatorio', 'Hospitalización', 'Datos del Paciente', ];
const OPTIONS_NAME_ICON = ['doctor','nursing-home', 'bed-patient', 'file-1' ];
const ICON_OPTIONS_USER = ["user-circle-o", "logout"];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalPicker = (props) => {

	if(props.modalModuleCall === "register"){
		const onPressOption = (option) => {
			props.changeModalVisible(false);
			props.setData(option);
		};
	
		const options = OPTIONS_REGISTER.map((option, index) => {
			return (
				<TouchableOpacity
					style={styles.options}
					key={index}
					onPress={()=> onPressOption(option)}
				>
					<Text style={styles.textOptions}>
						{option}
					</Text>
				</TouchableOpacity>
			);
		});
	
		return(
			<TouchableOpacity
				onPress={()=> props.changeModalVisible(false)}
				style={StyleSheet.container}
			>
				<View style={[styles.modal]}>
					<Text style={{justifyContent: 'center', paddingBottom: 10, fontSize:20, color:'#585858'}}>
						Elige una especialidad
					</Text>
					<ScrollView>
						{options}
					</ScrollView>
				</View>
			</TouchableOpacity>
		)
	}
	if(props.modalModuleCall === "user"){
		return(
			<View>
				<TouchableOpacity  
					style={styles.modalUserOption}
					onPress={()=> {props.changeModalVisible('user', false)} }>
					<View 
						style={styles.header}>
						<FontAwesome
							name="user-circle-o"
							size={30}
							color='#5882FA'
							style={styles.iconMenu}/> 
						<Text style={styles.headertext}> Mi perfíl </Text>
					</View>		
				</TouchableOpacity >
				<TouchableOpacity  
					style={styles.modalUserOption}
					onPress={()=> {props.changeModalVisible("user", false); props.logoutSession();}}>
					<View 
						style={styles.header}>
						<SimpleLineIcons
							name="logout"
							size={30}
							color='#5882FA'
							style={styles.iconMenu}/> 
						<Text style={styles.headertext}> Logout </Text>
					</View>		
				</TouchableOpacity >
				<TouchableOpacity  
					style={styles.modalUserOption}
					onPress={()=> {props.changeModalVisible("user", false), console.log('===> cerrar')}}>
					<View 
						style={styles.header}>
						<Ionicons
							name="ios-close-circle-outline"
							size={40}
							color='#5882FA'
							style={styles.iconMenu}/> 
						<Text style={styles.headertext}> Cerrar </Text>
					</View>		
				</TouchableOpacity >	
			</View>
		);
	};
	if(props.modalModuleCall === "menu"){
		const onPressOption = (option) => {
			props.changeModalVisible(false);
			props.navigationToScreenSelected(option);
		};
		const options = OPTIONS_MENU.map((option, index) => {
			return (
				<TouchableOpacity  
					style={styles.modalUserOption}
					key={index}
					onPress={()=> {props.changeModalVisible("menu", false); onPressOption(option)}}>
					<View 
						style={styles.header}>
						<Fontisto 
							name={OPTIONS_NAME_ICON[index]} 
							size={30} 
							color='#5882FA'
							style={styles.iconMenu}/> 
						<Text style={styles.headertext}> {OPTIONS_MENU_APP[index]} </Text>
					</View>		
				</TouchableOpacity >
			);
		});

		return(
			<View>
				{options}
				<TouchableOpacity  
					style={styles.modalUserOption}
					onPress={()=> {props.changeModalVisible("menu", false), console.log('===> cerrar')}}>
					<View 
						style={styles.header}>
						<Ionicons
							name="ios-close-circle-outline"
							size={40}
							color='#5882FA'
							style={styles.iconMenu}/> 
						<Text style={styles.headertext}> Cerrar </Text>
					</View>		
				</TouchableOpacity >	
			</View>
		);
	};
};
	
	
const styles = StyleSheet.create({
	container: {
		flex: 1,
    		},
	modal: {
		margin: 5,
		marginTop: HEIGHT/3,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 35,
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
	modalUserOption:{
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowRadius: 4,
		height:40,
		paddingTop:20,
		marginBottom:20
	},
	options: {
		alignItems: 'flex-start',
		borderColor: '#BDBDBD',
		borderWidth: 1,
		
	},
	textOptions: {
		margin: 20,
		fontSize: 20,
		fontWeight: '200',
		color:'#585858'
	},
	header: {
		width:'100%',
		height:'100%',
		flexDirection: 'row',
		alignItems:'center',
		justifyContent:'center'
	},
	headertext:{
		fontWeight: '300',
		fontSize: 20,
		color: "#333",
		letterSpacing: 1,
		textAlign: 'center', 
		marginLeft: 40
	},
	iconMenu:{
		position: 'absolute',
		left: 10
	}
});

	export {ModalPicker}