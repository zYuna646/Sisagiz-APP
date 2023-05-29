import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Font from 'expo-font';
import { _retrieve_data } from '../Handler/handler_storage';
import { Feather } from "@expo/vector-icons";
import SelectDropdown from 'react-native-select-dropdown';
import { post_measurment } from '../API/all_api';
import { _store_data } from '../Handler/handler_storage';
import { useNavigationState } from '@react-navigation/native';


export default function NewMeasurmentRes(props) {
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
            {fontLoaded ?
                (
                    <ScrollView style={{ flex: 1, backgroundColor: 'rgba(150, 105, 169, 0.11)' }}>
                        <View style={{ flex: 1, margin: '5%', flexDirection: 'column' }}>
                            <Text style={{ fontFamily: 'PopBold', fontSize: 24, color: '#1C1646' }}>Hasil Pengukuran</Text>
                            {bayi != null ? (
                                <Text style={{ fontFamily: "PopBold", fontSize: 18}}>
                                    {bayi.Toddler.name}
                                </Text>
                            ) : (
                                <ActivityIndicator />
                            )}
                            {bayi != null ?
                                (
                                    <>
                                        <View style={[{ backgroundColor: '#4D1564' }, styles.container]}>
                                            <Text style={styles.txt}>Detail Pengukuran</Text>
                                            <View style={{ backgroundColor: 'white', borderBottomStartRadius: 15, borderBottomEndRadius: 15 }}>
                                                <View style={styles.content}>
                                                    <View>
                                                        <Text style={styles.smalTxt}>Tanggal Pengukuran</Text>
                                                        <Text style={styles.smalTxt}>Umur</Text>
                                                        <Text style={styles.smalTxt}>Berat Badan</Text>
                                                        <Text style={styles.smalTxt}>Tinggi Badan</Text>
                                                        <Text style={styles.smalTxt}>Status Gizi BB/U</Text>
                                                        <Text style={styles.smalTxt}>Status Gizi TB/U</Text>
                                                        <Text style={styles.smalTxt}>Status Gizi BB/TB</Text>
                                                        <Text style={styles.smalTxt}>Vitamin</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.smalTxt}>    :    </Text>
                                                        <Text style={styles.smalTxt}>    :    </Text>
                                                        <Text style={styles.smalTxt}>    :    </Text>
                                                        <Text style={styles.smalTxt}>    :    </Text>
                                                        <Text style={styles.smalTxt}>    :    </Text>
                                                        <Text style={styles.smalTxt}>    :    </Text>
                                                        <Text style={styles.smalTxt}>    :    </Text>
                                                        <Text style={styles.smalTxt}>    :    </Text>
                                                    </View>
                                                    <View style={{ marginTop: 3 }}>
                                                        <Text style={styles.hasilTxt}>{bayi.date}</Text>
                                                        <Text style={styles.hasilTxt}>{bayi.current_age} Bulan</Text>
                                                        <Text style={styles.hasilTxt}>{bayi.bb} Kg</Text>
                                                        <Text style={styles.hasilTxt}>{bayi.tb} Cm</Text>
                                                        <Text style={styles.hasilTxt}>{bayi.bbu.replace(/[(][^)]*[)]/g, '')}</Text>
                                                        <Text style={styles.hasilTxt}>{bayi.tbu.replace(/[(][^)]*[)]/g, '')}</Text>
                                                        <Text style={styles.hasilTxt}>{bayi.bbtb.replace(/[(][^)]*[)]/g, '')}</Text>
                                                        <Text style={styles.hasilTxt}>{bayi.vitamin}</Text>

                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={[{ backgroundColor: '#9669A9' }, styles.container]}>
                                            <Text style={styles.txt}>Prediksi Klasifikasi</Text>
                                            <View style={{ backgroundColor: 'white', borderBottomStartRadius: 15, borderBottomEndRadius: 15 }}>
                                                <View style={{ backgroundColor: bayi.predict_result == 0 ? ('#7CFF4E') : ('#FFBA4E'), }}>
                                                    <View style={{ margin: '5%' }}>
                                                        <Text style={styles.smalTxt}>Hasil Prediksi Klasifikasi</Text>
                                                        <Text style={styles.rekomendasiTxt}>TERINDIKASI {bayi.predict_result == 0 ? ('NORMAL') : ('STUNTING')}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <View style={{ margin: '5%' }}>
                                                        <Text style={styles.smalTxt}>Dengan Tingkat Akurasi Klasifikasi</Text>
                                                        <Text style={styles.rekomendasiTxt}>{bayi.predict_accuracy * 100} %</Text>
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
                                                        <Text style={styles.rekomendasiTxt}>{bayi.rekombbu} Kg</Text>

                                                        <Text style={styles.smalTxt}>Rekomendasi TB/U</Text>
                                                        <Text style={styles.rekomendasiTxt}>{bayi.rekomtbu} Cm</Text>


                                                        <Text style={styles.smalTxt}>Rekomendasi BB/TB</Text>
                                                        <Text style={styles.rekomendasiTxt}>{bayi.rekombbtb} Kg</Text>

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