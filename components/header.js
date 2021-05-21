import React from 'react';
import {StyleSheet, Text, View, Modal, Dimensions} from 'react-native';
import {MaterialIcons, FontAwesome  } from '@expo/vector-icons';
import {ModalPicker} from './modalPicker';
import { auth }from '../controllers/firebase';

class Header extends React.Component {
	constructor(props){
		super(props);

		this.state={
			isModalVisible: false
		}

		this.openMenu = this.openMenu.bind(this);
		this.userOption = this.userOption.bind(this);
		this.changeModalVisible = this.changeModalVisible.bind(this);
	}

	changeModalVisible = (bool) => {
		this.setState({isModalVisible: bool});
		
	}

	openMenu = () => {
		console.log('on press menu Icon');
	};

	userOption = () => {
		this.changeModalVisible(!this.state.isModalVisible)
		console.log('on press User option');
	};

	logoutSession = () => {
		auth.signOut()
		.then(() => {
			

		}).catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log('ErrorCode ==> '+ errorCode + " ErrorMessage ===> " + errorMessage );
		});
	};

	render(){
		return(
		<View style={styles.header}>
				<MaterialIcons 
				name='menu' 
				size={30}
				onPress={() => this.openMenu()}
				style={styles.iconMenu}/>	
			<View>
				<Text style={styles.headertext}>Home</Text>
			</View>
			<FontAwesome 
				name="user-circle" 
				size={30}
				onPress={() => this.userOption()}
				style={styles.iconUser}/>
				<Modal
						style={styles.centeredViewModal}
						transparent={true}
						animationType='fade'
						visible={this.state.isModalVisible}
						onRequestClose={()=> this.changeModalVisible(false)}>
						<View style={styles.centeredViewModal}>
						<ModalPicker
							style={styles.centeredViewModal}
							changeModalVisible={this.changeModalVisible}
							modalModuleCall="user"
							logoutSession={this.logoutSession}>
						</ModalPicker>
						</View>
					</Modal> 
		</View>
		);
	};
};

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
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
		letterSpacing: 1
	},
	iconMenu:{
		position: 'absolute',
		left: 10
	},
	iconUser:{
		position: 'absolute',
		right: 10
	},
	centeredViewModal: {
		width:screen.width /2, 
		height: 190,
		borderRadius: 10,
		borderColor: '#BDBDBD',
		borderWidth: 2,
		elevation: 3,
		backgroundColor:"#fff",
		position:'absolute',
		right:10,
		marginTop: 50
	  },
});

export default Header;