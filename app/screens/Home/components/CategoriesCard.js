//
import React, { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { fetchGetAuthData } from '../../../API';
import { COLORS } from '../../../theme/globalStyle';
//
const CategoriesCard = ({ id, categoryName, selectedCard, setSelectedCard = () => { }, changeCategoriesData = () => { } }) => {
    //
    //
    const getCategoriesDataAsync = async (categoryName) => {
        try {
            const res = await fetchGetAuthData("api/patients/userProfile/");
            // console.log("user profile in Cat --------", res?.accountType);
            if (categoryName == "Daily") {
                if (res?.accountType == "PATIENT") {
                    const currentSensorData = await fetchGetAuthData(`api/patients/currentSensorData/patient`)
                    // console.log("Daily------", currentSensorData);
                    changeCategoriesData(currentSensorData);
                }
                else if (res?.accountType == "RESPONSIBLE") {
                    const currentSensorData = await fetchGetAuthData(`api/patients/currentSensorData/responsible`)
                    // console.log("Daily------", currentSensorData);
                    changeCategoriesData(currentSensorData);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    //
    const onSelectCard = () => {
        setSelectedCard(categoryName)
        getCategoriesDataAsync(categoryName);
    }
    //
    const isActive = useMemo(() => {
        return selectedCard == categoryName;
    }, [selectedCard]);
    //
    useEffect(() => {
        getCategoriesDataAsync(categoryName);
    }, [])
    //
    return (
        <Pressable onPress={onSelectCard} style={[styles.container, { backgroundColor: isActive ? COLORS.primary_color : COLORS.bg_primary }]}>
            <Text style={[styles.categoryNameTxt, { color: isActive ? COLORS.bg_primary : COLORS.primary_color }]}>
                {categoryName}
            </Text>
        </Pressable>
    )
}
//
export default CategoriesCard;
//
const styles = StyleSheet.create({
    container: {
        borderWidth: 0.8,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 17,
        borderColor: COLORS.primary_color,
    },
    categoryNameTxt: {
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 0.9,
        textTransform: "capitalize",
        color: COLORS.primary_color,
    }
})
//