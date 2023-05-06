import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import Article from './Article'
import Calculator from './Calculator'
import Graph from './Graph'
import Login from './Login'
import Measurment from './Measurment'
import Profile from './Profile'
import Home from './Home'

import { _store_data, _retrieve_data } from '../Handler/handler_storage'
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { get_all_bayi, get_articleBy_category } from '../API/all_api'
import { useRoute } from '@react-navigation/native'


export default function Tabs(props) {
    const Tab = createBottomTabNavigator()
    const [user, set_user] = React.useState(null)
    const route = useRoute()
    const fetchData = async () => {

        const user = await _retrieve_data('user')
        set_user(user)
        await get_articleBy_category({
            category: ''
        }).then((result) => {
            if (result.status == 200) {
                const articleData = result.data.data;
                _store_data('Article', articleData)
            }
        })

        if(user!= null){
            await get_all_bayi(user.jwt.token, {
            }).then((result) => {
                
            })


        }
    }
    React.useEffect(() => {
        fetchData()
    }, [route])
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: true,
                    headerShown: false
                }}
            >
                <Tab.Screen
                    options={{
                        tabBarIcon: (props) => (
                            <Feather name="home" size={24} color="black" />
                        ),
                    }}
                    name="Home"
                    component={Home} />


                <Tab.Screen
                    options={{
                        tabBarIcon: (props) => (
                            <Feather name="aperture" size={24} color="black" />
                        ),
                    }}
                    name={user != null ? (user.user.role !== 'masyarakat' ? ("Pengukuran") : ('Status Gizi')) : ('Status Gizi')}
                    component={user != null ? (user.user.role !== 'masyarakat' ? (Measurment) : (Graph)) : (Graph)} />
                <Tab.Screen
                    options={{
                        tabBarIcon: (props) => (
                            <Feather name="book" size={24} color="black" />
                        ),
                    }}
                    name="Article"
                    component={Article} />
                <Tab.Screen
                    options={{
                        tabBarIcon: (props) => (
                            <Feather name="user" size={24} color="black" />
                        ),
                    }}
                    name={user != null ? ('Profile') : ('Login')}
                    component={user != null ? (Profile) : (Login)} />
            </Tab.Navigator>

        </>
    )
}

const styles = StyleSheet.create({})