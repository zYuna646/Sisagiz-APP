import { ActivityIndicator, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import * as Font from 'expo-font';
import { _remove_data, _retrieve_data } from '../Handler/handler_storage';


export default function Profile(props) {
  const [fontLoaded, set_fontLoaded] = React.useState(false)
  const [user, set_user] = React.useState(null)

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
    const dt = await _retrieve_data('user')
    set_user(dt != null? (dt) : (null))
  }

  React.useEffect(() => {
    fetchData()
    fontLoad()
  }, [])
  return (
    <>
      {user != null && fontLoaded ?
        (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={{ fontFamily: "PopBold", fontSize: 20, marginTop: 10 }}>
                Profile
              </Text>
              <Text style={{ fontFamily: "PopBold", fontSize: 15, marginTop: 10 }}>
                {user.user.name}
              </Text>
            </View>
            <View>
              <View style={styles.menuContainer}>
                <View style={styles.umur}>
                  <Text style={styles.textTitle}>Email</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.textSatuan}>{user.user.email}</Text>
                  </View>
                  <View></View>
                </View>
                <TouchableOpacity onPress={ async () => {
                  await _remove_data('user').then((result) => {
                    if(result) props.navigation.navigate('Home')
                  })
                }}>
                  <View style={styles.btn}>
                    <Text style={{ fontFamily: "PopBold", color: "black" }}>
                      Log Out
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        )
        :
        (<ActivityIndicator />)
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFCE81" },
  header: { paddingTop: 60, paddingLeft: 20 },

  menuContainer: {
    marginTop: 20,
    borderRadius: 30,
    height: "90%",
    width: "100%",
    backgroundColor: "white",
  },
  umur: {
    marginLeft: 20,
    marginTop: 40,
  },
  textTitle: {
    fontFamily: "PopSemiBold",
    fontSize: 14,
    color: "black",
  },
  textInput: {
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: "#F1F1F1",
    borderColor: "#F1F1F1",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: "black",
    height: 50,
    width: "70%",
    fontFamily: "PopSemiBold",
  },
  textSatuan: {
    alignSelf: "center",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "PopRegular",
  },
  beratBadan: {
    margin: 20,
  },
  tinggiBadan: {
    margin: 20,
    marginTop: 1,
  },
  btn: {
    alignSelf: "center",
    width: "50%",
    height: 50,
    borderRadius: 30,
    marginTop: 250,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFCE81",
    justifyContent: "center",
  },
});