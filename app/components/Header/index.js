//
import React from 'react';
import { Avatar } from 'react-native-paper';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, LAY_OUT } from '../../theme/globalStyle';
import logo from '../../../assets/images/blood-pressure.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//
const Header = ({ title = null }) => {
    return (
        <View style={styles.container}>
            {
                title ?
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    :
                    <Image
                        source={logo}
                        resizeMode="cover"
                        style={{ width: 30, height: 30 }}
                    />
            }
            <Avatar.Icon
                size={40}
                style={{ backgroundColor: COLORS.bg_tertiary, }}
                icon={() => <FontAwesome5 name="user" size={23} />}
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
        padding: LAY_OUT.padding,
        borderColor: COLORS.gray_color,
        justifyContent: "space-between",
        backgroundColor: COLORS.bg_primary
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.8,
        color: COLORS.black900
    }
});
//