//
import Root from './app/routes';
import { useEffect } from 'react';
import AppContext from './app/context';
import { PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { fetchPostData } from './app/API';
//
export default function App() {
  //
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  //
  useEffect(() => {
    if (requestUserPermission()) {
      messaging().getToken().then(token => {
        console.log("FCM Token----------", token);
        try {
          fetchPostData('buyer/user/updateFCM', token)
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
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    //
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log("remoteMessage--------", remoteMessage);
      //
      alert(`${remoteMessage.notification.title} \n ${remoteMessage.notification.body} `);
    });
    return unsubscribe;
    // end
  }, []);
  //
  return (
    <PaperProvider>
      <AppContext>
        <Root />
      </AppContext>
    </PaperProvider>
  );
}
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