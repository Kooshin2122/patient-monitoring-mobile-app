//
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../theme/globalStyle';
//
const NotificationsCard = ({ title, body }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconCon}>
                <Text style={{ fontWeight: "600" }}>
                    {title[0]}
                </Text>
            </View>
            <Text style={styles.title}>
                {title}, {''}
                <Text style={styles.message}>
                    {body}
                </Text>
            </Text>
        </View>
    )
}
//
export default NotificationsCard;
//
const styles = StyleSheet.create({
    container: {
        paddingVertical: "6%",
        paddingHorizontal: "4%",
        columnGap: 10,
        borderRadius: 7,
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        shadowColor: COLORS.black700,
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 2
    },
    iconCon: {
        width: 45,
        height: 45,
        borderRadius: 90,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.light_green_color
    },
    title: {
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: "600",
        letterSpacing: 0.7,
        color: COLORS.primary_color
    },
    message: {
        fontSize: 12,
        color: "#687684",
        fontWeight: "500",
        letterSpacing: 0.7,
    }
});
//