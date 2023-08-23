//
import React, { useCallback, useState } from 'react';
import { Devider } from '../../../components';
import { COLORS } from '../../../theme/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import { FlatList, Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NotificationsCard } from './components';
import { fetchGetAuthData } from '../../../API';
import { useFocusEffect } from '@react-navigation/core';
//
const NotificationsScreen = () => {
    //
    const [loading, setLoading] = useState(false);
    const [notificationsData, setNotificationsData] = useState([]);
    //
    const getNotifications = async () => {
        try {
            const userInfo = await fetchGetAuthData("api/patients/userProfile/");
            // console.log("userInfo--------", userInfo);
            if (userInfo?.accountType == "RESPONSIBLE") {
                setLoading(true);
                const res = await fetchGetAuthData('api/patients/notifications/responsible/')
                setNotificationsData(res);
                console.log("res........", res);
                setLoading(false);
            }
            else if (userInfo?.accountType == "PATIENT") {
                setLoading(true);
                const res = await fetchGetAuthData('api/patients/notifications/')
                setNotificationsData(res);
                console.log("res........", res);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(`error happen when getting notification data in notification screeen ${error}`);
        }
    }
    useFocusEffect(useCallback(() => {
        getNotifications();
    }, []))
    //
    return (
        <View style={styles.container}>
            {
                Platform.OS === "ios" &&
                <View style={styles.statusBar} />
            }
            <SafeAreaView style={[styles.container, { backgroundColor: notificationsData?.length == 0 ? "#ffffff" : COLORS.bg_secondary }]}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={COLORS.primary_color}
                />
                <View style={styles.header}>
                    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 7 }}>
                        <Feather name="bell" size={20} color="#ffffff" />
                        <Text style={styles.headerTitle}>
                            Notifications
                        </Text>
                    </View>
                </View>
                {/* {
                    loading &&
                    <LoadingModal />
                } */}
                <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={getNotifications} />} style={styles.body}>
                    <Text style={styles.todayTxt}>
                        Today
                    </Text>
                    <Devider height={7} />
                    <FlatList
                        scrollEnabled={false}
                        data={notificationsData}
                        renderItem={({ item }) => <NotificationsCard {...item} />}
                    // ListEmptyComponent={<ListEmptyComponent onClickBtn={() => navigate("AddNewPatient")} message="Looks like you don't have any Notifications" />}
                    />
                    <Devider />
                    <Devider />
                    <Devider />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
//
export default NotificationsScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_secondary
    },
    statusBar: {
        backgroundColor: COLORS.primary_color,
        height: StatusBar.currentHeight || 50,
    },
    header: {
        padding: "4%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.primary_color
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#ffffff"
    },
    notifLength: {
        fontSize: 14,
        fontWeight: "500",
        color: "#ffffff"
    },
    body: {
        rowGap: 15,
        padding: "4%",
    },
    todayTxt: {
        fontWeight: "500",
        color: COLORS.primary_color
    }
});
//