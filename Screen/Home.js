import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import * as Font from 'expo-font';
import { _remove_data, _retrieve_data } from '../Handler/handler_storage';
import Logo from './Logo';
import { SvgUri } from 'react-native-svg';
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'
import { useNavigationState } from '@react-navigation/native';
import { user_measurmet } from '../API/all_api';
import { get_all_bayi } from '../API/all_api';
import { _store_data } from '../Handler/handler_storage';


export default function Home(props) {
  const [fontLoaded, set_fontLoaded] = React.useState(false)
  const [user, set_user] = React.useState(null)
  const [riwayat, set_riwayat] = React.useState(null)
  const navigationState = useNavigationState(state => state);
  const currentTabIndex = navigationState.index;

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
    if (user != null) {
      set_user(user)
      let uuid = []
      await get_all_bayi(user.jwt.token, {
      }).then((result) => {
        if (result.data.status === 'Success') {
          {
            const data = user.user.role == 'masyarakat' ?
              result.data.result.map((value, index) => {
                if (value.Parent.uuid == user.user.parent_uuid) {
                  uuid.push(value.uuid)
                  return value
                }
              })
              :
              result.data.result.map((value, index) => {
                if (value.Posyandu.uuid == user.user.posyandu_uuid) {
                  uuid.push(value.uuid)
                  return value
                }
              });
            _store_data('bayi', data)
          }
        }
      })

      await user_measurmet(user.jwt.token, {
      }).then((result) => {
        if (result.data.status === 'Success') {
          const data = result.data.data.map((value, index) => {
            if (uuid.indexOf(value.Toddler.uuid) != -1) {
              return value
            }
          })
          _store_data('measurment', data)
          const slicedRiwayat = data.slice(-4);
          const reversedRiwayat = slicedRiwayat.reverse();
          _store_data('history', reversedRiwayat)
          set_riwayat(reversedRiwayat)
        }
      })


    } else {
      _remove_data('bayi')
      _remove_data('measurment')
      _remove_data('history')
      set_user(null)
      set_riwayat(null)
    }
  }


  React.useEffect(() => {
    fetchData()
    fontLoad()
  }, [currentTabIndex])

  return (
    <>
      {fontLoaded ?
        (
          <View style={styles.container}>
            <View style={styles.header}>
              <Logo />
              <Text style={{ fontFamily: "PopMedium", fontSize: 15 }}>
                Selamat Datang
              </Text>

              <Text style={{ fontFamily: "PopBold", fontSize: 14 }}>
                {user != null ? (
                  user.user.name
                ) : (<Text></Text>)}
              </Text>

            </View>
            <View style={styles.banner}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'PopBold', margin: '5%', marginLeft: 40, fontSize: 15, color: '#7C5211' }}>
                  {user != null ? (
                    user.user.role != 'masyarakat' ? (
                      <Text>
                        Bantu Cek Status Gizi.{'\n'}
                        Masyarakat Yuk!.{'\n\n'}
                      </Text>
                    ) : (
                      <Text>
                        Cek Status Gizi.{'\n'}
                        Anak Anda Sekarang!.{'\n\n'}
                      </Text>

                    )
                  ) : (
                    <Text>
                      Cek Status Gizi.{'\n'}
                      Anak Anda Sekarang!.{'\n\n'}
                    </Text>
                  )}

                  <TouchableOpacity
                    style={{ backgroundColor: '#FFCE81', width: 150, borderRadius: 20 }}
                    onPress={() => {
                      if (user != null) {
                        props.navigation.navigate(user.user.role != 'masyarakat' ? 'Measurment' : 'Graph');
                      } else {
                        props.navigation.navigate("Login");
                      }
                    }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'PopBold', fontSize: 15, margin: '5%', color: '#603802' }}>Cek Yuk</Text>
                  </TouchableOpacity>

                </Text>
                <Image source={require('../assets/home.png')} style={{ alignSelf: 'flex-end' }} />
              </View>
            </View>


            <View style={styles.menuContainer}>
              <View>
                <Text style={styles.menuText}>Menu</Text>
                <View style={{ pading: 10 }}>
                  <View style={styles.containerMenu}>
                    {user != null ?
                      (
                        <TouchableOpacity style={styles.menu1} onPress={() => {
                          if (user.user.role !== 'masyarakat') {
                            props.navigation.navigate('Measurment')
                          } else {
                            props.navigation.navigate('Graph')
                          }

                        }}>
                          <FontAwesome name="bar-chart" size={35} color="white" />
                        </TouchableOpacity>

                      ) :
                      (
                        <TouchableOpacity style={styles.menu1} onPress={() => {
                          props.navigation.navigate('Login')

                        }}>
                          <FontAwesome name="bar-chart" size={35} color="white" />
                        </TouchableOpacity>
                      )
                    }

                    <TouchableOpacity style={styles.menu2} onPress={() => {
                      props.navigation.navigate("Calculator");
                    }} >
                      <FontAwesome name="edit" size={35} color="white" />
                    </TouchableOpacity>
                    {user != null ? (

                      <TouchableOpacity style={styles.menu3} onPress={() => {
                        props.navigation.navigate(user.user.role != 'masyarakat' ? 'Graph' : 'Article');
                      }}>
                        <FontAwesome name="book" size={35} color="white" />
                      </TouchableOpacity>
                    ) :
                      (
                        <TouchableOpacity style={styles.menu3} onPress={() => {
                          props.navigation.navigate('Article');
                        }}>
                          <FontAwesome name="book" size={35} color="white" />
                        </TouchableOpacity>
                      )}

                  </View>
                  <View style={styles.menuTitle}>
                    {user != null ?
                      (

                        <Text style={styles.menuTitle1}>
                          {user.user.role !== 'masyarakat' ? 'Ukur dan Timbang' : 'Cek Status Gizi'}
                        </Text>
                      ) :
                      (
                        <Text style={styles.menuTitle1}>Cek Status Gizi</Text>

                      )
                    }

                    <Text style={styles.menuTitle2}>Hitung Status Gizi</Text>
                    {user != null ? (

                      <Text style={styles.menuTitle3}>{user.user.role !== 'masyarakat' ? 'Cek Status Gizi' : 'Artikel'}</Text>
                    ) : (
                      <Text style={styles.menuTitle3}>{'Artikel'}</Text>

                    )}
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.riwayatText}>Riwayat</Text>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ height: 100, }}>
                  <View>

                    {riwayat != null ? (
                      <View style={{ flexDirection: "row" }}>
                        {riwayat.map((value, index) => (
                          <TouchableOpacity key={index} onPress={async () => {
                            await _store_data('pengukuran', {
                              uuid: value.Toddler.uuid,
                              date: value.date
                            }).then((result) => {
                              props.navigation.navigate('Measurment_res')
                            })
                          }}>
                            <View style={styles.boxRiwayat}>
                              <Text style={styles.riwayatUmur}>{value.date}</Text>
                              <Feather
                                name={value.predict_result == 0 ? ('trending-up') : ('trending-down')}
                                size={18}
                                color={value.predict_result == 0 ? ('green') : ('red')}
                                style={{ position: "absolute", left: 110, top: 10 }}
                              />
                              <Text style={styles.riwayatNama}>{value.Toddler.name.split(' ')[0]}</Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : (
                      <Text></Text>
                    )}
                  </View>
                </ScrollView>
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
  header: { paddingLeft: 20, top: -300 },
  banner: {
    position: "absolute",
    width: 340,
    height: 140,
    backgroundColor: "#FFEDD0",
    top: 230,
    right: 37,
    zIndex: 1,
    borderRadius: 10,
    marginRight: -10
  },
  menuContainer: {
    marginTop: -180,
    borderRadius: 30,
    height: "70%",
    width: "100%",
    backgroundColor: "white",
  },
  containerMenu: { flexDirection: "row", justifyContent: "space-evenly" },
  menuText: {
    fontFamily: "PopBold",
    fontSize: 20,
    marginTop: 100,
    paddingLeft: 20,
    paddingBottom: 10,
  },

  menu1: {
    backgroundColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9768AC",
    borderRadius: 9,
  },

  menu2: {
    backgroundColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7C77D",
    borderRadius: 9,
  },

  menu3: {
    backgroundColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EF986F",
    borderRadius: 9,
  },
  menuTitle: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  menuTitle1: {
    width: 80,
    fontFamily: "PopBold",
    fontSize: 11,
    textAlign: "center",
  },
  menuTitle2: {
    width: 80,
    fontFamily: "PopBold",
    fontSize: 11,
    textAlign: "center",
  },
  menuTitle3: {
    width: 80,
    fontFamily: "PopBold",
    fontSize: 11,
    textAlign: "center",
  },
  riwayatText: {
    fontFamily: "PopBold",
    fontSize: 18,
    marginTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  boxRiwayat: {
    borderWidth: 0.5,
    borderColor: 'purple',
    width: 150,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000000",
    elevation: 10,
    marginLeft: 10
  },
  riwayatUmur: {
    fontFamily: "PopRegular",
    fontSize: 13,
    color: "#7A7A7A",
  },
  riwayatNama: {
    fontFamily: "PopBold",
    fontSize: 12,
    color: "black",
  },
});