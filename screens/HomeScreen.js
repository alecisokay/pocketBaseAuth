import {  StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, TextInput  } from 'react-native'
import React from 'react'
import PocketBase from 'pocketbase';


const HomeScreen = () => {

    const pb = new PocketBase('http://127.0.0.1:8090');

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        
        >
        <Text> email: {pb.authStore.model.email}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
            onPress={()=> {
                pb.authStore.clear();
                navigation.navigate('Home')}}
            style={styles.button}
            >
                <Text style={styles.buttonText}>logout</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 40

    },
    button: {
        margin:5,
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 8,
        alignItems:'center'

    },
    buttonText:{
        
    },
    buttonContainer: {
        width: '20%',
        justifyContent:'center',
        alignItems: 'center'
    },


})