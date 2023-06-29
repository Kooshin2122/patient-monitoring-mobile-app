//
import React from 'react';
import { COLORS } from '../../../../theme/globalStyle';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Devider } from '../../../../components';

const LogingModal = ({ logingToggle, hideModal = () => { } }) => {
    return (
        <Modal
            // visible={true}
            transparent={true}
            animationType="slide"
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.30)" }}>
                <View style={styles.container}>
                    <Pressable
                        style={styles.bottomSheetTopLine}
                        onPress={() => hideModal(false)}
                    />
                    <Devider height={25} />
                    <View style={styles.headControlsCon}>
                        <Pressable onPress={() => hideModal(false)} style={styles.iconCon}>
                            <Text>Stay</Text>
                        </Pressable>
                        <Pressable onPress={() => hideModal(false)} style={styles.iconCon}>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
//
export default LogingModal;
//
const styles = StyleSheet.create({
    container: {
        bottom: 0,
        height: 600,
        width: "100%",
        padding: "5%",
        position: "absolute",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_primary,
    },
    bottomSheetTopLine: {
        height: 5,
        width: 100,
        borderRadius: 50,
        alignSelf: "center",
        backgroundColor: COLORS.black800
    },
    headControlsCon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    iconCon: {
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: "2%",
        paddingHorizontal: "2.5%",
        borderColor: COLORS.black800,
    },
    title: {
        fontSize: 25,
        fontWeight: "500",
        letterSpacing: 0.7,
        textAlign: "center",
    },
    statusTxt: {
        fontSize: 27,
        fontWeight: "500",
        letterSpacing: 0.7,
        textAlign: "center",
        textTransform: "capitalize"
    },
    message: {
        fontSize: 15,
        fontWeight: "500",
        letterSpacing: 0.7,
        textAlign: "center",
        color: COLORS.black800
    }
});
//
