import React from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native';




class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            isAdmin: true
        }

        this.adminOptions = this.adminOptions.bind(this);
    };


    adminOptions = () => {
        if(this.state.isAdmin){
            return (
                <View style={styles.viewRow}>
                    <TouchableHighlight style={styles.touchableLeft}>
                        <View>
                            <Image 
                                style={styles.iconStyle} 
                                source={require('../assets/Evaluacion.png')}/>
                            <Text>Mòdulo a usar</Text> 
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.touchableRight}>
                        <View>
                            <Image 
                                style={styles.iconStyle} 
                                source={require('../assets/Evaluacion.png')}/>
                            <Text>Mòdulo a usar</Text> 
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
                <View>
                    <Text>Home.js</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.viewRow}>
                        <TouchableHighlight style={styles.touchableLeft}>
                            <View>
                                <Image 
                                    style={styles.iconStyle} 
                                    source={require('../assets/Evaluacion.png')}/>
                                <Text>Mòdulo a usar</Text> 
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.touchableRight}>
                            <View>
                                <Image 
                                    style={styles.iconStyle} 
                                    source={require('../assets/Evaluacion.png')}/>
                                <Text>Mòdulo a usar</Text> 
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.viewRow}>
                        <TouchableHighlight style={styles.touchableLeft}>
                            <View>
                                <Image 
                                    style={styles.iconStyle} 
                                    source={require('../assets/Evaluacion.png')}/>
                                <Text>Mòdulo a usar</Text> 
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.touchableRight}>
                            <View>
                                <Image 
                                    style={styles.iconStyle} 
                                    source={require('../assets/Evaluacion.png')}/>
                                <Text>Mòdulo a usar</Text> 
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.viewRow}>
                        <TouchableHighlight style={styles.touchableLeft}>
                            <View>
                                <Image 
                                    style={styles.iconStyle} 
                                    source={require('../assets/Evaluacion.png')}/>
                                <Text>Mòdulo a usar</Text> 
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.touchableRight}>
                            <View>
                                <Image 
                                    style={styles.iconStyle} 
                                    source={require('../assets/Evaluacion.png')}/>
                                <Text>Mòdulo a usar</Text> 
                            </View>
                        </TouchableHighlight>
                    </View>
                    {this.adminOptions()}
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
        width:sizeButtonModule * 0.58,
        marginTop: sizeButtonModule * 0.12

    }
});



export default Home;
