import React from 'react';
import {StyleSheet, Text, View, Modal, Dimensions} from 'react-native';
import {MaterialIcons, FontAwesome  } from '@expo/vector-icons';
import {ModalPicker} from './modalPicker';
import { auth }from '../controllers/firebase';

class Header extends React.Component {
	constructor(props){
		super(props);

		this.state={
			isModalUserVisible: false,
			isModalMenuVisible: false
		}

		this.openMenu = this.openMenu.bind(this);
		this.userOption = this.userOption.bind(this);
		this.changeModalVisible = this.changeModalVisible.bind(this);
		this.navigationToScreenSelected = this.navigationToScreenSelected.bind(this)
	}

	changeModalVisible = (option, bool) => {
		if(option == "user"){
			this.setState({isModalUserVisible: bool});
			return;
		};
		if(option == "menu"){
			this.setState({isModalMenuVisible: bool});
			return;
		};
	};

	openMenu = () => {
		this.changeModalVisible("menu", !this.state.isModalMenuVisible);
		//console.log('isModalMenuVisible ====> ' + this.state.isModalMenuVisible);
		console.log('on press menu Icon');
	};

	userOption = () => {
		this.changeModalVisible("user", !this.state.isModalUserVisible);
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

	navigationToScreenSelected = (module) => {
		console.log('=====> navigate' + module);
		this.props.navigation.navigate(module, {screen: 'module'});
	};

	render(){
		return(
		<View style={styles.header}>
			<MaterialIcons 
				name='menu' 
				size={30}
				color='#5882FA'
				onPress={() => this.openMenu()}
				style={styles.iconMenu}/>	
				<Modal
					transparent={true}
					animationType='fade'
					visible={this.state.isModalMenuVisible}
					onRequestClose={()=> this.changeModalVisible("menu", false)}>
						<View style={[styles.viewModal, {left:10, height: 315, width:screen.width*0.60}]}>
							<ModalPicker
								style={[styles.viewModal, {left:10}]}
								changeModalVisible={this.changeModalVisible}
								modalModuleCall="menu"
								navigationToScreenSelected={this.navigationToScreenSelected}>
							</ModalPicker>
						</View>
				</Modal>
			<View>
				<Text style={styles.headertext}>Home</Text>
			</View>
			<FontAwesome 
				name="user-circle" 
				size={30}
				color='#5882FA'
				onPress={() => this.userOption()}
				style={styles.iconUser}/>
				<Modal
					transparent={true}
					animationType='fade'
					visible={this.state.isModalUserVisible}
					onRequestClose={()=> this.changeModalVisible("user", false)}>
						<View style={[styles.viewModal, {right:10}]}>
							<ModalPicker
								style={[styles.viewModal, {right:10}]}
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

/**
 * <Modal
					style={styles.centeredViewModal}
					transparent={true}
					animationType='fade'
					visible={this.state.isModalUserVisible}
					onRequestClose={()=> this.changeModalVisible("user", false)}>
						<View style={styles.centeredViewModal}>
							<ModalPicker
								style={styles.centeredViewModal}
								changeModalVisible={this.changeModalVisible}
								modalModuleCall="user"
								logoutSession={this.logoutSession}>
							</ModalPicker>
						</View>
				</Modal>
 */


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
	viewModal: {
		width:screen.width /2, 
		height: 190,
		borderRadius: 10,
		borderColor: '#BDBDBD',
		borderWidth: 2,
		elevation: 3,
		backgroundColor:"#fff",
		position:'absolute',
		marginTop: 50
	  }
});

export default Header;