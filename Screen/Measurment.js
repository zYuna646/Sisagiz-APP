import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Font from 'expo-font';
import { _retrieve_data } from '../Handler/handler_storage';
import { Feather } from "@expo/vector-icons";
import SelectDropdown from 'react-native-select-dropdown';
import { post_measurment } from '../API/all_api';
import { _store_data } from '../Handler/handler_storage';
import { useNavigationState } from '@react-navigation/native';


export default function Measurment(props) {
  const navigationState = useNavigationState(state => state)
  const current = navigationState.index
  const [fontLoaded, set_fontLoaded] = React.useState(false)
  const [user, set_user] = React.useState(null)
  const [bayi, set_bayi] = React.useState(null)
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);
  const [uuid, setuuid] = React.useState('')
  const [age, setAge] = React.useState(0)
  const [bb, setBB] = React.useState(0)
  const [tb, setTB] = React.useState(0)
  const [method, setMethod] = React.useState('Terlentang')
  const [vitamin, setVitamin] = React.useState('ya')
  const [lila, setLila] = React.useState(0)
  const [lika, setLika] = React.useState(0)
  const [doSubmit, setDoSubmit] = React.useState(false)
  const [date, setDate] = React.useState(year + "-" + month + "-" + day)



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
    const user = await _retrieve_data('user')
    const bayi = await _retrieve_data('bayi')
    const newDataBayi = bayi.filter((value) => value.Posyandu.uuid === user.user.posyandu_uuid);
    set_user(user)
    set_bayi(newDataBayi)
  }


  const Submit = async () => {
    if (bb != 0 || tb != 0) {
      if (!bb.includes(',') && !tb.includes(',')) {
        try {
          const result = await post_measurment(user.jwt.token, {
            uuid: uuid,
            date: date,
            bb: Number(bb),
            tb: Math.round(Number(tb) * 2) / 2 + 0.5,
            vitamin: vitamin,
            lila: Number(lila),
            lika: Number(lika),
          });
          if (result.status === 201) {
            await _store_data('pengukuran', {
              uuid: uuid,
              date: date
            }).then((result) => {
              alert('Pengukuran Berhasil')
              props.navigation.navigate('Measurment_res')
            })
          } else {
            alert('Pengukuran Telah Dilakukan');
          }
        } catch (err) {
          alert('Pengukuran Telah Dilakukan');
        }
      } else {
        alert('Mohon Gunakan (.) daripada (,)')
      }
    } else {
      alert('Periksa Data Yang Dimasukan')
    }
  }

  const dropIcon = () => {
    return (
      <Feather name="arrow-down-circle" size={25} color="black" />
    )
  }


  React.useEffect(() => {
    fetchData()
    fontLoad()
  }, [current])

  
  return (
    <>
      {fontLoaded && bayi != null?

        (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={{ fontFamily: "PopBold", fontSize: 20, marginTop: 10 }}>
                Pilih Anak
              </Text>
              <SelectDropdown
                dropdownStyle={{ borderRadius: 20, fontFamily: 'PopBold' }}
                rowTextStyle={{ fontFamily: 'PopMedium', fontSize: 15 }}
                selectedRowTextStyle={{ color: 'white' }}
                selectedRowStyle={{ backgroundColor: '#FFCE81' }}
                renderDropdownIcon={dropIcon}

                buttonStyle={{ backgroundColor: 'white', borderRadius: 20, alignSelf: 'center', width: '90%', marginTop: 20 }}
                buttonTextStyle={{ fontFamily: 'PopBold', fontSize: 12, textAlign: 'center' }}
                defaultButtonText='Pilih Bayi'
                data={bayi.map((value) => { return value.name.split(' ')[0] + ' (' + value.jk + ')' + ' - ' + value.Parent.no_kk })}
                onSelect={(selectedItem, index) => {
                  setuuid(bayi[index].uuid)
                  setDoSubmit(true)
                }}
              />
            </View>
            <ScrollView style={{ marginTop: 20 }}>
              {doSubmit ? (
                <View style={styles.menuContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.firstIndex}>
                      <Text style={styles.textTitle}>Tanggal Pengukuran</Text>
                      <View style={{ flexDirection: "row" }}>
                        <TextInput style={styles.textInput}
                          placeholder="Tanggal Pengukuran"
                          value={date}
                          editable={false}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.umur}>
                    <Text style={styles.textTitle}>Berat Badan</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput style={styles.textInputUmur}
                        keyboardType='numeric'
                        placeholder='Berat Badan'
                        onChangeText={setBB}
                        value={String(bb)} />
                      <Text style={styles.sideTxt}>Kg</Text>
                    </View>
                  </View>
                  <View style={styles.umur}>
                    <Text style={styles.textTitle}>Tinggi Badan</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput style={styles.textInputUmur}
                        keyboardType='numeric'
                        placeholder='Tinggi Badan'
                        onChangeText={setTB}
                        value={String(tb)} />
                      <Text style={styles.sideTxt}>Cm</Text>
                    </View>
                  </View>
                  <View>
                    <View style={styles.umur}>
                      <Text style={styles.textTitle}>Lila</Text>
                      <View style={{ flexDirection: "row" }}>
                        <TextInput style={styles.textInputUmur}
                          placeholder='Lingkar Lengan'
                          onChangeText={setLila}
                          value={String(lila)} />
                        <Text style={styles.sideTxt}>Cm</Text>
                      </View>
                    </View>
                    <View style={styles.umur}>
                      <Text style={styles.textTitle}>LiKa</Text>
                      <View style={{ flexDirection: "row" }}>
                        <TextInput style={styles.textInputUmur}
                          placeholder='Lingkar Kaki'
                          onChangeText={setLika}
                          value={String(lika)} />
                        <Text style={styles.sideTxt}>Cm</Text>
                      </View>
                    </View>
                    <View style={styles.umur}>
                      <Text style={styles.textTitle}>Vitamin A</Text>
                      <View style={{ flexDirection: "row" }}>
                        <SelectDropdown

                          dropdownStyle={{ borderRadius: 20, fontFamily: 'PopBold' }}
                          rowTextStyle={{ fontFamily: 'PopMedium', fontSize: 15 }}
                          selectedRowTextStyle={{ color: 'white' }}
                          selectedRowStyle={{ backgroundColor: '#FFCE81' }}
                          renderDropdownIcon={dropIcon}


                          buttonStyle={{ borderRadius: 20, width: 145, marginTop: 10 }}
                          buttonTextStyle={{}}


                          defaultValue={'Ya'}
                          data={['Ya', 'Tidak']}
                          onSelect={(selectedItem, index) => {
                            setVitamin(selectedItem)
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={{ marginTop: 20 }} onPress={Submit}>
                    <View style={styles.btn}>
                      <Text style={{ fontFamily: "PopBold", color: "black" }}>
                        Hitung
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) :
                (
                  <Text></Text>
                )}
            </ScrollView>
          </View>
        )
        :
        (
          <ActivityIndicator />
        )

      }
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFCE81" },
  header: { paddingTop: 60, paddingLeft: 20 },
  sideTxt: {
    marginLeft: 20,
    alignSelf: 'center'
  },
  menuContainer: {
    marginTop: 45,
    borderRadius: 30,
    height: '80%',
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  umur: {
    marginLeft: 20,
    marginTop: 30,
    marginBottom: -10,
  },
  firstIndex: {
    marginLeft: 20,
    marginTop: 90,
    marginBottom: -10,
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
    width: "95%",
    fontFamily: "PopSemiBold",
  },
  textSatuan: {
    alignSelf: "center",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "PopRegular",
  },
  btn: {
    alignSelf: "center",
    width: "50%",
    height: 50,
    borderRadius: 30,
    marginTop: 50,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
  },
  textInputUmur: {
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: "#F1F1F1",
    borderColor: "#F1F1F1",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: "black",
    height: 50,
    width: "40%",
    fontFamily: "PopSemiBold",
  },
});