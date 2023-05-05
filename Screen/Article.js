import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import * as Font from 'expo-font';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { _retrieve_data, _store_data } from '../Handler/handler_storage';


export default function Article(props) {
    const [category, set_category] = React.useState(0)
    const [articleData, set_articleData] = React.useState(null);
    const [btn_color, set_color] = React.useState(['gray', '#603802', '#603802'])
    const articleItems = [];
    const [fontLoaded, set_fontLoaded]= React.useState(false)

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
        const article = await _retrieve_data('Article')
        if (article != null) {
            const index = await article.length
            for (let i = 0; i < index; i++) {
                const dateString = article[i].createdAt.substring(0, 10)
                const date = new Date(dateString)
                const formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                articleItems.push({
                    category: article[i].category,
                    url: article[i].url,
                    createdAt: formattedDate,
                    uuid: article[i].uuid,
                    title: article[i].title,
                    body: article[i].body,
                    user: article[i].User
                });
            }

            let new_article = []
            articleItems.map((value) => {
                if (category == 0) {
                    new_article.push(value)
                } else {
                    if (category == 1 && value.category == 'Stunting') {
                        new_article.push(value)
                    } else if (category == 2 && value.category == 'Gizi') {
                        new_article.push(value)
                    }
                }
            })
            if (new_article.length != 0) {
                set_articleData(new_article.reverse());
            } else {
                alert('Data Tidak Ditemukan')
                set_articleData(null)
            }
        }
    }

    React.useEffect(() => {
        fetchData()
        fontLoad()
    }, [category])

    const handlePress = (i) => {
        let c = ['#603802', '#603802', '#603802']
        c[i] = 'gray'
        set_color(c)
    }
    const handleArticle = async (data) => {
        await _store_data('DetailArticle', data)
        props.navigation.navigate("DetailArticle")
    }
    return (
        <View style={{ flex: 1 }}>
            {articleData != null && fontLoaded == true ?
                (

                    <View style={{ flex: 1 }}>
                        <Text style={{ marginTop: 70, fontFamily: 'PopBold', fontSize: 25, color: '#E9B96F', marginLeft: '6%' }}>Artikel Status Gizi</Text>
                        <TouchableOpacity onPress={() => handleArticle(articleData[0])}>
                            <View style={styles.container}>
                                <Image source={{ uri: articleData[0].url }} style={styles.image} />
                                <Text style={styles.title}>{articleData[0].title}</Text>
                                <Text style={styles.date}>{articleData[0].createdAt}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                handlePress(0)
                                set_category(0)
                            }}>
                                <Text style={{ fontFamily: 'PopBold', color: btn_color[0], fontSize: 15 }}>Semua</Text>
                            </TouchableOpacity >
                            <TouchableOpacity onPress={() => {
                                handlePress(1)
                                set_category(1)
                            }}>
                                <Text style={{ marginLeft: 55, fontFamily: 'PopBold', color: btn_color[1], fontSize: 15 }}>Stunting</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                handlePress(2)
                                set_category(2)
                            }} >
                                <Text style={{ marginLeft: 55, fontFamily: 'PopBold', color: btn_color[2], fontSize: 15 }}>Gizi</Text>
                            </TouchableOpacity>

                        </View>

                        <ScrollView vertical style={{ flex: 1 }}>
                            {articleData != null ? (
                                articleData.map((image, index) => (
                                    index === 0 ? <Text key={index}></Text> :
                                        <TouchableOpacity key={index} onPress={() => handleArticle(image)}>
                                            <View style={styles.content}>
                                                <View style={styles.imageContainer}>
                                                    <Image style={styles.logo} source={{ uri: image.url }} />
                                                </View>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.img_title}>{image.title}</Text>
                                                    <Text style={styles.img_date}>{image.createdAt}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                ))
                            )
                                : (
                                    <Text>Data Blm Ada</Text>
                                )}
                        </ScrollView>
                    </View>

                )
                :
                (
                    <ActivityIndicator />
                )
            }


        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        elevation: 10,
        marginTop: 5,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 75,
        margin: 10,
        borderRadius: 45,
        overflow: 'hidden'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 10
    },
    img_title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    img_date: {
        paddingTop: 10,
        fontSize: 10,
        color: 'black',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        elevation: 10,
        marginTop: 20,
        margin: '7%',
        paddingTop: '10%',
        paddingBottom: '5%',
        paddingRight: '5%',
        paddingLeft: '5%',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        resizeMode: 'cover',
        height: 150,
        borderRadius: 15

    },
    title: {
        fontSize: 17,
        textAlign: 'justify',
        color: '#603802',
        fontFamily: 'PopBold',
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    date: {
        fontSize: 16,
        fontFamily: 'PopMedium',
        color: 'gray',
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    input: {
        height: 40,
        margin: (12, 12, 50, 12),
        borderWidth: 1,
        padding: 10,
    },

})