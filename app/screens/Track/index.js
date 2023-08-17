//
import React, { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { fetchGetAuthData } from '../../API';
import { COLORS } from '../../theme/globalStyle';
import { Header, Devider } from '../../components';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
//
const TrackingScreen = () => {
    //
    const [location, setLocation] = useState();
    const [patientInfo, setPatientInfo] = useState();
    const [patientLocation, setPatientLocation] = useState();
    //
    const getPermisionAsync = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            // console.log("Location----------", location);
            setLocation(location);
        } catch (error) {
            console.log("error happen when getting permision in the expo");
        }
    }
    //
    const getCurrentSensorData = async () => {
        try {
            const userData = await fetchGetAuthData("api/patients/userProfile/");
            if (userData?.accountType == "RESPONSIBLE") {
                const currentSensorData = await fetchGetAuthData(`api/patients/currentSensorData/responsible`)
                setPatientLocation({
                    latitude: Number(currentSensorData?.LATITUDE),
                    longitude: Number(currentSensorData?.LONGITUDE),
                });
            }
            // console.log(userData);
            setPatientInfo({ name: userData?.name, accountType: userData?.accountType });
        } catch (error) {
            console.log(`Error Happen in Tracker Screen ----> ${error}`);
        }
    };
    const GOOGLE_MAPS_APIKEY = "AIzaSyCsJ_JBbomxUgMeWecFqNcOEk2g60NfKow"
    //
    useFocusEffect(useCallback(() => {
        getPermisionAsync();
        getCurrentSensorData();
    }, []))
    //
    let bo = false
    // console.log("patientLocation ----------->", {
    //     latitude: patientLocation.latitude,
    //     longitude: patientLocation.longitude,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    // });
    // console.log("type----------->", typeof patientLocation.latitude);
    // console.log("location----------->", location);
    return (
        <View style={styles.container}>
            {/* <Header title="Track" /> */}
            {
                location &&
                <MapView
                    zoomEnabled
                    style={styles.map}
                    mapType="hybrid"

                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={{
                        latitude: location?.coords?.latitude,
                        longitude: location?.coords?.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        title="You"
                        pinColor={"blue"}
                        coordinate={{
                            latitude: location?.coords?.latitude,
                            longitude: location?.coords?.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                    {
                        patientInfo?.accountType == "RESPONSIBLE" && patientLocation &&
                        <Marker
                            title="Patient"
                            coordinate={{
                                latitude: patientLocation.latitude,
                                longitude: patientLocation.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }} />
                    }
                    {
                        patientInfo?.accountType == "RESPONSIBLE" && patientLocation &&
                        <MapViewDirections
                            origin={{ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }}
                            destination={patientLocation}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeColor="#fe2c55"
                            strokeWidth={3}
                        />
                    }
                </MapView>
            }
            <View style={styles.bottomSheet}>
                <Text style={styles.title}>
                    Somalia,Mogadishu,Banaadir
                </Text>
                <Devider height={10} />
                {/* <View style={styles.contentCon}>
                    <View style={{ rowGap: 5 }}>
                        <Text style={styles.conTitle}>
                            GLEN PARK
                        </Text>
                        <Text>
                            Jaale Siyaad Street
                        </Text>
                    </View>
                    <View style={styles.statusCon}>
                        <Text style={styles.statusTxt}>
                            Risk
                    </Text>
                    </View>
                </View> */}
                {/* <Devider />
                <View style={styles.contentCon}>
                    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
                        <View style={styles.iconCon}>
                            <MaterialIcons name="location-pin" size={23} color="red" />
                        </View>
                        <Text>
                            200m away
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
                        <View style={styles.iconCon}>
                            <MaterialIcons name="access-time" size={23} color="blue" />
                        </View>
                        <Text>
                            200 minit
                        </Text>
                    </View>
                </View> */}
                <Devider height={5} />
                <View style={styles.phoneCon}>
                    <MaterialIcons name="call" size={33} color="#ffffff" />
                </View>
            </View>
        </View>
    )
}
//
export default TrackingScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    map: {
        flex: 1,
    },
    bottomSheet: {
        flex: 0.2,
        // top: -20,
        padding: "4%",
        position: "relative",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: COLORS.bg_primary
    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: 0.8,
        textAlign: "center",
        color: COLORS.black900
    },
    statusCon: {
        borderRadius: 50,
        alignSelf: "center",
        paddingVertical: "2%",
        paddingHorizontal: "8%",
        backgroundColor: COLORS.primary_color
    },
    statusTxt: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1.4,
        textAlign: "center",
        color: COLORS.bg_primary
    },
    contentCon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    conTitle: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 0.8,
        color: COLORS.black900
    },
    iconCon: {
        width: 35,
        height: 35,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.light_green_color
    },
    phoneCon: {
        width: 75,
        height: 75,
        borderRadius: 50,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary_color
    }
});
//