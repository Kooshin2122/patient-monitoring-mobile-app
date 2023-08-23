import React from 'react'
import { Platform } from 'react-native';
import { COLORS } from '../../theme/globalStyle';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Icons
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// screens
import { HomeScreen, TrackingScreen, ResponsibleScreen, ProfileStack, NotificationsStack } from '../../screens';
//
const Tab = createBottomTabNavigator();
//
const BotomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary_color,
                tabBarStyle: {
                    borderTopColor: 'rgba(0, 0, 0, .2)',
                    paddingTop: Platform.OS === 'android' ? 15 : 10,
                    paddingBottom: Platform.OS === 'android' ? 15 : 30,
                    height: Platform.OS === 'android' ? 70 : 90,
                    // backgroundColor: 'blue'
                },
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Track" component={TrackingScreen}
                options={{
                    tabBarLabel: 'Track',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="search-location" color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen name="Responsible" component={ResponsibleScreen}
                options={{
                    // tabBarBadge: 1,
                    tabBarLabel: 'Responsible',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="users" color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen name="NotificationsStack" component={NotificationsStack}
                options={{
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen name="ProfileStack" component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-alt" color={color} size={20} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BotomTabs;

