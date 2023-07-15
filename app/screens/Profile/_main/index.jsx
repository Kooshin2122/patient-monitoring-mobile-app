//
import React, { useState } from 'react';
// import { navigateScreen } from './services';
import { Devider } from '../../../components';
import UserProfile from './components/UserProfile';
import { useNavigation } from '@react-navigation/core';
import { LAY_OUT, COLORS } from '../../../theme/globalStyle';
import { Header, LogingModal, SettingCards } from './components';
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
//
const { height } = Dimensions.get('window');
//
const ProfileScreen = () => {
    //
    const { navigate } = useNavigation();
    const [logingToggle, setLogingToggle] = useState(false);
    //
    const navigateScreen = (navigationHook, screenName) => {
        navigationHook(screenName)
    }
    //
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {/* Head */}
                <View style={styles.head}>
                    <Header title="My Profile" />
                    <Devider />
                    <UserProfile />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <Devider height={23} />
                    <View style={styles.statusCon}>
                        <Text style={styles.statusTitle}>Status</Text>
                        <View style={styles.status}>
                            <Text style={styles.statusTxt}>Connected</Text>
                        </View>
                    </View>
                    <Devider height={23} />
                    <SettingCards
                        title="Edit Profile"
                        iconName="edit" iconBg="#FAE8B5"
                        onClickHandler={() => navigate("UserForm")}
                    />
                    <Devider height={23} />
                    <SettingCards
                        title="Change Password"
                        onClickHandler={() => navigate("ChangePassword")}
                        iconName="unlock" iconBg={COLORS.light_green_color}
                    />
                    <Devider height={23} />
                    <SettingCards
                        title="Logout"
                        iconName="log-out" iconBg="#FAB5B5"
                        onClickHandler={() => setLogingToggle(true)}
                    />
                </View>
            </ScrollView>
            {logingToggle && <LogingModal hideModal={setLogingToggle} />}
        </SafeAreaView>
    )
}
//
export default ProfileScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary_color,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : StatusBar.currentHeight
    },
    head: {
        zIndex: 0,
        width: '100%',
        paddingBottom: '5%',
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.primary_color
    },
    imageViewCon: {
        alignSelf: 'center'
    },
    body: {
        flex: 1,
        zIndex: 1000,
        padding: '6%',
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_tertiary
    },
    statusCon: {
        padding: '4%',
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.bg_primary,
        shadowColor: COLORS.black800,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 3,
    },
    statusTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.primary_color,
    },
    statusTxt: {
        fontSize: 13,
        fontWeight: "bold",
        color: COLORS.bg_primary,
    },
    status: {
        borderRadius: 50,
        paddingVertical: "2%",
        paddingHorizontal: "4%",
        backgroundColor: COLORS.primary_color
    }
})
//