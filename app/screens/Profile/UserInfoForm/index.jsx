//
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as ImagePickers from 'expo-image-picker';
import { LAY_OUT, COLORS } from '../../../theme/globalStyle';
import { CustomBtn, CustomButton, Devider, ImageViewer, ListHeader, PaperTextInput, SubHeader } from '../../../components';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { UpdateData } from '../../../API';
import { useNavigation } from '@react-navigation/core';
//
// import TextField from 'react-native-ui-lib/textField';
//
const { height } = Dimensions.get('window');
///
const UserInfoFormScreen = ({ route }) => {
    //
    const { goBack } = useNavigation();
    const userInfo = route?.params?.params;
    // console.log("userInfo........,,,,,......", userInfo);
    const { name, tell } = route?.params?.params;
    //
    const patientData = { name: name, tell: tell, };
    const [selectedImage, setSelectedImage] = useState(null);
    //
    const pickImageAsync = async () => {
        let result = await ImagePickers.launchImageLibraryAsync({
            mediaTypes: ImagePickers.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            console.log('------', result.assets[0].uri);
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };
    const pickImage = () => {
        pickImageAsync()
    }
    //
    const onSaveData = async (values) => {
        try {
            if (userInfo.accountType == "PATIENT") {
                const id = userInfo?.patientID
                const res = await UpdateData(`api/patients/${id}`, values);
                console.log("res------,,,,,,.......,,,,,-----", res);
                if (res.accountType == "PATIENT")
                    goBack()
            }
            else if (userInfo.accountType == "RESPONSIBLE") {
                const id = userInfo?.id
                const res = await UpdateData(`api/responsibles/${id}`, values);
                console.log("res------,,,,,,.......,,,,,-----", res);
                if (res.accountType == "RESPONSIBLE")
                    goBack()
            }
        } catch (error) {
            console.log(`error happen when updating user info ${error}`);
        }
    }
    //
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar backgroundColor={COLORS.primary_color} />
            <KeyboardAvoidingView
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    {/* Head */}
                    <View style={styles.head}>
                        <SubHeader title="Edit Profile" />
                    </View>
                    {/* Body */}
                    <View style={styles.body}>
                        <Devider />
                        {/* profile container */}
                        <View style={styles.profileCon}>
                            <ImageViewer
                                image={selectedImage}
                                style={styles.imageCon}
                            />
                            <CustomButton title="Edit Profile" onClickHandler={pickImage} />
                        </View>
                        <Devider height={35} />
                        {/* form container */}
                        <View style={styles.formCon}>
                            <ListHeader title="Personal Info" />
                            <Devider height={14} />
                            <Formik
                                onSubmit={onSaveData}
                                initialValues={patientData}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                                    return (
                                        <View style={styles.formContainer}>
                                            <PaperTextInput
                                                label="Full Name"
                                                value={values.name}
                                                placeholder="Full Name"
                                                onChangeText={handleChange("name")}
                                            />
                                            <PaperTextInput
                                                value={values.tell}
                                                label="Mobile Number"
                                                keyboardType="numeric"
                                                placeholder="Mobile Number"
                                                onChangeText={handleChange("tell")}
                                            />
                                            <Pressable onPress={handleSubmit} style={styles.nextBtnCon}>
                                                <Text style={styles.nextBtnTxt}>
                                                    Save
                                                </Text>
                                            </Pressable>
                                        </View>
                                    )
                                }}
                            </Formik>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
//
export default UserInfoFormScreen;
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
        zIndex: 1000,
        padding: '3%',
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_tertiary
    },
    profileCon: {
        rowGap: 20,
        alignItems: 'center'
    },
    imageCon: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 3,
        backgroundColor: COLORS.bg_primary,
    },
    formCon: {
        paddingHorizontal: '3%'
    },

    inputCon: {
        borderBottomWidth: 1,
        paddingBottom: '3%'
    },
    nextBtnCon: {
        borderRadius: 5,
        paddingVertical: '4%',
        backgroundColor: COLORS.primary_color
    },
    nextBtnTxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        letterSpacing: 0.8,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
})
//