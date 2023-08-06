//
import React from 'react';
import { COLORS } from '../../../theme/globalStyle';
import { useNavigation } from '@react-navigation/core';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
//
const MainAuthScreen = () => {
    const { navigate } = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={() => navigate("SignInStack", { screen: "PatientForm" })} style={styles.btnCon}>
                <Text style={styles.btnTxt}>
                    Patient
                </Text>
            </Pressable>
            <Pressable onPress={() => navigate("SignInStack", { screen: "ResponsibleForm" })} style={[styles.btnCon, { backgroundColor: COLORS.bg_primary }]}>
                <Text style={[styles.btnTxt, { color: COLORS.black800 }]}>
                    Responsible
                </Text>
            </Pressable>
            {/* Description */}
            <Text style={styles.description}>

            </Text>
            {/* Description */}
        </SafeAreaView>
    )
}
//
export default MainAuthScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary_color
    },
    btnCon: {
        width: "80%",
        padding: "3%",
        borderRadius: 50,
        borderWidth: 0.9,
        borderColor: COLORS.bg_primary,
    },
    btnTxt: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        color: COLORS.bg_primary,
    },
    description: {
        width: "80%",
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        color: "#000",
        letterSpacing: 0.7
    }
});
//