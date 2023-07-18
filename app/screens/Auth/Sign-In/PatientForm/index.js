//
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import Octicons from 'react-native-vector-icons/Octicons';
import { COLORS, LAY_OUT } from '../../../../theme/globalStyle';
import { CustomButton, Devider, LoadingModal, PaperTextInput, SubHeader } from '../../../../components';
import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchPostData } from '../../../../API';
import { storeData } from '../../../../utils/localStorage/AsyncStorage';
import { useAppContext } from '../../../../context';
//
const PatientForm = () => {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);
    const [eyeToggle, setEyeToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { isUserLogin, setIsUserLogin } = useAppContext();
    const PatientInformation = { patientID: '', password: '' }
    //
    const onLogin = async (values) => {
        try {
            setLoading(true);
            const res = await fetchPostData("api/auth/patient/sign-in/", values, setErrorMessage);
            console.log("respnse----->", res);
            setLoading(false);
            if (res.accessToken) {
                console.log("get---------=======---------");
                setIsUserLogin(true);
                await storeData("token", res.accessToken);
            }
        } catch (error) {
            console.log(`Error happen in the Patient Form ---> ${error} `);
            setLoading(false);
        }
    }
    // console.log("errorMessage", errorMessage);
    //
    return (
        <SafeAreaView style={styles.mainContainer}>
            {loading && <LoadingModal />}
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    {/* Head */}
                    <View style={styles.head}>
                        <SubHeader title="Patient Sign-In" />
                    </View>
                    <Devider height={20} />
                    <View style={styles.body}>
                        <Devider height={50} />
                        <Formik
                            onSubmit={onLogin}
                            initialValues={PatientInformation}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View style={styles.formCon}>
                                        <Text style={styles.loginTitle}>
                                            Patient Login
                                        </Text>
                                        <Devider />
                                        <PaperTextInput
                                            label="patient ID"
                                            error={errorMessage}
                                            placeholder="patient ID"
                                            value={values.patientID}
                                            onChangeText={handleChange("patientID")}
                                        />
                                        <PaperTextInput
                                            label="Password"
                                            error={errorMessage}
                                            placeholder="Password"
                                            value={values.password}
                                            onChangeText={handleChange("password")}
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
                                        {/* <Pressable onPress={() => navigate("ForgotPasswordForm")}>
                                            <Text style={styles.forgotPasswordTxt}>
                                                Forgot Password
                                            </Text>
                                        </Pressable> */}
                                        <CustomButton onClickHandler={handleSubmit} title="Save" />
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
export default PatientForm;
//
const styles = StyleSheet.create({
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
        zIndex: 500,
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
        borderRadius: 10,
        borderWidth: 0.8,
        paddingBottom: '6%',
        borderColor: COLORS.light_green_color,
    },
    loginTitle: {
        fontSize: 20,
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
        fontSize: 15,
        fontWeight: '500',
        marginBottom: '5%',
        letterSpacing: 0.4,
        textAlign: "right",
        color: COLORS.primary_color
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
        columnGap: 30,
    }
})
//