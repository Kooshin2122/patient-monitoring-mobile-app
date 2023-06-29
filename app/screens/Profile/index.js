//
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import ProfileScreen from './_main';
import UserInfoFormScreen from './UserInfoForm';
import ChangePasswordScreen from './changePassword';
//
const Stack = createNativeStackNavigator();
//
const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="UserForm" component={UserInfoFormScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        </Stack.Navigator>
    )
}
//
export default ProfileStack;
//
const styles = StyleSheet.create({});
//