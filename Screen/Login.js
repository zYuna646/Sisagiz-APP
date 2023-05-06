import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { user_login } from '../API/all_api'
import { _store_data } from '../Handler/handler_storage'
import { Entypo } from '@expo/vector-icons';
import * as Font from 'expo-font';



export default function Login(props) {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [hide, setHide] = React.useState(true)
  const [fontLoaded, set_fontLoaded] = React.useState(false)

  const fontLoad = async () => {
    await Font.loadAsync({
      PopBold: require("../assets/fonts/Poppins-Bold.ttf"),
      PopLug: require("../assets/fonts/Poppins-Light.ttf"),
      PopMedium: require("../assets/fonts/Poppins-Medium.ttf"),
      PopRegular: require("../assets/fonts/Poppins-Regular.ttf"),
      PopSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf")
    })
    set_fontLoaded(true)
  }

  const fetchData = async () => {
    await user_login({
      email: username,
      password: password
    }).then((result) => {
      if (result.status == 200) {
        _store_data('user', result.data)
        props.navigation.navigate("Home")
      }else{
        alert(result.message)
      }
    })
  }
  React.useEffect(() => {
    fontLoad()
  })

  return (
    <>
      {fontLoad ?
        (
          <View style={{ flexDirection: "column" }}>
            <View>
              <Text style={styles.header}>Halo</Text>
              <Text style={styles.Silahkan}>Silahkan Login Ya!</Text>
              <Text style={styles.lightheader}>
                Silahkan login untuk melihat hasil pengukuran bayi yang telah
                dilakukan posyandu!
              </Text>
              <Text style={styles.note}>
                Silahkan Masukan Username dan Password yang diberikan pihak posyandu{" "}
              </Text>
            </View>
            <View>
              <TextInput style={styles.textInput} placeholder="Username"
                onChangeText={setUsername}
                value={username}
              />
              <TextInput style={styles.textInput1} placeholder="Password"
                secureTextEntry={hide}
                inlineImageLeft='search_icon'
                onChangeText={setPassword}
                value={password}
              />
              <TouchableOpacity style={styles.hide} onPress={() => {
                setHide(!hide)
              }}>
                {hide ? (
                  <Entypo name="eye-with-line" size={24} color="black" />
                ) :
                  (
                    <Entypo name="eye" size={24} color="black" />
                  )
                }
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={fetchData}>
              <View style={styles.btn}>
                <Text style={styles.loginbtn}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
        :
        (
          <ActivityIndicator />
        )}
    </>
  )
}

const styles = StyleSheet.create({
  hide: {
    marginTop: -32,
    marginLeft: 320
  },
  container: {
    flexDirection: "column",
  },
  view1: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: (0, 0, 0, 0),
    marginTop: 140,
    marginLeft: 20,
    fontFamily: "PopBold",
    fontSize: 24,
  },
  Silahkan: {
    marginTop: -10,
    fontFamily: "PopBold",
    fontSize: 24,
    marginLeft: 20,
  },
  lightheader: {
    marginLeft: 20,
    marginRight: 10,
    color: "#6F6F6F",
    fontFamily: "PopLug",
    fontSize: 13,
    marginTop: -8,
  },
  note: {
    marginTop: 5,
    marginLeft: 20,
    marginRight: 10,
    color: "#6F6F6F",
    fontFamily: "PopLug",
    fontSize: 10,
    color: "#FF9C00",
  },
  textInput: {
    backgroundColor: "#FFF9F0",
    marginTop: 30,
    height: 44,
    marginLeft: 20,
    width: 340,
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
  },
  textInput1: {
    backgroundColor: "#FFF9F0",
    marginTop: 18,
    height: 44,
    marginLeft: 20,
    width: 340,
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    width: 340,
    backgroundColor: "#FF9C00",
    borderRadius: 13,
    marginTop: 40,
    marginLeft: 20,
  },
  loginbtn: {
    color: "#FFF",
    fontFamily: "PopBold",
    fontSize: 18,
  },
});