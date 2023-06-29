//
import React from 'react';
import BotomTabs from './BottomNav';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//
const Root = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <BotomTabs />
        </NavigationContainer>
    )
}
//
export default Root;
//
const styles = StyleSheet.create({})
//