//
import React from 'react';
import { COLORS } from '../../theme/globalStyle';
import { StyleSheet, Text, View } from 'react-native';
//
const ListHeader = ({ title = "Title", textButton = null, children, containerStyle, childredConStyle = {}, onClickTextButton = () => { } }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.title}>
                {title}
            </Text>
            {textButton && <Text onPress={onClickTextButton} style={styles.textButton}>{textButton}</Text>}
        </View>
    )
}
//
export default ListHeader;
//
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: COLORS.bg_primary
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: COLORS.black900,
    },
    textButton: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: COLORS.primary_color
    },
})
//