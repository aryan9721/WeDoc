import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';

export async function requestUserPermission() {
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () =>{
    let fcmToken = await AsyncStorage.getItem('FcmToken');
    console.log(fcmToken, "Old Token");
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getDeviceToken();
            if (fcmToken) {
                console.log(fcmToken,"new generated token");
                await AsyncStorage.setItem('FcmToken',fcmToken);
            }
        } catch (error) {
            console.log('error in fcm token',error);
        }
    }
}