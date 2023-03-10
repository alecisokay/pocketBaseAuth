import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, TextInput  } from 'react-native'
import PocketBase from 'pocketbase';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
    const pb = new PocketBase('http://127.0.0.1:8090');

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    useEffect(() => {
        if(pb.authStore.isValid){
            navigation.navigate('Home')
        }
    }, [])
    

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    
    >

      <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Email' 
        value={email}
        onChangeText={ text => setEmail(text)}
        style={styles.input}
         />

        <TextInput 
            placeholder='Password' 
            value={password}
            onChangeText={ text => setPassword(text)}
            style={styles.input}
            secureTextEntry
         />

      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={async ()=> { 

            const authData = await pb.collection('users').authWithPassword(
                email,
                password,
            );

            if(pb.authStore.isValid){
                        navigation.navigate('Home')
                    }
            console.log(pb.authStore.isValid);
            console.log(pb.authStore.token);
            console.log(pb.authStore.model.id);
        }}
        style={styles.button}
        >
            <Text style={styles.buttonText}>login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={()=> {
            navigation.navigate('Registration')}}
        style={styles.button}
        >
            <Text style={styles.buttonText}>register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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