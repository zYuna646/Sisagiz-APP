import { ActivityIndicator, StyleSheet, Text, View , ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import * as Font from 'expo-font';
import { _retrieve_data } from '../Handler/handler_storage';

export default function Measurment_res(props) {
  const [fontLoaded, set_fontLoaded] = React.useState(false)
  const [bayi, setBayi] = React.useState(null)
  const [data_user, setData] = React.useState(null)
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
    const data_user = await _retrieve_data('user');
    const data_bayi = await _retrieve_data('pengukuran')
    const data_pengukuran = await _retrieve_data('measurment')
    let dt;

    if (data_user != null && data_bayi != null) {
      data_pengukuran.map((value, index) => {
        if (value.Toddler.uuid == data_bayi.uuid && value.date == data_bayi.date) {
          dt = value
        }
      })
    }
    setBayi(dt)
    setData(data_user)
  }

  React.useEffect(() => {
    fetchData()
    fontLoad()
  }, [])
  return (
    <>
      {fontLoad ?
        (
          <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{ fontFamily: "PopBold", fontSize: 20, marginTop: 10 }}>
              Hasil Pengukuran
            </Text>
            {bayi != null ? (
              <Text style={{ fontFamily: "PopBold", fontSize: 15, marginTop: 10 }}>
                {bayi.Toddler.name}
              </Text>
            ) : (
              <ActivityIndicator />
            )}
          </View>
          <ScrollView>
            <View style={styles.menuContainer}>
              {bayi != null ? (
                <View>
                  <View style={styles.umur}>
                    <View style={{ marginBottom: 5 }}><Text style={{ fontFamily: "PopBold", fontSize: 18 }}>Detail Pengukuran</Text></View>
                    <Text style={styles.textTitle}>Tanggal pengukuran</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.date}</Text>
                    </View>
                  </View>
                  <View style={styles.beratBadan}>
                    <Text style={styles.textTitle}>Umur</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.current_age} Bulan</Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.tinggiBadan}>
                    <Text style={styles.textTitle}>Berat Badan</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.bb} Kg</Text>
                    </View>
                  </View>
                  <View style={styles.tinggiBadan}>
                    <Text style={styles.textTitle}>Tinggi Badan</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.tb} Cm</Text>
                    </View>
                  </View>
                  <View style={styles.tinggiBadan}>
                    <Text style={styles.textTitle}>Status Gizi (BB/U)</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.bbu}</Text>
                    </View>
                  </View>
                  <View style={styles.tinggiBadan}>
                    <Text style={styles.textTitle}>Status Gizi (TB/U)</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.tbu}</Text>
                    </View>
                  </View>
                  <View style={styles.tinggiBadan}>
                    <Text style={styles.textTitle}>Status Gizi (BB/TB)</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.bbtb}</Text>
                    </View>
                  </View>
                  <View style={styles.tinggiBadan}>
                    <Text style={styles.textTitle}>Vitamin</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.vitamin}</Text>
                    </View>
                  </View>
                  <View style={styles.tinggiBadan}>
                    <View style={{ marginBottom: 5 }}><Text style={{ fontFamily: "PopBold", fontSize: 18 }}>Hasil Klasifikasi</Text></View>
                    <Text style={styles.textTitle}>Hasil</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.predict_result == 0 ? ('Normal') : ('Stunting')}</Text>
                    </View>
                  </View>
                  <View style={styles.tinggiBadan}>
                    <Text style={styles.textTitle}>Akurasi</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.predict_accuracy * 100} %</Text>
                    </View>
                  </View>
                  <View style={styles.tinggiBadan}>
                    <View style={{ marginBottom: 5 }}><Text style={{ fontFamily: "PopBold", fontSize: 18 }}>Rekomendasi</Text></View>
                    <Text style={styles.textTitle}>Berat Badan (BB/U)</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.rekombbu} Kg</Text>
                    </View>
                  </View>
                  <View style={styles.tinggiBadan}>
                    <Text style={styles.textTitle}>Tinggi Badan (TB/U)</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.rekomtbu} Cm</Text>
                    </View>
                  </View>
                  <View style={styles.tinggiBadan}>
                    <Text style={styles.textTitle}>Berat Badan (BB/TB)</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSatuan}>{bayi.rekombbtb} Kg</Text>
                    </View>
                  </View>
                  {data_user != null ?
                    (
                      <TouchableOpacity
                        onPress={() => {
                          data_user.user.role !== 'masyarakat' ? props.navigation.navigate("MeasurementPosyandu") : props.navigation.navigate("Home")
                        }}
                      >
                        <View style={styles.btn}>
                          <Text style={{ fontFamily: "PopBold", color: "black" }}>
                            {data_user.user.role !== 'masyarakat' ? 'Coba Ukur Lagi' : 'Kembali Ke Home'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                    :
                    (
                      <Text></Text>
                    )
                  }
                </View>
              ) : (
                <ActivityIndicator />
              )}
            </View>
          </ScrollView>
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
    marginTop: 100,
    marginBottom: 25,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
  },
});
