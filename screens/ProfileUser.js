import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


class ProfileUser extends React.Component {
    constructor(props){
        super(props);
    }




    render(){
        return(
            <View style={styles.container}>
                <Text>ProfileUser Screen</Text>
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

export default ProfileUser;