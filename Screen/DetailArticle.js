import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { useWindowDimensions } from 'react-native'
import React from 'react'
import { MaterialIcons } from 'react-native-vector-icons'
import * as Font from 'expo-font';
import { _retrieve_data } from '../Handler/handler_storage'

export default function DetailArticle(props) {
  const { width } = useWindowDimensions()
  const [fontLoaded, set_fontLoaded]= React.useState(false)
  const [article, setArticle] = React.useState(null)
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
    const data_article = await _retrieve_data('DetailArticle')
    setArticle(data_article != null ? data_article : null)
  }

  React.useEffect(() => {
    fetchData()
    fontLoad()
  }, [])

  return (
    <View>
      <TouchableOpacity onPress={() => {
        props.navigation.navigate("Article");
      }}>
        <View style={{ marginTop: '15%', marginLeft: '5%', backgroundColor: 'red', width: 40, height: 40, alignItems: 'center', borderRadius: 20 }}>
          <View style={{ marginTop: 8 }}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </View>
        </View>
      </TouchableOpacity>
      {article != null && fontLoaded == true  ?
        (
          <View>
            <View style={styles.container}>
              <Image source={{ uri: article.url }} style={styles.image} />
              <Text style={styles.title}>{article.title}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontFamily: 'PopMedium', fontSize: 15, color: '#E9B96F', marginHorizontal: 50 }}>{article.user.name}</Text>
                <Text style={{ fontFamily: 'PopMedium', fontSize: 15, color: '#E9B96F', marginHorizontal: 50 }}>{article.createdAt}</Text>
              </View>
            </View>
            <ScrollView style={{ marginTop: -50 }}>
              <View style={{ marginRight: '10%', marginLeft: '10%' }}>
                <RenderHTML
                  contentWidth={width}
                  source={{ html: article.body }}
                />
              </View>
            </ScrollView>
          </View>
        ) :
        (
          <ActivityIndicator />
        )}
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
    borderRadius: 20,
    marginTop: 5,
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
    fontSize: 20,
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
})