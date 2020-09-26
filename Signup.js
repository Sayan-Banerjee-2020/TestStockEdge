import React,{ useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Signup({ navigation }) {
    const [name,SetName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirectSignup = async (result) => {
      try {
        await AsyncStorage.setItem('userId', result.data)
        navigation.navigate('Feed')
      }catch (e) {
       console.warn("Error")
      }
    }

    const SignupUser = () => {
      axios.post('https://himadriapp.herokuapp.com/api/user/signup',{name,email,password})
      .then(result => {
        redirectSignup(result)
      })
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome Ro Registration</Text>
        <Text style={styles.welcome1}>SignUp</Text>
        <TextInput 
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={"#8f8d8d"}
        onChangeText = {(val) => SetName(val)}
        />

      <TextInput 
      style={styles.input}
      placeholder="Email"
      placeholderTextColor={"#8f8d8d"}
      onChangeText = {(val) => setEmail(val)}
      />
      <TextInput 
      style={styles.input}
      placeholder="Password"
      placeholderTextColor={"#8f8d8d"}
      secureTextEntry
      onChangeText = {(val) => setPassword(val)}
      />
      <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.userBtn} onPress={() =>SignupUser() }>
              <Text style={styles.btnText}>Regisration</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.btnContainer1}>
        <Text style={styles.btnText2}>Have No Account?</Text>
        <TouchableOpacity style={styles.userBtn1} onPress ={() => navigation.navigate('Login')} >
        <Text style={styles.btnText1} >SignIn</Text>
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
      fontSize:20,
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