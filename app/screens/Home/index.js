//
import React, { useState } from 'react';
import { Devider, Header, ListHeader, VitalSignsCard } from '../../components';
import { VitalBottomSheet } from './components';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, LAY_OUT } from '../../theme/globalStyle';
import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { categories, vitalSignsData } from '../../data';
import CategoriesCard from './components/CategoriesCard';
//
const HomeScreen = () => {
    const [selectCategory, setSelectCategory] = useState("Daily");
    const [bottomSheetToggle, setBottomSheetToggle] = useState(false);
    const [bottomSheetData, setBottomSheetData] = useState({});
    //
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Dashboard" />
            <StatusBar backgroundColor={COLORS.bg_primary} />
            {bottomSheetToggle && <VitalBottomSheet data={bottomSheetData} hideBottomSheet={setBottomSheetToggle} />}
            <ScrollView style={styles.scrollCon} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSec}>
                    <Text style={styles.welcomeTxt}>
                        Welcome
                    </Text>
                    <Text style={styles.userNameTxt}>
                        Mohamed Hashi Ali
                    </Text>
                </View>
                <Devider height={17} />
                <ListHeader title="Categories" />
                <Devider />
                <FlatList
                    horizontal
                    data={categories}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <CategoriesCard {...item} selectedCard={selectCategory} setSelectedCard={setSelectCategory} />}
                    contentContainerStyle={styles.FlatListCategoriesCon}
                />
                <Devider height={25} />
                <FlatList
                    data={vitalSignsData}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.FlatListVitalCardCon}
                    renderItem={({ item }) => <VitalSignsCard {...item} displatBottomSheet={setBottomSheetToggle} getVitalSignsData={setBottomSheetData} />}
                    ListHeaderComponent={() => <ListHeader title="All Vital Signs" textButton={selectCategory} />}
                />
                <Devider />
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default HomeScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
        padding: LAY_OUT.padding,
    },
    heroSec: {
        padding: "4%",
        borderRadius: 7,
        backgroundColor: COLORS.light_green_color,
    },
    welcomeTxt: {
        fontSize: 25,
        marginBottom: 5,
        letterSpacing: 1,
        fontWeight: "500",
        color: COLORS.black800
    },
    userNameTxt: {
        fontSize: 25,
        letterSpacing: 1,
        fontWeight: "500",
        color: COLORS.black900
    },
    FlatListCategoriesCon: {
        columnGap: 20,
    },
    FlatListVitalCardCon: {
        rowGap: 20,
        marginBottom: 10
    },
})
//