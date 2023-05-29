import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { startTransition } from 'react'
import * as Font from 'expo-font';
import { _retrieve_data } from '../Handler/handler_storage';
import { user_calculator } from '../API/all_api';

export default function NewCalculatorRes(props) {
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
    fontLoad()
    fetchData()
  }, [])

  return (
    <>
      {fontLoaded ?
        (
          <ScrollView style={{ flex: 1, backgroundColor: 'rgba(150, 105, 169, 0.11)' }}>
            <View style={{ flex: 1, margin: '5%', flexDirection: 'column' }}>
              <Text style={{ fontFamily: 'PopBold', fontSize: 24, color: '#1C1646' }}>Hasil Pengukuran sementara</Text>
              {success ?

                (
                  <>
                    <View style={[{ backgroundColor: '#4D1564' }, styles.container]}>
                      <Text style={styles.txt}>Detail Pengukuran</Text>
                      <View style={{ backgroundColor: 'white', borderBottomStartRadius: 15, borderBottomEndRadius: 15 }}>
                        <View style={styles.content}>
                          <View>
                            <Text style={styles.smalTxt}>Umur</Text>
                            <Text style={styles.smalTxt}>Berat Badan</Text>
                            <Text style={styles.smalTxt}>Tinggi Badan</Text>
                            <Text style={styles.smalTxt}>Jenis Kelamin</Text>
                          </View>
                          <View>
                            <Text style={styles.smalTxt}>    :    </Text>
                            <Text style={styles.smalTxt}>    :    </Text>
                            <Text style={styles.smalTxt}>    :    </Text>
                            <Text style={styles.smalTxt}>    :    </Text>

                          </View>
                          <View style={{ marginTop: 3 }}>
                            <Text style={styles.hasilTxt}>{Data.age} Bulan</Text>
                            <Text style={styles.hasilTxt}>{Data.bb} Kg</Text>
                            <Text style={styles.hasilTxt}>{Data.tb} Cm</Text>
                            <Text style={styles.hasilTxt}>{Data.jk}</Text>

                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={[{ backgroundColor: '#9669A9' }, styles.container]}>
                      <Text style={styles.txt}>Hasil Pengukuran</Text>
                      <View style={{ backgroundColor: 'white', borderBottomStartRadius: 15, borderBottomEndRadius: 15 }}>
                        <View style={styles.content}>
                          <View>
                            <Text style={styles.smalTxt}>Hasil BB/U</Text>
                            <Text style={styles.smalTxt}>Hasil TB/U</Text>
                            <Text style={styles.smalTxt}>Hasil BB/TB</Text>
                          </View>
                          <View>
                            <Text style={styles.smalTxt}>    :    </Text>
                            <Text style={styles.smalTxt}>    :    </Text>
                            <Text style={styles.smalTxt}>    :    </Text>
                          </View>
                          <View style={{ marginTop: 3, flexDirection: 'column', flexWrap: 'wrap' }}>
                            <ScrollView>
                              <Text style={styles.hasilTxt}>{hasilData.bbu.status.replace(/[(][^)]*[)]/g, '')}</Text>
                            </ScrollView>
                            <Text style={styles.hasilTxt}>{hasilData.tbu.status.replace(/[(][^)]*[)]/g, '')}</Text>
                            <Text style={styles.hasilTxt}>{hasilData.bbtb.status.replace(/[(][^)]*[)]/g, '')}</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={[{ backgroundColor: '#369E7F' }, styles.container]}>
                      <Text style={styles.txt}>Rekomendasi</Text>
                      <View style={{ backgroundColor: 'white', borderBottomStartRadius: 15, borderBottomEndRadius: 15 }}>
                        <View style={styles.content}>
                          <View>
                            <Text style={styles.smalTxt}>Rekomendasi BB/U</Text>
                            <Text style={styles.rekomendasiTxt}>{hasilData.bbu.rekom}</Text>
                            <Text style={styles.smalTxt}>Rekomendasi TB/U</Text>
                            <Text style={styles.rekomendasiTxt}>{hasilData.tbu.rekom}</Text>
                            <Text style={styles.smalTxt}>Rekomendasi BB/TB</Text>
                            <Text style={styles.rekomendasiTxt}>{hasilData.bbtb.rekom}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                )
                :
                (
                  <ActivityIndicator />
                )

              }


            </View>
          </ScrollView>
        )
        :
        (<ActivityIndicator />)
      }
    </>
  )
}

const styles = StyleSheet.create({
  txt: {
    fontFamily: 'PopBold',
    fontSize: 18,
    color: '#F9F9FF',
    margin: '5%'
  },
  container: {
    marginTop: '10%',
    borderRadius: 15,
    elevation: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: '4%',
  },
  smalTxt: {
    fontSize: 14,
    fontFamily: 'PopBold'
  },
  hasilTxt: {
    fontSize: 14,
    fontFamily: 'PopRegular',
  },
  rekomendasiTxt: {
    marginTop: -5,
    fontSize: 20,
    fontFamily: 'PopBold'
  }
})