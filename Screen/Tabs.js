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
import { get_articleBy_category } from '../API/all_api'


export default function Tabs(props) {
    const Tab = createBottomTabNavigator()



    const [user, set_user] = React.useState(null)

    const fetchData = async () => {

        const user = await _retrieve_data('user')
        set_user(user)

        await get_articleBy_category({
            category: ''
        }).then((result) => {
            if(result.status == 200){
                const articleData = result.data.data;
                _store_data('Article', articleData)
            }
        })
    }
    React.useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            {user == null ?
            (
                <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
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
                    name="Status Gizi"
                    component={Graph} />
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
                    name="Login"
                    component={Login} />
            </Tab.Navigator>
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