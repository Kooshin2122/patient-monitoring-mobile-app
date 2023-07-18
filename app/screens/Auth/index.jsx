//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import MainAuthScreen from './main';
import SignInStack from './Sign-In';
import SignUpScreen from './Sign-Up';

//
const Stack = createNativeStackNavigator();
//
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainAuthScreen" component={MainAuthScreen} />
            <Stack.Screen name="SignInStack" component={SignInStack} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    )
}
//
export default AuthStack;
//