//
import React, { useState } from 'react';
import Lottie from 'lottie-react-native';
import { Alert, Modal, StyleSheet, View, Dimensions, StatusBar, Text } from 'react-native';
//
const { width, height } = Dimensions.get('screen');
//
const LoadingModal = () => {
    return (
        <Modal
            transparent={true}
        // accessibilityViewIsModal={false}
        >
            <View style={styles.centeredView}>
                <Lottie source={require('./loading.json')} autoPlay loop />
            </View>
        </Modal>
    );
};
//
const styles = StyleSheet.create({
    centeredView: {
        width: width,
        height: height,
        justifyContent: "flex-start",
        backgroundColor: "rgba(255, 255, 255, 0.82)",
        height: height - StatusBar.currentHeight * 4,
    },
});
//
export default LoadingModal;
//