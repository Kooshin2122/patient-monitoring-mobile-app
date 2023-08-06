//
import React, { useEffect, useState } from 'react';
import { Devider, Header, ListHeader, LoadingModal, VitalSignsCard } from '../../components';
import { VitalBottomSheet } from './components';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, LAY_OUT } from '../../theme/globalStyle';
import { FlatList, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { categories, vitalSignsData } from '../../data';
import CategoriesCard from './components/CategoriesCard';
import { fetchGetAuthData } from '../../API';
import heart from '../../../assets/images/VitalSigns/blood.png';
import temp from '../../../assets/images/VitalSigns/temperature.png';
import room from '../../../assets/images/VitalSigns/room-temperature.png';
import humidity from '../../../assets/images/VitalSigns/humidity.png';
import oxygen from '../../../assets/images/VitalSigns/oxygen.png';
//oxygen
const HomeScreen = () => {
    const [userInfo, setUserInfo] = useState();
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]);
    const [bottomSheetData, setBottomSheetData] = useState({});
    const [selectCategory, setSelectCategory] = useState("Daily");
    const [bottomSheetToggle, setBottomSheetToggle] = useState(false);
    //
    const getUserInfoAsync = async () => {
        try {
            setRefresh(false);
            setLoading(true);
            const res = await fetchGetAuthData("api/patients/userProfile/");
            setLoading(false);
            // console.log("user profile--------", res);
            setUserInfo(res);
        } catch (error) {
            setLoading(false);
            console.log(`Error Happen When Fetching Home Screen Data --------> ${error}`);
        }
    }
    //
    useEffect(() => {
        getUserInfoAsync();
        setLoading(false);
    }, []);
    //
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Dashboard" />
            {loading && <LoadingModal />}
            <StatusBar backgroundColor={COLORS.bg_primary} />
            {bottomSheetToggle && <VitalBottomSheet selectCategory={selectCategory} data={bottomSheetData} hideBottomSheet={setBottomSheetToggle} accountType={userInfo?.accountType} />}
            <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={getUserInfoAsync} />} style={styles.scrollCon} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSec}>
                    <View>
                        <Text style={styles.welcomeTxt}>
                            Welcome
                        </Text>
                        <Text style={styles.userNameTxt}>
                            {userInfo?.name}
                        </Text>
                    </View>
                    <Text style={styles.accountType}>
                        {userInfo?.accountType}
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
                    renderItem={({ item }) => <CategoriesCard {...item} selectedCard={selectCategory} setSelectedCard={setSelectCategory} changeCategoriesData={setCategoriesData} />}
                    contentContainerStyle={styles.FlatListCategoriesCon}
                />
                <Devider height={25} />
                <VitalSignsCard
                    imageUrl={heart}
                    category={selectCategory}
                    vitalSignName="Heart Beat"
                    measure={categoriesData?.heart?.data}
                    status={categoriesData?.heart?.state}
                    displatBottomSheet={setBottomSheetToggle} getVitalSignsData={setBottomSheetData}
                />
                <Devider />
                <VitalSignsCard
                    imageUrl={temp}
                    category={selectCategory}
                    vitalSignName="Temprature"
                    measure={categoriesData?.BodyTemp?.data + " mbs"}
                    status={categoriesData?.BodyTemp?.state}
                    displatBottomSheet={setBottomSheetToggle} getVitalSignsData={setBottomSheetData}
                />
                <Devider />
                <VitalSignsCard
                    imageUrl={room}
                    category={selectCategory}
                    vitalSignName="Room Temprature"
                    measure={categoriesData?.RoomTemp?.data}
                    status={categoriesData?.RoomTemp?.state}
                    displatBottomSheet={setBottomSheetToggle} getVitalSignsData={setBottomSheetData}
                />
                <Devider />
                <VitalSignsCard
                    imageUrl={humidity}
                    category={selectCategory}
                    vitalSignName="Humidity"
                    measure={categoriesData?.HumidityRoom?.data}
                    status={categoriesData?.HumidityRoom?.state}
                    displatBottomSheet={setBottomSheetToggle} getVitalSignsData={setBottomSheetData}
                />
                <Devider />
                <VitalSignsCard
                    imageUrl={oxygen}
                    category={selectCategory}
                    vitalSignName="Oxygen"
                    measure={categoriesData?.oxygen?.data}
                    status={categoriesData?.oxygen?.state}
                    displatBottomSheet={setBottomSheetToggle} getVitalSignsData={setBottomSheetData}
                />
                <Devider />
                <Devider height={25} />
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
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.light_green_color,
    },
    welcomeTxt: {
        fontSize: 16,
        marginBottom: 5,
        letterSpacing: 1,
        fontWeight: "500",
        color: COLORS.black800
    },
    userNameTxt: {
        fontSize: 20,
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