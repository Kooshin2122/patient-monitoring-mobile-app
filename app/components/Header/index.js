//
import React from 'react';
import { Avatar } from 'react-native-paper';
import { COLORS, LAY_OUT } from '../../theme/globalStyle';
import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//
const Header = ({ title = null }) => {
    return (
        <View style={styles.container}>
            <Avatar.Icon
                size={40}
                style={{ backgroundColor: COLORS.bg_tertiary, }}
                icon={() => <FontAwesome5 name="user" size={20} />}
            />
            <Text style={styles.title}>
                {title}
            </Text>
            <Avatar.Icon
                size={40}
                style={{ backgroundColor: COLORS.bg_tertiary, }}
                icon={() => <FontAwesome name="bell-o" size={20} />}
            />

        </View>
    )
}
//
export default Header;
//
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.3,
        borderColor: COLORS.gray_color,
        justifyContent: "space-between",
        paddingVertical: "2%",
        paddingHorizontal: LAY_OUT.padding,
        backgroundColor: COLORS.bg_primary,
    },
    title: {
        fontSize: 14,
        fontWeight: "600",
        letterSpacing: 0.6,
        color: COLORS.black800,
        textTransform: "uppercase",
    }
});
//