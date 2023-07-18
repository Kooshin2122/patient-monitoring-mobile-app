//
import React from 'react';
import { Devider } from '../../../../components';
import { COLORS } from '../../../../theme/globalStyle';
import Octicons from 'react-native-vector-icons/Octicons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { removeData } from '../../../../utils/localStorage/AsyncStorage';
import { useNavigation } from '@react-navigation/core';
import { useAppContext } from '../../../../context';

const LogingModal = ({ hideModal = () => { } }) => {
    //
    const { navigate } = useNavigation();
    const { isUserLogin, setIsUserLogin } = useAppContext();
    //
    const onLogout = async () => {
        hideModal(false);
        setIsUserLogin(false);
        await removeData("token");
    }
    //
    return (
        <Modal
            transparent={true}
            animationType="fade"
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.30)" }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ padding: '5%', alignItems: 'center' }}>
                            <Octicons name="stop" size={52} color="red" />
                            <Devider height={7} />
                            {/* Content Container */}
                            <View style={styles.contentCon}>
                                <Text style={styles.title}>
                                    Log out
                                </Text>
                                <Text style={styles.subTitle}>
                                    Are you sure you want to log-out ? This action will clear your cart and wishlist !
                                </Text>
                            </View>
                        </View>
                        {/* Controls Container */}
                        <View style={styles.controlsCon}>
                            <Pressable onPress={() => hideModal(false)} style={[styles.button, styles.cancelBtn]}>
                                <Text style={styles.buttonTxt}>
                                    Cancel
                                </Text>
                            </Pressable>
                            <Pressable onPress={onLogout} style={styles.button}>
                                <Text style={[styles.buttonTxt, { color: '#f63f34' }]}>
                                    Logout
                                </Text>
                            </Pressable>
                        </View>
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
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        width: '87%',
        borderRadius: 7,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    contentCon: {
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: '400',
        marginBottom: '2%',
    },
    subTitle: {
        fontSize: 15,
        fontWeight: '300',
        textAlign: 'center'
    },
    controlsCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        width: '50%',
        padding: '3%',
        borderTopWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    cancelBtn: {
        borderRightWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    buttonTxt: {
        fontSize: 18,
        textAlign: 'center',
        color: '#137cf3'
    }
});
//
