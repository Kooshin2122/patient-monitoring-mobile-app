//
import Root from './app/routes';
import { useCallback, useEffect, useState } from 'react';
import AppContext from './app/context';
import { AppRegistry, TouchableOpacity } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { fetchPostData, fetchPostAuthData } from './app/API';
import { useFocusEffect } from '@react-navigation/core';
import PushNotification from 'react-native-push-notification';
import Modal from 'react-native-modal';
import { Devider } from './app/components';
//

// Initialize the notification library
// PushNotification.configure({
//   // Called when a remote or local notification is opened or received
//   // onNotification: function (notification) {
//   //   console.log('Notification:', notification);
//   // },

//   // Android-only: GCM or FCM Sender ID
//   senderID: 'YOUR_GCM_OR_FCM_SENDER_ID',

//   // iOS-only: Permissions to request for notifications
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   // Should the initial notification be popped automatically
//   popInitialNotification: true,
// });

//
AppRegistry.registerComponent('Patient Monitering App', () => App);
//
export default function App() {
  //
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState({});
  //
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  }
  //
  useEffect(() => {
    if (requestUserPermission()) {
      messaging().getToken().then(token => {
        // console.log("FCM Token---------->>>", token);
        try {
          const payload = { deviceToken: token }
          fetchPostAuthData('api/patients/deviceToken/', payload)
            .then(res => console.log("FCM Token STATUS ------------>", res));
        } catch (error) {
          console.log("Error happen when updating FCM Token in App.js");
        }
      })
    }
    else {
      console.log("Failed Token Status", authStatus);
    }
    // Check whether an initial notification is available
    // alert("hello")
    // handleInitialNotification();
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        // console.log("remoteMessage---------->", remoteMessage);
        if (remoteMessage) {
          console.log(remoteMessage);
        }
      });
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      // console.log(
      //   'Notification caused app to open from background state:',
      //   remoteMessage.notification,
      // );
      // navigation.navigate(remoteMessage.data.type);
    });
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Message handled in the background!', remoteMessage);
    });
    //
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log("remoteMessage--------", remoteMessage);
      // const { title, body } = remoteMessage.notification;
      // Display the notification
      // PushNotification.localNotification({
      //   title: "Hello",
      //   message: "Hi Abdirahman Abdi See tahay sxb",
      // });
      const { notification } = remoteMessage;
      if (notification) {
        setNotification(notification);
        setVisible(true);
      }
      //
      // alert(`${remoteMessage.notification.title} \n ${remoteMessage.notification.body} `);
    });
    return unsubscribe;
    // end
  }, []);
  //
  const handleClose = () => {
    setVisible(false);
  };
  //
  return (
    <PaperProvider>
      <AppContext>
        <Root />
        <NotificationCard isVisible={visible} notification={notification} onClose={handleClose} />
      </AppContext>
    </PaperProvider>
  );
}
//
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//

const NotificationCard = ({ isVisible, notification, onClose }) => {
  return (
    <Modal style={{ alignSelf: "flex-start" }} isVisible={isVisible} animationIn="slideInDown" animationOut="slideOutUp">
      <View style={{ backgroundColor: 'white', padding: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{notification.title}</Text>
        <Text>{notification.body}</Text>
        <Devider />
        <TouchableOpacity onPress={onClose}>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "red", textAlign: "center" }} >
            Close
            </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};