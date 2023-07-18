//
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import PatientForm from './PatientForm';
import ResponsibleForm from './ResponsibleForm';
import ForgotPasswordForm from './ForgotPassword';

//
const Stack = createNativeStackNavigator();
//
const SignInStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PatientForm" component={PatientForm} />
            <Stack.Screen name="ResponsibleForm" component={ResponsibleForm} />
            <Stack.Screen name="ForgotPasswordForm" component={ForgotPasswordForm} />
        </Stack.Navigator>
    )
}
//
export default SignInStack;
//
const styles = StyleSheet.create({})
//