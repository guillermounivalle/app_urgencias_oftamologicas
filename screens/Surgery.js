import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


class Surgery extends React.Component {
    constructor(props){
        super(props);
    }




    render(){
        return(
            <View style={styles.container}>
                <Text>Surgery Screen</Text>
            </View>
        );
    };
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    }
});

export default Surgery;