//
import { Formik } from 'formik';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import Octicons from 'react-native-vector-icons/Octicons';
import { COLORS, LAY_OUT } from '../../../theme/globalStyle';
import { CustomButton, Devider, MyDropDown, PaperTextInput, SubHeader } from '../../../components';
import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import MyDropdown from '../../../components/MyDropDown';
import { useAppContext } from '../../../context';
import { fetchPostData } from '../../../API';
//
const SignUpScreen = () => {
    const { navigate, goBack } = useNavigation();
    const { setIsUserLogin } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [eyeToggle, setEyeToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const ResponsibleInformation = { name: '', tell: '', backup_tell: '', email: '', age: '', sex: '', ResponsibleType: '', patientId: '' }
    //
    const onSignUp = async (values) => {
        // console.log("Values------------>", values);
        try {
            setLoading(true);
            const res = await fetchPostData(`api/responsibles/signUp/`, values, setErrorMessage);
            console.log("signUp------respnse----->", res);
            setLoading(false);
            console.log("res.success", res.success);
            if (res.ResponsibleType) {
                goBack()
            }
        } catch (error) {
            console.log(`Error happen in the Responsible Form ---> ${error} `);
            setLoading(false);
        }
    }
    //
    return (
        <SafeAreaView style={styles.mainContainer}>
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    {/* Head */}
                    <View style={styles.head}>
                        <SubHeader title="Responsible Sign-Up" />
                    </View>
                    <Devider height={20} />
                    <View style={styles.body}>
                        <Devider height={50} />
                        <Formik
                            onSubmit={onSignUp}
                            initialValues={ResponsibleInformation}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                return (
                                    <View style={styles.formCon}>
                                        <Text style={styles.loginTitle}>
                                            Responsible Sign-Up
                                        </Text>
                                        <Devider />
                                        <PaperTextInput
                                            label="Full Name"
                                            error={errorMessage}
                                            placeholder="Full Name"
                                            value={values.name}
                                            onChangeText={handleChange("name")}
                                        />
                                        <PaperTextInput
                                            label="Email"
                                            error={errorMessage}
                                            placeholder="Email"
                                            value={values.email}
                                            keyboardType="email-address"
                                            onChangeText={handleChange("email")}
                                        />
                                        <PaperTextInput
                                            label="Age"
                                            error={errorMessage}
                                            keyboardType="number-pad"
                                            placeholder="Age"
                                            value={values.age}
                                            onChangeText={handleChange("age")}
                                        />
                                        <PaperTextInput
                                            label="Sex"
                                            error={errorMessage}
                                            placeholder="Sex"
                                            value={values.sex}
                                            onChangeText={handleChange("sex")}
                                        />
                                        <PaperTextInput
                                            label="Mobile Number"
                                            error={errorMessage}
                                            keyboardType="number-pad"
                                            placeholder="Mobile Number"
                                            value={values.tell}
                                            onChangeText={handleChange("tell")}
                                        />
                                        <PaperTextInput
                                            label="backup_tell"
                                            error={errorMessage}
                                            keyboardType="number-pad"
                                            placeholder="backup_tell"
                                            value={values.backup_tell}
                                            onChangeText={handleChange("backup_tell")}
                                        />
                                        <PaperTextInput
                                            label="Responsible Type"
                                            error={errorMessage}
                                            placeholder="Responsible Type"
                                            value={values.ResponsibleType}
                                            onChangeText={handleChange("ResponsibleType")}
                                        />
                                        <PaperTextInput
                                            label="Patient Id"
                                            error={errorMessage}
                                            placeholder="patient id"
                                            value={values.patientId}
                                            onChangeText={handleChange("patientId")}
                                        />
                                        {/* <PaperTextInput
                                            label="Password"
                                            error={errorMessage}
                                            placeholder="Password"
                                            value={values.password}
                                            onChangeText={handleChange("password")}
                                            secureTextEntry={eyeToggle ? false : true}
                                            right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                        /> */}
                                        <Devider height={20} />
                                        {
                                            errorMessage &&
                                            <View style={styles.errorCon}>
                                                <Octicons name="stop" size={20} color="red" />
                                                <Text style={styles.errorText}>
                                                    {errorMessage}
                                                </Text>
                                            </View>
                                        }
                                        <CustomButton onClickHandler={handleSubmit} title="Save" />
                                        <Devider />
                                        <View style={{ flexDirection: "row", columnGap: 7 }}>
                                            <Text>
                                                Already have an account?
                                            </Text>
                                            <Pressable onPress={() => navigate("SignInStack", { screen: "ResponsibleForm" })}>
                                                <Text style={[styles.forgotPasswordTxt, { textAlign: "left" }]}>
                                                    Sign-In As Responsible
                                                </Text>
                                            </Pressable>
                                        </View>
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
export default SignUpScreen;
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
        columnGap: 30
    },
});
//