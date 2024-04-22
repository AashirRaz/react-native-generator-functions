import Utils from "@Utility/Utils";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { Alert, Linking } from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";

async function requestUserPermission() {
  const authStatus = Utils.isPlatformIOS
    ? await messaging().requestPermission()
    : await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

  switch (authStatus) {
    case messaging.AuthorizationStatus.AUTHORIZED:
    case messaging.AuthorizationStatus.PROVISIONAL:
    case "granted":
      return true;
    case messaging.AuthorizationStatus.DENIED:
    case messaging.AuthorizationStatus.BLOCKED:
    case "denied":
    default:
      Alert.alert(
        "Notification Permission Required",
        "Please enable notification permissions in your device settings to receive notifications.",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Open Settings",
            onPress: () => {
              Utils.isPlatformIOS
                ? Linking.openURL("app-settings:")
                : Linking.sendIntent(
                    "android.settings.LOCATION_SOURCE_SETTINGS"
                  );
            },
          },
        ]
      );

      return false;
  }
}

async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (err) {
    console.warn("Error in getting FCM token", err);
    throw err;
  }
}

async function deleteToken() {
  try {
    await messaging().deleteToken();
    return true;
  } catch (err) {
    console.error("Error in deleting FCM token", err);
    throw err;
  }
}

function createNotificationListeners() {
  messaging().onMessage(displayNotification);
  messaging().setBackgroundMessageHandler(displayNotification);
  messaging().onNotificationOpenedApp(handleNavigation);
  messaging().getInitialNotification().then(handleNavigation);

  notifee.onForegroundEvent(handleNotifeeEvent);
  notifee.onBackgroundEvent(handleNotifeeEvent);
}

async function displayNotification(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) {
  if (!remoteMessage) return;

  const { data, notification } = remoteMessage as any;
  console.log("remoteMessage ------------------->", JSON.stringify(data));

  const channelId = await notifee.createChannel({
    id: "genericName_notification_channel_id",
    name: "foreground_notification",
    vibration: true,
    sound: "default",
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: notification?.title ?? data?.title,
    body: notification?.body ?? data?.body,
    data: data,
    android: {
      channelId,
      pressAction: { id: "default" },
    },
  });
}

async function handleNavigation(remoteMessage?: any) {
  if (
    !remoteMessage ||
    Utils.isEmpty(remoteMessage?.detail?.notification?.data)
  )
    return;

  const { notification } = remoteMessage.detail;
  console.log(
    "notification ------------------->",
    JSON.stringify(notification)
  );
}

function handleNotifeeEvent(remoteMessage: any) {
  const { type, detail } = remoteMessage;

  switch (type) {
    case EventType.DISMISSED:
      notifee.cancelNotification(detail?.notification?.id || "");
      break;
    case EventType.ACTION_PRESS:
    case EventType.PRESS:
      handleNavigation(remoteMessage);
      break;
  }
}

const NotificationService = {
  requestUserPermission,
  getFCMToken,
  deleteToken,
  createNotificationListeners,
};

export default NotificationService;
