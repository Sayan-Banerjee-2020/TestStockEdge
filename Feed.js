import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


export default function Feed({ navigation }) {
  const [token, setToken] = useState(null)
  const [post, setPost] = useState([])
  const [newpost, setNewpost] = useState('');

  const UploadPost = () => {
    axios.post('https://himadriapp.herokuapp.com/api/user/uploadPost', { newpost, token })
      .then(result => {
        setToken(null)
        console.warn('success')
        console.log("my upload response", response);
      })
  }

  const detectisLogin = async () => {
    const token = await AsyncStorage.getItem('UserId')
    console.warn(token)
    setToken(token)
  }
  const logout = () => {
    AsyncStorage.removeItem("UserId").then(() => {
      navigation.replace("Login")
    })
  }

  useEffect(() => {
    detectisLogin()
    axios.get('https://himadriapp.herokuapp.com/api/user/getPost', { token })
      .then(result => {
        setPost(result.data)
      })

  }, [token, post])
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Home</Text>
      <TextInput
        style={styles.TextInputStyleClass}
        underlineColorAndroid="transparent"
        placeholder={"Upload Your Post."}
        placeholderTextColor={"#8f8d8d"}
        numberOfLines={10}
        multiline={true}
        onChangeText={(val) => setNewpost(val)}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.userBtn} onPress={() => UploadPost()}>
          <Text style={styles.btnText} >Upload</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnContainer1}>
        <Text style={styles.btnText2}>GoBack To SignIn</Text>
        <TouchableOpacity style={styles.userBtn1} onPress={() => logout()} >
          <Text style={styles.btnText1} >Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={{}}>
        <Text style={styles.welcomeanother}>Your Post  </Text>
        {
          post.length > 0
            ?
            <>
              {
                post.map((postData, postindex) => {
                  return (
                    <>
                      <Text style={styles.post}>{postData.postDesc}</Text>
                    </>
                  )
                })
              }
            </>
            :
            <>
              <Text style={styles.post}>No Post Yet!! </Text>
            </>
        }


      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginTop: 30
  },
  welcome: {
    fontSize: 25,
    color: "#265241",
    fontWeight: "bold",
    marginBottom: 15
  },
  post: {
    fontSize: 20,
    color: "#8c7a87",
    textAlign: 'left',
    width: "90%"
  },
  welcomeanother: {
    fontSize: 25,
    color: "#38142d",
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    elevation: 10
  },
  TextInputStyleClass: {
    textAlign: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#5d6c6e',
    borderRadius: 10,
    backgroundColor: "#d9d7d7",
    height: 100,
    width: "90%",
    marginTop: 15,
    elevation: 5
  },
  input: {
    width: "90%",
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 10
  },
  userBtn: {
    backgroundColor: "#35594a",
    padding: 15,
    width: "45%",
    borderRadius: 50,
    elevation: 5
  },
  btnText: {
    fontSize: 16,
    textAlign: "center"
  },
  btnText1: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 5
  },
  btnText2: {
    fontSize: 18,
    textAlign: "center",
    color: "#a9b0ad",
    marginRight: 5
  },
  btnContainer: {
    flexDirection: "row",
    width: "90%",
    marginTop: 20,
    alignItems: 'center',
    justifyContent: "center",
  },

  btnContainer1: {
    flexDirection: "row",
    width: "90%",
    alignItems: 'center',
    marginTop: 20,
    justifyContent: "center",
  }

});