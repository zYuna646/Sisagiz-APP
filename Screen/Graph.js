import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Logo from './Logo'
import { useRef } from 'react';
import { LineChart } from 'react-native-chart-kit';
import * as Font from 'expo-font';
import { _retrieve_data, _store_data } from '../Handler/handler_storage';
import { Feather } from "@expo/vector-icons";
import { useNavigationState } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { get_growthBy_uuid } from '../API/all_api';


export default function Graph(props) {
  const [fontLoaded, set_fontLoaded] = React.useState(false)
  const [color, setColor] = React.useState(['#FFCE81', 'gray', 'gray'])
  const [dataBayi, setDataBayi] = React.useState([])
  const [doSubmit, setDoSubmit] = React.useState(false)
  const [doChose, setDoChose] = React.useState(false)
  const [activity, setActivity] = React.useState(false)
  const [uuid, setuuid] = React.useState('')
  const [growth_data, setData] = React.useState([])
  const [year, setYear] = React.useState(null)
  const navigationState = useNavigationState(state => state)
  const current = navigationState.index
  const [month, setMonth] = React.useState(null)
  const [currentMonth, setCurrentMonth] = React.useState(null)

  const dropdownRef = useRef({});
  const [yearText, setYearText] = React.useState('')
  const [riwayat, setRiwayat] = React.useState(null)
  const monthRef = useRef({})

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
    const data = await _retrieve_data('bayi');
    const riwayat = await _retrieve_data('measurment')
    if (data_user.user.role !== 'masyarakat' && data_user != null) {
      const newDataBayi = data.filter((value) => value.Posyandu.uuid === data_user.user.posyandu_uuid);
      setDataBayi(newDataBayi);
    } else {
      const newDataBayi = data.filter((value) => value.Parent.uuid === data_user.user.parent_uuid);
      setDataBayi(newDataBayi)
    }
    setRiwayat(riwayat)
  }

  React.useEffect(() => {
    fontLoad()
    fetchData()
  }, [current])

  const [monthSubmit, setMonthSubmit] = React.useState(false)
    const get_report = async (uuid) => {
        let dt = []
        const data_user = await _retrieve_data('user')
        await get_growthBy_uuid(data_user.jwt.token, {
            uuid: uuid
        }).then((result) => {
            if (result.status == 200) {
                const label = result.data.data.map((value, index) => { return value.date })
                const years = label.map(date => {
                    const [year, month, day] = date.split('-');
                    return year;
                })
                const month = label.map(date => {
                    const [year, month, day] = date.split('-');
                    return month;
                })
                const uniqueYears = [...new Set(years)];
                setUnique(uniqueYears)
                setData(result.data.data)
                setDoSubmit(true)
                //setGraph(result.data.data)
            } else {
                alert(result.message)
            }
        }).catch(err => alert(err))
    }

    const [allgrowth, setAllGrowth] = React.useState({})
    const [unique, setUnique] = React.useState([])
    const setGraph = async (year, dt) => {
        const filteredData = dt.filter((value, index) => {
            return value.date.substring(0, 4) === year
        });

        let all_data = {
            label: filteredData.map((value, index) => { return value.date.split('-').slice(1, 2)[0] }),
            bb: filteredData.map((value, index) => { return value.bb }),
            tb: filteredData.map((value, index) => { return value.tb }),
            rekombbu: filteredData.map((value, index) => { return value.rekombbu }),
            rekomtbu: filteredData.map((value, index) => { return value.rekomtbu }),
            rekombbtb: filteredData.map((value, index) => { return value.rekombbtb }),

            bbumin3sd: filteredData.map((value, index) => { return value.bbumin3sd }),
            bbumin2sd: filteredData.map((value, index) => { return value.bbumin2sd }),
            bbumin1sd: filteredData.map((value, index) => { return value.bbumin1sd }),
            bbuplus3sd: filteredData.map((value, index) => { return value.bbuplus3sd }),
            bbuplus2sd: filteredData.map((value, index) => { return value.bbuplus2sd }),
            bbuplus1sd: filteredData.map((value, index) => { return value.bbuplus1sd }),

            tbumin3sd: filteredData.map((value, index) => { return value.tbumin3sd }),
            tbumin2sd: filteredData.map((value, index) => { return value.tbumin2sd }),
            tbumin1sd: filteredData.map((value, index) => { return value.tbumin1sd }),
            tbuplus3sd: filteredData.map((value, index) => { return value.tbuplus3sd }),
            tbuplus2sd: filteredData.map((value, index) => { return value.tbuplus2sd }),
            tbuplus1sd: filteredData.map((value, index) => { return value.tbuplus1sd }),

            bbtbmin3sd: filteredData.map((value, index) => { return value.bbtbmin3sd }),
            bbtbmin2sd: filteredData.map((value, index) => { return value.bbtbmin2sd }),
            bbtbmin1sd: filteredData.map((value, index) => { return value.bbtbmin1sd }),
            bbtbplus3sd: filteredData.map((value, index) => { return value.bbtbplus3sd }),
            bbtbplus2sd: filteredData.map((value, index) => { return value.bbtbplus2sd }),
            bbtbplus1sd: filteredData.map((value, index) => { return value.bbtbplus1sd }),
        };
        setAllGrowth(all_data)
        setDoChose(true)
    }

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#FFCE81",
        backgroundGradientTo: "#FFCE81",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: true, // optional
    };

    const [selected, setSelected] = React.useState(0)
    const ColorHandler = (i) => {
        let c = ['gray', 'gray', 'gray']
        c[i] = '#FFCE81'
        setColor(c)
        setSelected(i)
    }
    const click = async (value) => {
        await _store_data('pengukuran', {
            uuid: value.Toddler.uuid,
            date: value.date
        }).then((result) => {
            props.navigation.navigate('Measurment_res')
        })
    }

    const dropIcon = () =>{
        return(
          <Feather name="arrow-down-circle" size={25} color="black" />
        )
      }

    const data = {
        labels: allgrowth.label,
        datasets: [
            {
                data: selected == 1 ? allgrowth.tb : allgrowth.bb,
                color: (opacity = 0) => `rgba(0, 0, 255, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: selected == 0 ? allgrowth.bbumin3sd : (selected == 1 ? allgrowth.tbumin3sd : allgrowth.bbtbmin3sd),
                color: (opacity = 0) => `rgba(255,255,204, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: selected == 0 ? allgrowth.bbumin2sd : (selected == 1 ? allgrowth.tbumin2sd : allgrowth.bbtbmin2sd),
                color: (opacity = 0) => `rgba(255,255,153, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: selected == 0 ? allgrowth.bbumin1sd : (selected == 1 ? allgrowth.tbumin1sd : allgrowth.bbtbmin1sd),
                color: (opacity = 0) => `rgba(255,255,102, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }, {
                data: selected == 0 ? allgrowth.rekombbu : (selected == 1 ? allgrowth.rekomtbu : allgrowth.rekombbtb),
                color: (opacity = 0) => `rgba(255, 20, 147, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: selected == 0 ? allgrowth.bbuplus1sd : (selected == 1 ? allgrowth.tbuplus1sd : allgrowth.bbtbplus1sd),
                color: (opacity = 0) => `rgba(204,204,0, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }, {
                data: selected == 0 ? allgrowth.bbuplus2sd : (selected == 1 ? allgrowth.tbuplus2sd : allgrowth.bbtbplus2sd),
                color: (opacity = 0) => `rgba(153,153,0, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: selected == 0 ? allgrowth.bbuplus3sd : (selected == 1 ? allgrowth.tbuplus3sd : allgrowth.bbtbplus3sd),
                color: (opacity = 0) => `rgba(102,102,0, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: [selected == 1 ? 'TB' : 'BB', '-3 SD', '-2 SD', '-1 SD', 'Median', '+1 SD', '+2 SD', '+3 SD'] // optional
    };

  return (
    <>
      {fontLoad ?
        (
          <View style={{ backgroundColor: '#FFCE81' }}>
            <View style={{ marginTop: '25%', alignSelf: 'center' }}>
                <SelectDropdown
                    search={true}


                    dropdownStyle={{ borderRadius: 20, fontFamily: 'PopBold' }}
                    rowTextStyle={{ fontFamily: 'PopMedium', fontSize: 15 }}
                    selectedRowTextStyle={{ color: 'white' }}
                    selectedRowStyle={{ backgroundColor: '#FFCE81' }}
                    renderDropdownIcon={dropIcon}
                    buttonStyle={{ borderRadius: 20, width: '80%', marginLeft: '15%', marginRight: '15%', marginBottom: 15, backgroundColor: 'white', borderColor: '#603802', borderWidth: 1 }}
                    buttonTextStyle={{ fontFamily: 'PopBold', fontSize: 12 }}

                    searchInputStyle={{ fontFamily: 'PopBold' }}
                    defaultButtonText='Pilih Bayi'
                    data={dataBayi.map((value) => { return value.name.split(' ')[0] + ' (' + value.jk + ')' + ' - ' + value.Parent.no_kk })}
                    onSelect={(selectedItem, index) => {
                        if (doSubmit) { 
                            dropdownRef.current.reset()
                        }
                        setDoChose(false)
                        setuuid(dataBayi[index].uuid)
                        get_report(dataBayi[index].uuid)
                    }}
                />
                {doSubmit ? (
                    <ScrollView style={{ marginTop: '5%', borderRadius: 20, alignSelf: 'center', backgroundColor: 'white', width: '100%' }}>
                        <Text style={{ marginTop: '5%', marginLeft: '5%', fontSize: 20, fontFamily: 'PopBold' }}>Waktu Pengukuran</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <SelectDropdown
                                dropdownStyle={{ borderRadius: 20, fontFamily: 'PopBold' }}
                                rowTextStyle={{ fontFamily: 'PopMedium', fontSize: 15 }}
                                selectedRowTextStyle={{ color: 'white' }}
                                selectedRowStyle={{ backgroundColor: '#FFCE81' }}
                                buttonStyle={{ margin: '5%', borderRadius: 15, width: 160, }}
                                buttonTextStyle={{ color: '#9C9C9C', fontFamily: 'PopMedium',}}
                                defaultButtonText='Bulan'
                                renderDropdownIcon={dropIcon}
                                defaultValueByIndex={12}
                                data={["Januari",
                                    "Februari",
                                    "Maret",
                                    "April",
                                    "Mei",
                                    "Juni",
                                    "Juli",
                                    "Agustus",
                                    "September",
                                    "Oktober",
                                    "November",
                                    "Desember",
                                    "Semua"]}
                                onSelect={(selectedItem, index) => {
                                    if (index != 12) {
                                        let cmonth = '';
                                        if (index < 9) {
                                            cmonth = '0' + (index + 1); // Add leading zero for single digit month numbers
                                        } else {
                                            cmonth = index + 1;
                                        }
                                        setMonth(cmonth);
                                    } else {
                                        console.log('yes');
                                        setMonth(null)
                                    }
                                }}
                                ref={monthRef}
                            />
                            <SelectDropdown
                                dropdownStyle={{ borderRadius: 20, fontFamily: 'PopBold' }}
                                rowTextStyle={{ fontFamily: 'PopMedium', fontSize: 15 }}
                                selectedRowTextStyle={{ color: 'white' }}
                                selectedRowStyle={{ backgroundColor: '#FFCE81' }}
                                search={true}
                                renderDropdownIcon={dropIcon}
                                buttonStyle={{ margin: '5%', borderRadius: 15, width: 150 }}
                                buttonTextStyle={{ color: '#9C9C9C', fontFamily: 'PopMedium' }}
                                defaultButtonText='Tahun'
                                data={unique}
                                onSelect={(selectedItem, index) => {
                                    setGraph(selectedItem, growth_data)
                                    setYearText(selectedItem)
                                    setYear(selectedItem)
                                    setSelected(0)
                                }}
                                ref={dropdownRef}
                            />
                        </View>
                        {doChose ? (
                            <View style={{ paddingBottom: 50 }}>
                                <LineChart
                                    style={{
                                        marginVertical: '5%',
                                        backgroundColor: 'white',
                                        borderRadius: 20
                                    }}
                                    data={data}
                                    width={screenWidth}
                                    height={220}
                                    chartConfig={chartConfig}
                                />
                                <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between' }}>
                                    <TouchableOpacity style={{ backgroundColor: color[0], marginRight: '5%', borderRadius: 20 }} onPress={() => {
                                        ColorHandler(0)
                                    }}>
                                        <Text style={{ marginRight: '5%', fontFamily: 'PopMedium', fontSize: 15, textAlign: 'center' }}>BB/U</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: color[1], marginRight: '5%', borderRadius: 20 }} onPress={() => {
                                        ColorHandler(1)
                                    }}>
                                        <Text style={{ marginRight: '5%', fontFamily: 'PopMedium', fontSize: 15, textAlign: 'center' }}>TB/U</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: color[2], borderRadius: 20 }} onPress={() => {
                                        ColorHandler(2)
                                    }}>
                                        <Text style={{ marginRight: '5%', fontFamily: 'PopMedium', fontSize: 15, textAlign: 'center' }}>BB/TB</Text>
                                    </TouchableOpacity>
                                </View>
                                {riwayat.map((value, index) => (
                                    ((value.date.substring(0, 4) === year && value.date.split('-')[1] === month) && (value.Toddler.uuid === uuid && month !== null)) || (value.date.substring(0, 4) === year && value.Toddler.uuid === uuid && month === null) ? (
                                        <TouchableOpacity key={index} onPress={() => {
                                            click(value)
                                        }}>
                                            <View style={{ margin: '5%', backgroundColor: '#FFCE81', borderRadius: 20 }}>
                                                <Text style={{ alignSelf: 'flex-start', marginLeft: '5%', marginTop: '5%', fontFamily: 'PopBold', fontSize: 15 }}>{value.Toddler.name}</Text>
                                                <Text style={{ alignSelf: 'flex-start', color: 'gray', marginLeft: '5%', fontFamily: 'PopBold', fontSize: 10 }}>{value.date}</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                                    <View style={{
                                                        width: 125,
                                                        backgroundColor: 'white', borderRadius: 25, shadowColor: '#000',
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 3,
                                                        },
                                                        shadowOpacity: 0.30,
                                                        shadowRadius: 5,
                                                        elevation: 10,
                                                    }}>
                                                        <Text style={{ marginTop: 5, fontFamily: 'PopMedium', color: 'gray', fontSize: 12, textAlign: 'center' }}>Berat Badan</Text>
                                                        <Text style={{ marginLeft: 10, marginRight: 10, marginBottom: 10, fontFamily: 'PopBold', textAlign: 'center' }}>{value.bb} Kg</Text>
                                                    </View>
                                                    <View style={{
                                                        width: 125,
                                                        backgroundColor: 'white', borderRadius: 25, marginLeft: 20, shadowColor: '#000',
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 3,
                                                        },
                                                        shadowOpacity: 0.30,
                                                        shadowRadius: 5,
                                                        elevation: 10,
                                                    }}>
                                                        <Text style={{ marginTop: 5, fontFamily: 'PopMedium', color: 'gray', fontSize: 12, textAlign: 'center' }}>Tinggi Badan</Text>
                                                        <Text style={{ marginLeft: 10, marginRight: 10, marginBottom: 10, fontFamily: 'PopBold', textAlign: 'center' }}>{value.tb} Cm</Text>
                                                    </View>

                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 15, justifyContent: 'center' }}>
                                                    <View style={{
                                                        width: 125,
                                                        backgroundColor: 'white', borderRadius: 25, shadowColor: '#000',
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 3,
                                                        },
                                                        shadowOpacity: 0.30,
                                                        shadowRadius: 5,
                                                        elevation: 10,
                                                    }}>
                                                        <Text style={{ marginTop: 5, fontFamily: 'PopMedium', color: 'gray', fontSize: 12, textAlign: 'center' }}>Umur</Text>
                                                        <Text style={{ marginLeft: 10, marginRight: 10, marginBottom: 10, fontFamily: 'PopBold', textAlign: 'center' }}>{value.current_age} Bulan</Text>
                                                    </View>
                                                    <View style={{
                                                        width: 125,
                                                        backgroundColor: 'white', borderRadius: 25, marginLeft: 20, shadowColor: '#000',
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 3,
                                                        },
                                                        shadowOpacity: 0.30,
                                                        shadowRadius: 5,
                                                        elevation: 10,
                                                    }}>
                                                        <Text style={{ marginTop: 5, fontFamily: 'PopMedium', color: 'gray', fontSize: 12, textAlign: 'center' }}>Hasil</Text>
                                                        <Text style={{ marginLeft: 10, marginRight: 10, marginBottom: 10, fontFamily: 'PopBold', textAlign: 'center' }}>{value.predict_result === 0 ? ('Normal') : ('Stunting')}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (null)
                                ))}
                            </View>

                        ) : (
                            <Text></Text>
                        )}
                    </ScrollView>
                )
                    :
                    (
                        <Text></Text>
                    )}
            </View>
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

const styles = StyleSheet.create({})