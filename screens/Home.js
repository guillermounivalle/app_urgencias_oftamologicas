import React from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableHighlight, Image} from 'react-native';
import SwiperImage from '../components/swiperimage';
import { auth }from '../controllers/firebase';



class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            isAdmin: false
        }

        this.adminOptions = this.adminOptions.bind(this);
        this.isClickedModuleOptions = this.isClickedModuleOptions.bind(this);
    };

    isClickedModuleOptions = (module) => {
        console.log('Haz clieckeado el módulo ' + module);
    };

    adminOptions = () => {
        if(this.state.isAdmin){
            return (
                <View style={styles.viewRow}>
                    <TouchableHighlight 
                        style={styles.touchableLeft} 
                        onPress={() => this.isClickedModuleOptions('Gestion')}
                        underlayColor="white">
                        <View style={{alignItems:'center'}}>
                            <Image 
                                style={styles.iconStyle} 
                                source={require('../assets/Gestion_usuarios.png')}/>
                            <Text style={styles.textOptionsModules}>Gestion de usuarios</Text> 
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style={styles.touchableRight} 
                        onPress={() => this.isClickedModuleOptions('Reportes')}
                        underlayColor="white">
                        <View style={{alignItems:'center'}}>
                            <Image 
                                style={styles.iconStyle} 
                                source={require('../assets/Reportes.png')}/>
                            <Text style={styles.textOptionsModules}>Generar Reportes</Text> 
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }else{
            return;
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <SwiperImage />	
                <View styles={{marginBottom: 20}}>
                    <Text style={styles.textSelectModule}>Selecciona un módulo</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    {this.adminOptions()}
                    <View style={styles.viewRow}>
                        <TouchableHighlight 
                            style={styles.touchableLeft} 
                            onPress={() => this.isClickedModuleOptions('Datospaciente')}
                            underlayColor="white">
                            <View style={{alignItems:'center'}}>
                                <Image 
                                    style={styles.iconStyle} 
                                    source={require('../assets/Datos.png')}/>
                                <Text style={styles.textOptionsModules}>Datos del Paciente</Text> 
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            style={styles.touchableRight} 
                            onPress={() => this.isClickedModuleOptions('Evaluacion')}
                            underlayColor="white">
                            <View style={{alignItems:'center'}}>
                                <Image 
                                    style={styles.iconStyle} 
                                    source={require('../assets/Evaluacion.png')}/>
                                <Text style={styles.textOptionsModules}>Evaluación</Text> 
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.viewRow}>
                        <TouchableHighlight 
                            style={styles.touchableLeft} 
                            onPress={() => this.isClickedModuleOptions('Control')}
                            underlayColor="white">
                            <View style={{alignItems:'center'}}>
                                <Image 
                                    style={styles.iconStyle} 
                                    source={require('../assets/Control_Ambulatorio.png')}/>
                                <Text style={styles.textOptionsModules}>Control Ambulatorio</Text> 
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            style={styles.touchableRight} 
                            onPress={() => this.isClickedModuleOptions('Hospitalización')}
                            underlayColor="white">
                            <View style={{alignItems:'center'}}>
                                <Image 
                                    style={styles.iconStyle} 
                                    source={require('../assets/Hospitalizacion.png')}/>
                                <Text style={styles.textOptionsModules}>Hospitalización</Text> 
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.viewRow}>
                        <TouchableHighlight 
                            style={styles.touchableLeft} 
                            onPress={() => this.isClickedModuleOptions('Cirugia')}
                            underlayColor="white">
                            <View style={{alignItems:'center'}}>
                                <Image 
                                    style={styles.iconStyle} 
                                    source={require('../assets/Cirugia.png')}/>
                                <Text style={styles.textOptionsModules}>Cirugía</Text> 
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
			    
		    </View>
        );
    };
};

const screen = Dimensions.get('screen');
const sizeButtonModule = (screen.width / 2) - 30;
const styles = StyleSheet.create({
    container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#FAFAFA',
    },
    scrollView:{
        flex:1
    },
    viewRow:{
        flexDirection: 'row',
    }, 
    touchableLeft:{
        alignItems: 'center',
        flexDirection: 'column',
        height: sizeButtonModule,
        width: sizeButtonModule,
        borderWidth: 3,
        borderColor: '#BDBDBD',
        borderRadius:10,
        marginLeft: 10,
        marginBottom:20
    },
    touchableRight:{
        alignItems: 'center',
        height: (screen.width / 2) - 30,
        width: (screen.width / 2) - 30,
        borderWidth: 3,
        borderColor: '#BDBDBD',
        borderRadius:10,
        marginLeft: 20,
        marginBottom:20
    },  
    iconStyle:{
        height: sizeButtonModule * 0.58,
        width: sizeButtonModule * 0.58,
        marginTop: sizeButtonModule * 0.12,
    },
    textSelectModule: {
        fontSize: 18,
        color: '#585858',
        marginBottom: 20
   },
   textOptionsModules:{
    fontSize: 16,
    color: '#585858',
    marginTop: 10
   }
});



export default Home;
