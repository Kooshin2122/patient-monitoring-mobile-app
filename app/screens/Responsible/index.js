//
import React, { useCallback, useEffect, useState } from 'react';
import { responsibles } from '../../data';
import Header from '../../components/Header';
import { COLORS } from '../../theme/globalStyle';
import { AddResponsibleForm, ResponsibleCard } from './components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { fetchGetAuthData } from '../../API';
import { LoadingModal } from '../../components';
import { useFocusEffect } from '@react-navigation/core';
//
const ResponsibleScreen = () => {
    const [loading, setLoading] = useState();
    const [refresh, setRefresh] = useState(true);
    const [responsibleInfo, setResponsibleInfo] = useState([]);
    const [addResponsibleForm, setAddResponsibleForm] = useState(false);
    //
    const getUserInfoAsync = async () => {
        // setLoading(true);
        setRefresh(false);
        const res = await fetchGetAuthData("api/patients/userProfile/");
        console.log("response--------", res);
        setResponsibleInfo(res?.Responsibles);
        // setLoading(false);
    }
    //
    useFocusEffect(useCallback(() => {
        getUserInfoAsync();
    }, []))
    //
    return (
        <SafeAreaView style={styles.container}>
            {loading && <LoadingModal />}
            <Header title={"Responsibles"} />
            <FlatList
                data={responsibleInfo}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListCon}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={getUserInfoAsync} />}
                renderItem={({ item }) => <ResponsibleCard {...item} reload={getUserInfoAsync} />}
                ListHeaderComponent={() => <ListHeaderComponents showBottomForm={setAddResponsibleForm} />}
                ListEmptyComponent={() => <ListEmptyComponents />}
            />
            {addResponsibleForm && <AddResponsibleForm hideBottomSheet={setAddResponsibleForm} />}
        </SafeAreaView>
    )
}
//
const ListHeaderComponents = ({ showBottomForm = () => { } }) => {
    return (
        <View style={styles.listHeadCom}>
            <Text style={styles.title}>
                Add Responsible
            </Text>
            {/* <Pressable onPress={() => showBottomForm(true)}>
                <MaterialIcons name="add-circle" size={30} color={COLORS.primary_color} />
            </Pressable> */}
        </View>
    )
}
//
const ListEmptyComponents = ({ showBottomForm = () => { } }) => {
    return (
        <View style={{ alignItems: "center", justifyContent: "center", height: 200, borderWidth: 0.8, borderRadius: 7, borderColor: COLORS.gray_color }}>
            <Text style={styles.title}>
                Sorry There is no responsibles for this user.
            </Text>
        </View>
    )
}
//
export default ResponsibleScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    flatListCon: {
        padding: "4%",
        rowGap: 20
    },
    listHeadCom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.7,
        color: COLORS.black900
    },
})
//