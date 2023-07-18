//
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../theme/globalStyle';
import { CustomButton, Devider, ImageViewer } from '../../../../components';
//
const UserProfile = ({ name, mobile }) => {
    return (
        <View style={styles.profileCon}>
            <ImageViewer style={styles.imageViewCon} />
            <Devider height={8} />
            <Text style={styles.userNameText}>
                {name}
            </Text>
            <Text style={styles.userInfoTxt}>
                Mobile Number {mobile}
            </Text>
        </View>
    )
}
//
export default UserProfile;
//
const styles = StyleSheet.create({
    profileCon: {
        rowGap: 5,
        alignItems: 'center',
    },
    userNameText: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.7,
        color: COLORS.black600,
        textTransform: "capitalize"
    },
    userInfoTxt: {
        fontSize: 14,
        fontWeight: '400',
        color: COLORS.bg_secondary
    }
})
//