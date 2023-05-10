import { ActivityIndicator, StyleSheet, Text, View,TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import * as Font from 'expo-font';
import SelectDropdown from 'react-native-select-dropdown';
import { Feather } from "@expo/vector-icons";
import { _store_data } from '../Handler/handler_storage';



export default function Calculator(props) {
  const [AGE, setAge] = React.useState(0)
  const [BB, setBB] = React.useState(0)
  const [TB, setTB] = React.useState(0)
  const [JK, setJK] = React.useState('L')
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
  const dropIcon = () => {
    return (
      <Feather name="arrow-down-circle" size={25} color="black" />
    )
  }
  const fetchData = async () => {

  }

  React.useEffect(() => {
    fetchData()
    fontLoad()
  },[])

  return (
    <>
      {fontLoaded ?
        (
          <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontFamily: "PopBold", fontSize: 20, marginTop: 10 }}>
          Kalkulator Stunting
        </Text>
        <Text style={{ fontFamily: "PopRegular", fontSize: 12, marginTop: 10 }}>
          Kalkulator Stunting ini digunakan untuk melakukan pengukuran sementara
          terhadap status gizi anak anda
        </Text>
      </View>
      <View style={styles.menuContainer}>


        <View style={styles.umur}>
          <Text style={styles.textTitle}>Umur</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput style={styles.textInput}
              keyboardType='numeric'
              placeholder='Umur'
              onChangeText={setAge}
              value={String(AGE)} />
            <Text style={styles.textSatuan}>Bulan</Text>
          </View>
          <View></View>
        </View>


        <View style={styles.beratBadan}>
          <Text style={styles.textTitle}>Berat Badan</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput style={styles.textInput}
              keyboardType='numeric'
              placeholder='Berat Badan'
              onChangeText={setBB}
              value={String(BB)} />
            <Text style={styles.textSatuan}>Kg</Text>
          </View>
        </View>


        <View style={styles.tinggiBadan}>
          <Text style={styles.textTitle}>Tinggi Badan</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput style={styles.textInput}
              keyboardType='numeric'
              placeholder='Tinggi Badan'
              onChangeText={setTB}
              value={String(TB)}
            />
            <Text style={styles.textSatuan}>Cm</Text>
          </View>
        </View>


        <View style={styles.tinggiBadan}>
          <Text style={styles.textTitle}>Jenis Kelamin</Text>
          <View style={{ flexDirection: "row" }}>
            <SelectDropdown
              buttonStyle={{ borderRadius: 20 }}
              dropdownStyle={{ borderRadius: 20, fontFamily: 'PopBold' }}
              rowTextStyle={{ fontFamily: 'PopMedium', fontSize: 15 }}
              selectedRowTextStyle={{ color: 'white' }}
              selectedRowStyle={{ backgroundColor: '#FFCE81' }}
              renderDropdownIcon={dropIcon}
              defaultValueByIndex={0}
              data={['Laki-laki', 'Perempuan']}
              onSelect={(selectedItem, index) => {
                setJK(index == 0 ? ('L') : ('P'))
              }}
            />
          </View>
        </View>


        <TouchableOpacity onPress={() => {
          if (AGE != 0 && BB !== 0 && TB != 0) {
            if (!AGE.includes(',') && !BB.includes(',') && !TB.includes(',')) {
              _store_data('calculator', {
                age: AGE,
                tb: TB,
                bb: BB,
                jk: JK
              })
              props.navigation.navigate("Calculator_res")
            } else {
              alert('Mohon Gunakan (.) daripada (,)')

            }
          } else {
            alert('Mohon Perhatikan Data Yang Diisi')
          }
        }}>
          <View style={styles.btn}>
            <Text style={{ fontFamily: "PopBold", color: "black" }}>
              Hitung
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
        )
        :
        (<ActivityIndicator />)}
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFCE81" },
  header: { paddingTop: 60, paddingLeft: 20 },

  menuContainer: {
    marginTop: 20,
    borderRadius: 30,
    height: "80%",
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
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFCE81",
    justifyContent: "center",
  },
});
