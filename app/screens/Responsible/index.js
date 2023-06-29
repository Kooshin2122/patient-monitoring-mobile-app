//
import React, { useState } from 'react';
import { responsibles } from '../../data';
import Header from '../../components/Header';
import { COLORS } from '../../theme/globalStyle';
import { AddResponsibleForm, ResponsibleCard } from './components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
//
const ResponsibleScreen = () => {
    const [addResponsibleForm, setAddResponsibleForm] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Responsibles"} />
            <FlatList
                data={responsibles}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListCon}
                renderItem={({ item }) => <ResponsibleCard {...item} />}
                ListHeaderComponent={() => <ListHeaderComponents showBottomForm={setAddResponsibleForm} />}
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
            <Pressable onPress={() => showBottomForm(true)}>
                <MaterialIcons name="add-circle" size={30} color={COLORS.primary_color} />
            </Pressable>
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