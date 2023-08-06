//
import React from 'react';
import { COLORS } from '../../../theme/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
//
const ResponsibleCard = ({ id, name, accountType, tell, ResponsibleType, imageUri }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageCon}>
                <Image
                    resizeMode="contain"
                    source={{ uri: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png` }}
                    style={{ width: "100%", height: "100%", borderRadius: 50 }}
                />
            </View>
            <View style={styles.contentCon}>
                <Text style={styles.name}>
                    {name}
                </Text>
                <Text style={[styles.responsible, { textTransform: "capitalize" }]}>
                    {accountType}
                </Text>
                <Text style={styles.responsible}>
                    Mobile: {tell}
                </Text>
                <View style={styles.controlsCon}>
                    <View style={styles.statusCon}>
                        <Text style={styles.statusTxt}>
                            {ResponsibleType}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
                        {/* <Pressable>
                            <Feather name="edit" size={23} color={"green"} />
                        </Pressable> */}
                        <Pressable>
                            <AntDesign name="delete" size={23} color={"tomato"} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}
//
export default ResponsibleCard;
//
const styles = StyleSheet.create({
    container: {
        padding: "3%",
        columnGap: 15,
        borderRadius: 7,
        flexDirection: "row",
        backgroundColor: COLORS.bg_primary,
        shadowColor: COLORS.black800,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 3,
    },
    imageCon: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.primary_color
    },
    contentCon: {
        flex: 1,
    },
    name: {
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 0.4,
        color: COLORS.black900,
        textTransform: "capitalize"
    },
    responsible: {
        fontSize: 13,
        fontWeight: "400",
        letterSpacing: 0.4,
        color: COLORS.black800,
    },
    controlsCon: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    statusCon: {
        borderRadius: 50,
        alignSelf: "baseline",
        paddingVertical: "2%",
        paddingHorizontal: "4%",
        backgroundColor: COLORS.primary_color
    },
    statusTxt: {
        fontSize: 11,
        fontWeight: "700",
        color: COLORS.black600
    }
})
//