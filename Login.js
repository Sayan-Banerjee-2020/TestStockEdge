import React, { useState } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export default function Login({ navigation }) {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const redirectLogin = async (response) => {
    try {
      await AsyncStorage.setItem('userId', response.data._id)
      navigation.navigate('Feed')
    }catch (e) {
     console.warn("Error")
    }
  }

  const LoginUser = () => {
   
    axios.post('https://himadriapp.herokuapp.com/api/user/login',{email,password})
    .then(response => {
      redirectLogin(response)
    })
  }


    return (
        <View style={styles.container}>
        <Text style={styles.welcome}>Welcome To My App</Text>
        <Text style={styles.welcome1}>Login</Text>
        <TextInput 
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#8f8d8d"}
        onChangeText ={(val) => setEmail(val)}
        />
           <TextInput 
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"#8f8d8d"}
        secureTextEntry
        onChangeText = {(val) =>setPassword(val)}
        />
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.userBtn} onPress ={() => LoginUser()}>
                <Text style={styles.btnText} >Login</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.btnContainer1}>
        <Text style={styles.btnText2}>Have No Account?</Text>
        <TouchableOpacity style={styles.userBtn1} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.btnText1}>SignUp</Text>
            </TouchableOpacity>
            </View>
      </View>

    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcome:{
      fontSize:25,
      color:"#265241",
      fontWeight:"bold",
      marginBottom:15
    },
    welcome1:{
      fontSize:25,
      color:"#03191c",
      fontWeight:"bold",
      marginBottom:15
    },
    input:{
      width:"90%",
      backgroundColor: '#d9d7d7',
      height:60,
      paddingLeft:30,
      marginBottom:15,
      borderRadius:50,
      marginTop:10,
      elevation:2
    },
    userBtn:{
      backgroundColor:"#35594a",
      padding:15,
      width:"45%",
      borderRadius:50,
      elevation:5
    },
    btnText:{
      fontSize:18,
      textAlign:"center",
      color:"#000",
      fontWeight:"bold"
    },
    userBtn1:{
      padding:2,
      width:"20%",
      borderRadius:50,
    },
    btnText1:{
      fontSize:20,
      textAlign:"center",
      fontWeight:"bold"
    },
    btnText2:{
      fontSize:18,
      textAlign:"center",
      color:"#a9b0ad",
      marginRight:5
    },
    btnContainer:{
      flexDirection:"row",
      width:"90%",
      marginTop:20,
      alignItems:'center',
      justifyContent:"center",
    },
    btnContainer1:{
      flexDirection:"row",
      width:"90%",
      alignItems:'center',
      marginTop:20,
      justifyContent:"center",
    }
  
  });