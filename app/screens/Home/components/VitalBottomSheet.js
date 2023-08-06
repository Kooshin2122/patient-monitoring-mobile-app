//
import React, { useEffect, useState } from 'react';
import { Devider } from '../../../components';
import { COLORS } from '../../../theme/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { VictoryPie } from "victory-native";
import { Button, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { fetchGetAuthData } from '../../../API';
import { categories } from '../../../data';
import CategoriesCard from './CategoriesCard';
//
const VitalBottomSheet = ({ data, selectCategory, accountType = null, hideBottomSheet = () => { } }) => {
    const [report, setReport] = useState([]);
    //
    const [cardColor, serCardColor] = useState("#2b42a5");
    //
    const getCardColor = (status) => {
        if (status == "High")
            serCardColor("#d00d0d")
        else if (status == "Normal")
            serCardColor("#feb407")
        else if (status == "Low")
            serCardColor("#2b42a5")
    };
    //
    const getReportAsycn = async () => {
        try {
            let response = ''
            const payload = selectCategory.toLowerCase();
            const res = await fetchGetAuthData("api/patients/userProfile/");
            if (res?.accountType == "PATIENT") {
                response = await fetchGetAuthData(`api/patients/report/patient/${payload}`);
            }
            else if (res?.accountType == "RESPONSIBLE") {
                response = await fetchGetAuthData(`api/patients/report/responsible/${payload}`);
            }
            // console.log(`response --------->`, response)
            if (data.vitalSignName === "Heart Beat")
                setReport(response?.Heart)
            else if (data?.vitalSignName == "Temprature")
                setReport(response?.BodyTemp)
            else if (data?.vitalSignName == "Room Temprature")
                setReport(response?.Roomtemp)
            else if (data?.vitalSignName == "Humidity")
                setReport(response?.Roomtemp)
            // console.log(`response 11---------> ${res}`);
        } catch (error) {

        }
    };
    //
    useEffect(() => {
        getCardColor(data.status)
        getReportAsycn();
    }, []);
    //
    return (
        <Modal
            transparent={true}
            animationType="slide"
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.30)" }}>
                <View style={styles.container}>
                    <Pressable
                        style={styles.bottomSheetTopLine}
                        onPress={() => hideBottomSheet(false)}
                    />
                    <Devider height={25} />
                    <View style={styles.headControlsCon}>
                        <Pressable onPress={() => hideBottomSheet(false)} style={styles.iconCon}>
                            <AntDesign name="left" size={20} color={COLORS.black800} />
                        </Pressable>
                        <Pressable onPress={() => hideBottomSheet(false)} style={styles.iconCon}>
                            <AntDesign name="close" size={20} color={COLORS.black800} />
                        </Pressable>
                    </View>
                    <Devider />
                    <Text style={styles.title}>
                        {data.vitalSignName}
                    </Text>
                    <Devider />
                    <FlatList
                        data={report}
                        // contentContainerStyle={{ backgroundColor: "blue" }}
                        renderItem={({ item }) => <ReportView {...item} />}
                        ListEmptyComponent={() => (
                            <View>
                                <Text>Not Happen Yet</Text>
                            </View>
                        )}
                    />
                    <Devider />
                    <Text style={styles.message}>
                        Your Blood Pressure is high please
                        prevent try to cure your condition is in danger.
                    </Text>
                </View>
            </View>
        </Modal>
    )
}
//
export default VitalBottomSheet;
//
const ReportView = ({ date, data, state }) => {
    const today = new Date(date);
    const vitsalData = parseInt(data, 10);
    //
    const [cardColor, serCardColor] = useState("#2b42a5");
    //
    const getCardColor = (status) => {
        // alert("hhh")
        if (status == "High")
            serCardColor("#d00d0d")
        else if (status == "Normal")
            serCardColor("#feb407")
        else if (status == "Low")
            serCardColor("#2b42a5")
    };
    useEffect(() => {
        getCardColor(state);
    }, [])
    // console.log("today---------------------->", typeof);
    return (
        <View style={styles.reportViewCon}>
            <View style={{ flex: 1 }}>
                <Text>{today.toLocaleString()}</Text>
            </View>
            <View>
                <Text style={{ color: cardColor, fontSize: 16, fontWeight: "bold" }}>
                    {vitsalData}
                </Text>
            </View>
            <View style={{ paddingVertical: "1.7%", paddingHorizontal: "4%", borderRadius: 5, backgroundColor: cardColor }}>
                <Text style={{ color: "#ffffff" }}>
                    {state}
                </Text>
            </View>
        </View>
    )
}
//
const styles = StyleSheet.create({
    container: {
        bottom: 0,
        height: 600,
        width: "100%",
        padding: "5%",
        position: "absolute",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_primary,
    },
    bottomSheetTopLine: {
        height: 5,
        width: 100,
        borderRadius: 50,
        alignSelf: "center",
        backgroundColor: COLORS.black800
    },
    headControlsCon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    iconCon: {
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: "2%",
        paddingHorizontal: "2.5%",
        borderColor: COLORS.black800,
    },
    title: {
        fontSize: 25,
        fontWeight: "500",
        letterSpacing: 0.7,
        textAlign: "center",
    },
    statusTxt: {
        fontSize: 27,
        fontWeight: "500",
        letterSpacing: 0.7,
        textAlign: "center",
        textTransform: "capitalize"
    },
    message: {
        fontSize: 15,
        fontWeight: "500",
        letterSpacing: 0.7,
        textAlign: "center",
        color: COLORS.black800
    },
    FlatListCategoriesCon: {
        columnGap: 20,
    },
    reportViewCon: {
        columnGap: 15,
        flexDirection: "row",
        alignItems: "center",
        padding: "3%",
        // borderTopWidth: 0.7,
        borderBottomWidth: 0.7,
    }
});
//