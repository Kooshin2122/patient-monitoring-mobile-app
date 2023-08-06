//
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../theme/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
//
const VitalSignsCard = ({ id, vitalSignName, category, measure, status, imageUrl, displatBottomSheet = () => { }, getVitalSignsData = () => { } }) => {
    //
    const [cardColor, serCardColor] = useState("#2b42a5");
    const getCardColor = (status) => {
        if (status == "High")
            serCardColor("#d00d0d")
        else if (status == "Normal")
            serCardColor("#feb407")
        else if (status == "Low")
            serCardColor("#2b42a5")
    }
    const showBottomSheet = () => {
        displatBottomSheet(true);
        getVitalSignsData({ id, vitalSignName, category, measure, status });
    }
    //
    useEffect(() => {
        getCardColor(status)
    }, [status])
    const data = parseInt(measure, 10)
    //
    return (
        <Pressable onPress={showBottomSheet} style={styles.container}>
            {/* image container */}
            <View style={styles.imageCon}>
                <Image
                    source={imageUrl}
                    resizeMode="contain"
                    style={{ width: 30, height: 30 }}
                />
            </View>
            {/* content container */}
            <View style={styles.contentCon}>
                {/* title container */}
                <View style={styles.rowCon}>
                    <View>
                        <Text style={styles.titleTxt}>
                            {vitalSignName}
                        </Text>
                        <Text style={styles.categoryTxt}>
                            {category} Report
                        </Text>
                    </View>
                    <AntDesign name="right" size={20} color={COLORS.black700} />
                </View>
                {/* status and measurement container */}
                <View style={styles.rowCon}>
                    <Text style={[styles.measureTxt, { color: cardColor }]}>
                        {data}
                    </Text>
                    <View style={[styles.statusCard, { backgroundColor: cardColor }]}>
                        <Text style={styles.statusTxt}>
                            {status}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
//
export default VitalSignsCard;
//
const styles = StyleSheet.create({
    container: {
        padding: "4%",
        borderRadius: 4,
        columnGap: 25,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: COLORS.black800,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 3,
        marginBottom: 10,
        backgroundColor: COLORS.bg_primary
    },
    imageCon: {
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e3ebff",
    },
    contentCon: {
        flex: 1,
        rowGap: 10,
    },
    rowCon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    titleTxt: {
        fontSize: 17,
        fontWeight: "600",
        letterSpacing: 0.9,
        color: COLORS.black900
    },
    measureTxt: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.8,
        color: COLORS.black900
    },
    statusCard: {
        borderRadius: 5,
        paddingVertical: "2%",
        paddingHorizontal: "4%",
        backgroundColor: "#e3ebff"
    },
    statusTxt: {
        fontSize: 11,
        fontWeight: "bold",
        letterSpacing: 0.8,
        color: COLORS.bg_primary,
        textTransform: "capitalize",
    }
})
//