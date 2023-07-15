//
import { Formik } from 'formik';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import Octicons from 'react-native-vector-icons/Octicons';
import { CustomButton, PaperTextInput, Devider, SubHeader, } from '../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { COLORS, LAY_OUT } from '../../../theme/globalStyle';
//
const ChangePasswordScreen = () => {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [eyeToggle, setEyeToggle] = useState(false);
    const passwordValue = { old_password: '', new_password: '', confirmNewPassword: '' }
    //
    const onSavePassword = async (values) => {

    }
    //
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar backgroundColor={COLORS.primary_color} />
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    {/* Head */}
                    <View style={styles.head}>
                        <SubHeader title="Change Password" />
                    </View>
                    <Devider height={25} />
                    <View style={styles.body}>
                        <Formik
                            onSubmit={onSavePassword}
                            initialValues={passwordValue}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View style={styles.formCon}>
                                        <Text style={styles.loginTitle}>
                                            Set Password
                                </Text>
                                        <Devider />
                                        <PaperTextInput
                                            label="old password"
                                            error={errorMessage}
                                            placeholder="old password"
                                            value={values.old_password}
                                            onChangeText={handleChange("old_password")}
                                            secureTextEntry={eyeToggle ? false : true}
                                            right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                        />
                                        <PaperTextInput
                                            label="New Password"
                                            error={errorMessage}
                                            placeholder="New Password"
                                            value={values.new_password}
                                            onChangeText={handleChange("new_password")}
                                            secureTextEntry={eyeToggle ? false : true}
                                            right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                        />
                                        <PaperTextInput
                                            error={errorMessage}
                                            label="Confirm Password"
                                            placeholder="Confirm Password"
                                            value={values.confirmNewPassword}
                                            onChangeText={handleChange("confirmNewPassword")}
                                            secureTextEntry={eyeToggle ? false : true}
                                            right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                        />
                                        {
                                            errorMessage &&
                                            <View style={styles.errorCon}>
                                                <Octicons name="stop" size={20} color="red" />
                                                <Text style={styles.errorText}>
                                                    {errorMessage}
                                                </Text>
                                            </View>
                                        }
                                        <CustomButton clickHandler={handleSubmit} title="Save" />
                                    </View>
                                )
                            }}
                        </Formik>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
//
export default ChangePasswordScreen;
//
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: COLORS.bg_primary,
    //     // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    // },
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary_color,
    },
    head: {
        zIndex: 0,
        width: '100%',
        paddingBottom: '5%',
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.primary_color
    },
    body: {
        flex: 1,
        zIndex: 1000,
        padding: '3%',
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_tertiary
    },
    scrollCon: {
        padding: '4%',
    },
    formCon: {
        minHeight: 200,
        padding: '4%',
        paddingBottom: '6%',
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: COLORS.light_green_color,
    },
    loginTitle: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.8,
        color: COLORS.black800
    },
    errorCon: {
        columnGap: 5,
        marginLeft: '1%',
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.5,
        marginLeft: '1%',
        color: "red"
    },
    forgotPasswordTxt: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.5,
        marginLeft: '1%',
        marginBottom: '7%',
        color: COLORS.black800
    },
    signUpCon: {
        columnGap: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpTxt1: {
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.3,
        color: COLORS.black800
    },
    signUpTxt2: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
        color: COLORS.primary_color
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: COLORS.black800
    },
    mediaCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 30
    },
})
//