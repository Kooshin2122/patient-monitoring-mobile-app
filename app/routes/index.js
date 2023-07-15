//
import React from 'react';
import BotomTabs from './BottomNav';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '../screens/Auth';
//
const Root = () => {
    const isUserLogin = true;
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