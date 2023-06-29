//
import React, { useEffect, useState } from 'react';
import { CustomButton, Devider, PaperTextInput } from '../../../components';
import { COLORS } from '../../../theme/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAvoidingView, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
//
const AddResponsibleForm = ({ data, hideBottomSheet = () => { } }) => {
    //
    const formData = { name: '', tell: '', email: '' };
    //
    const onSaveData = (values) => {
        console.log(values);
    }
    //
    return (
        <Modal
            transparent={true}
            animationType="slide"
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.30)" }}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={15}
                    behavior={Platform.OS == 'ios' ? 'padding' : null}
                    style={{ flex: 1 }}
                    enabled
                >
                    <ScrollView style={styles.container}>
                        <Pressable
                            style={styles.bottomSheetTopLine}
                            onPress={() => hideBottomSheet(false)}
                        />
                        <Devider height={25} />
                        <View style={styles.headControlsCon}>
                            <Pressable onPress={() => hideBottomSheet(false)} style={styles.iconCon}>
                                <AntDesign name="left" size={20} color={COLORS.black800} />
                            </Pressable>
                            <Pressable onPress={() => hideBottomSheet(false)} style={styles.iconCon}>
                                <AntDesign name="close" size={20} color={COLORS.black800} />
                            </Pressable>
                        </View>
                        <Devider />
                        <Text style={styles.title}>
                            Add Responsible
                        </Text>
                        <Devider />
                        <Formik
                            onSubmit={onSaveData}
                            initialValues={formData}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View style={styles.formContainer}>
                                        <PaperTextInput
                                            label="Full Name"
                                            // error={resError}
                                            value={values.name}
                                            placeholder="Full Name"
                                            onChangeText={handleChange("name")}
                                        />
                                        <PaperTextInput
                                            label="Mobile Number"
                                            // error={resError}
                                            placeholder="Mobile Number"
                                            value={values.tell}
                                            keyboardType="numeric"
                                            onChangeText={handleChange("tell")}
                                        />
                                        <PaperTextInput
                                            label="Email"
                                            // error={resError}
                                            placeholder="Email"
                                            value={values.email}
                                            keyboardType="email-address"
                                            onChangeText={handleChange("email")}
                                        />
                                        <CustomButton
                                            title="Save"
                                            onClickHandler={handleSubmit}
                                        />
                                    </View>
                                )
                            }}
                        </Formik>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    )
}
//
export default AddResponsibleForm;
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
        fontSize: 18,
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