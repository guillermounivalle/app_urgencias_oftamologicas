import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions,ScrollView} from 'react-native'


const OPTIONS = ['Ninguna', 'Especialidad 1', 'Especialidad 2', 'Especialidad 3', 'Especialidad 4', 'Especialidad 5']
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalPicker = (props) => {

	const onPressOption = (option) => {
		props.changeModalVisible(false);
		props.setData(option);
	};

	const options = OPTIONS.map((option, index) => {
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
	};
	
	

const styles = StyleSheet.create({
	container: {
		flex: 1,
    		},
	modal: {
		margin: 5,
		marginTop: HEIGHT/3,
		backgroundColor: "white",
		borderRadius: 20,
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
	}
});

	export {ModalPicker}