//
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import NotificationsScreen from './main';
//
const Stack = createNativeStackNavigator();
//
const NotificationsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
    )
}
//
export default NotificationsStack;
//
const styles = StyleSheet.create({});
//