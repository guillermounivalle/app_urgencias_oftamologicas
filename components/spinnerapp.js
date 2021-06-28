import React from 'react'
import { View, Text, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


class SpinnerApp extends React.Component {
    constructor(props){
        super(props);
    }


    render(){
        return(
            <View style={styles.container}>
				<Spinner
				  visible={true}
				  textContent={'Loading...'}
				  animation={"fade"}
				  textStyle={styles.spinnerTextStyle}
				/>
				    <Text style={styles.welcome}>APP URGENCIAS OFTAMOLÓGICAS</Text>
				    <Text style={styles.instructions}>Pendiente organizars</Text>
			  </View>
        );
    }; 




}

const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#2E64FE',
      marginTop: 50
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5
    }
  });

  export default SpinnerApp;