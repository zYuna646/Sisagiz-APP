import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Font from 'expo-font';
import { _retrieve_data } from '../Handler/handler_storage';
import { user_calculator } from '../API/all_api';


export default function Calculator_res() {
  const [fontLoaded, set_fontLoaded] = React.useState(false)
  const [hasilData, setHasilData] = React.useState({})
  const [Data, setData] = React.useState({})
  const [success, setSuccess] = React.useState(false);
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
    const data = await _retrieve_data("calculator");
    await user_calculator({
      age: Number(data.age),
      bb: Number(data.bb),
      tb: Number(data.tb),
      jk: data.jk,
    })
      .then((result) => {
        if (result.status === 200) {
          setHasilData(result.data.data);
          setData(data);
          setSuccess(true);
        } else {
          alert(result.message);
        }
      })
      .catch((err) => {
        alert(err);
      });

  }

  React.useEffect(() => {
    fetchData()
    fontLoad()
  }, [])

  return (
    <>
      {fontLoaded ?
        (
          <ScrollView style={styles.container}>
            <View style={styles.header}>
              <Text style={{ fontFamily: "PopBold", fontSize: 20, marginTop: 10 }}>
                Hasil Pengujian Sementara
              </Text>
              <Text style={{ fontFamily: "PopRegular", fontSize: 12, marginTop: 10 }}>
                ini adalah hasil pengujian sementara anda
              </Text>
            </View>
            <View>
              {success ? (
                <View>

                  <View style={styles.menuContainer}>
                    <View style={styles.umur}>
                      <Text style={styles.textTitle}>Umur</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textSatuan}>{Data.age} Bulan</Text>
                      </View>
                      <View></View>
                    </View>
                    <View style={styles.beratBadan}>
                      <Text style={styles.textTitle}>Berat Badan</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textSatuan}>{Data.bb} Kg</Text>
                      </View>
                    </View>
                    <View style={styles.tinggiBadan}>
                      <Text style={styles.textTitle}>Tinggi Badan</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textSatuan}>{Data.tb} Cm</Text>
                      </View>
                    </View>
                    <View style={styles.tinggiBadan}>
                      <Text style={styles.textTitle}>Jenis Kelamin</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textSatuan}>{Data.jk == 'L' ? ('Laki-laki') : ('Perempuan')}</Text>
                      </View>
                    </View>
                    <View style={styles.tinggiBadan}>
                      <Text style={styles.textTitle}>Hasil (BB/U)</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textSatuan}>{hasilData.bbu.status}</Text>
                      </View>
                    </View>
                    <View style={styles.tinggiBadan}>
                      <Text style={styles.textTitle}>Rekomendasi (BB/U)</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textSatuan}>{hasilData.bbu.rekom} Kg</Text>
                      </View>
                    </View>
                    <View style={styles.tinggiBadan}>
                      <Text style={styles.textTitle}>Hasil (TB/U)</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textSatuan}>{hasilData.tbu.status}</Text>
                      </View>
                    </View>
                    <View style={styles.tinggiBadan}>
                      <Text style={styles.textTitle}>Rekomendasi (TB/U)</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textSatuan}>{hasilData.tbu.rekom} Cm</Text>
                      </View>
                    </View>
                    <View style={styles.tinggiBadan}>
                      <Text style={styles.textTitle}>Hasil (BB/TB)</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textSatuan}>{hasilData.bbtb.status}</Text>
                      </View>
                    </View>
                    <View style={styles.tinggiBadan}>
                      <Text style={styles.textTitle}>Rekmendasi</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textSatuan}>{hasilData.bbtb.rekom} Kg</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <ActivityIndicator />
              )}
            </View>

            <TouchableOpacity onPress={() => {
              props.navigation.navigate("Calculator")
            }}>
              <View style={styles.btn}>
                <Text style={{ fontFamily: "PopBold", color: "black" }}>
                  Coba Ukur Lagi
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
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
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFCE81",
    justifyContent: "center",
  },
});

