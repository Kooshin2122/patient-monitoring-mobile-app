//
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../theme/globalStyle';
//
const CategoriesCard = ({ id, categoryName, selectedCard, setSelectedCard = () => { } }) => {
    //
    const onSelectCard = () => {
        setSelectedCard(categoryName)
    }
    const isActive = useMemo(() => {
        return selectedCard == categoryName;
    }, [selectedCard]);
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
        color: COLORS.primary_color,
    }
})
//