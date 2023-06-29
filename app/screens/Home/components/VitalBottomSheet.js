//
import React, { useEffect, useState } from 'react';
import { Devider } from '../../../components';
import { COLORS } from '../../../theme/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { VictoryPie } from "victory-native";
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
//
const VitalBottomSheet = ({ data, hideBottomSheet = () => { } }) => {
    const [cardColor, serCardColor] = useState("#2b42a5");
    const getCardColor = (status) => {
        if (status == "high")
            serCardColor("#d00d0d")
        else if (status == "medium")
            serCardColor("#feb407")
        else if (status == "good")
            serCardColor("#2b42a5")
    };
    const graphicData = [
        { y: 70, x: '70%' },
        { y: 30, x: '30%' },
    ]
    //
    useEffect(() => {
        getCardColor(data.status)
    }, [])
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
                    <Text style={[styles.statusTxt, { color: cardColor }]}>
                        {data.status}
                    </Text>
                    <VictoryPie
                        width={360}
                        height={250}
                        innerRadius={60}
                        data={graphicData}
                        colorScale={["red", "tomato"]}
                        labels={() => ""}
                        style={{
                            alignSelf: "center",
                        }}
                    />
                    <Text style={{
                        top: -135,
                        left: "42%",
                        fontSize: 20,
                        color: cardColor,
                        fontWeight: "bold",
                        position: "relative",
                    }}> 70%</Text>
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
    }
});
//