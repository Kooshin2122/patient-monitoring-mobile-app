//
import React, { useEffect, useState } from 'react';
import BotomTabs from './BottomNav';
import AuthStack from '../screens/Auth';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { readData } from '../utils/localStorage/AsyncStorage';
import { useAppContext } from '../context';
//
const Root = () => {
    const { isUserLogin, setIsUserLogin } = useAppContext();
    //
    const getToken = async () => {
        const token = await readData("token");
        token ? setIsUserLogin(true) : setIsUserLogin(false);
    }
    //
    useEffect(() => {
        getToken();
    }, []);
    //
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            {
                isUserLogin
                    ?
                    <BotomTabs />
                    :
                    <AuthStack />
            }
        </NavigationContainer>
    )
}
//
export default Root;
//
const styles = StyleSheet.create({})
//