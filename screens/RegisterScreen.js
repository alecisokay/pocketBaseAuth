import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, TextInput  } from 'react-native'
import PocketBase from 'pocketbase';
import { useNavigation } from '@react-navigation/native';



const RegisterScreen = () => {
    const pb = new PocketBase('http://127.0.0.1:8090');

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [name, setName] = useState('')
    const role = 'user'

    const navigation = useNavigation();

    // const data = {
    //     "username": "test_username1",
    //     "email": "test1@example.com",
    //     "emailVisibility": true,
    //     "password": "12345678",
    //     "passwordConfirm": "12345678",
    //     "name": "test",
    //     "role": "user"
    // };

    

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    
    >

      <View style={styles.inputContainer}>
      <TextInput 
        placeholder='Username' 
        value={username}
        onChangeText={ text => setUsername(text)}
        style={styles.input}
         />
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
         <TextInput 
            placeholder='Confirm Password' 
            value={passwordConfirm}
            onChangeText={ text => setPasswordConfirm(text)}
            style={styles.input}
            secureTextEntry
         />
         <TextInput 
            placeholder='name' 
            value={name}
            onChangeText={ text => setName(text)}
            style={styles.input}
         />

      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={async ()=> { 
            const data = {
                "username": username,
                "email": email,
                "emailVisibility": true,
                "password": password,
                "passwordConfirm": passwordConfirm,
                "name": name,
                "role": "user"
            };
            
            const record = await pb.collection('users').create(data);
            if(pb.authStore.isValid){
                navigation.navigate('Home');
            } else {
                navigation.navigate('Login');
            }

        }}
        style={styles.button}
        >
            <Text style={styles.buttonText}>register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={()=> { 

            navigation.navigate('Login')
        
        }}
        
        style={styles.button}
        >
            <Text style={styles.buttonText}>back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

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