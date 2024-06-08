import {
  RESULTS,
  check,
  request,
  Permission,
  PERMISSIONS,
} from "react-native-permissions";
import { isPlatformIOS, openURL, showAlert } from "@Utility/utilities";
import { Linking } from "react-native";

export const fetchPermissionStatus = (permissionType: Permission) =>
  check(permissionType);

export function getPermission(permissionType: PermissionTypes) {
  return new Promise<boolean>(async (resolve, reject) => {
    const PermissionConstant = getPermissionConstants(permissionType);

    if (!PermissionConstant) {
      reject("Permission doesn't exist.");
    }
    const permissionStatus = await fetchPermissionStatus(PermissionConstant);

    switch (permissionStatus) {
      case RESULTS.GRANTED:
        resolve(true);
        break;
      case RESULTS.BLOCKED:
        showAlertBox();
        reject("Permission wasn't granted.");
        break;
      case RESULTS.DENIED:
        const permissionRequest = await request(PermissionConstant);
        if (permissionRequest === RESULTS.GRANTED) {
          resolve(true);
        } else {
          reject("Permission wasn't granted.");
        }
        break;
      default:
        reject("Permission wasn't granted.");
    }
  });
}

const showAlertBox = () => {
  showAlert(
    "Location Required",
    "We need access to your location for app to function properly kindly grant location access from settings page.",
    () => {
      isPlatformIOS
        ? openURL("app-settings:")
        : Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
    },
    "Open Settings"
  );
};

export enum PermissionTypes {
  Location = "location",
  BackgroundLocation = "backgroundLocation",
  CoarseLocation = "coarseLocation",
  MediaLocation = "mediaLocation",
  ActivityRecognition = "activityRecognition",
  AddVoicemail = "addVoicemail",
  AnswerPhoneCalls = "answerPhoneCalls",
  BluetoothAdvertise = "bluetoothAdvertise",
  BluetoothConnect = "bluetoothConnect",
  BluetoothScan = "bluetoothScan",
  BodySensors = "bodySensors",
  CallPhone = "callPhone",
  Camera = "camera",
  GetAccounts = "getAccounts",
  NearbyWifiDevices = "nearbyWifiDevices",
  PostNotifications = "postNotifications",
  ProcessOutgoingCalls = "processOutgoingCalls",
  ReadCalendar = "readCalendar",
  ReadCallLog = "readCallLog",
  ReadContacts = "readContacts",
  ReadExternalStorage = "readExternalStorage",
  ReadMediaAudio = "readMediaAudio",
  ReadMediaImages = "readMediaImages",
  ReadMediaVideo = "readMediaVideo",
  ReadMediaVisualUserSelected = "readMediaVisualUserSelected",
  ReadPhoneNumbers = "readPhoneNumbers",
  ReadPhoneState = "readPhoneState",
  ReadSms = "readSms",
  ReceiveMms = "receiveMms",
  ReceiveSms = "receiveSms",
  ReceiveWapPush = "receiveWapPush",
  RecordAudio = "recordAudio",
  SendSms = "sendSms",
  UseSip = "useSip",
  UwbRanging = "uwbRanging",
  WriteCalendar = "writeCalendar",
  WriteCallLog = "writeCallLog",
  WriteContacts = "writeContacts",
  WriteExternalStorage = "writeExternalStorage",
}

const permissionMappings = {
  [PermissionTypes.Location]: {
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  },
  [PermissionTypes.BackgroundLocation]: {
    android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  },
  [PermissionTypes.CoarseLocation]: {
    android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  },
  [PermissionTypes.MediaLocation]: {
    android: PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
    ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
  },
  [PermissionTypes.ActivityRecognition]: {
    android: PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
    ios: PERMISSIONS.IOS.MOTION,
  },
  [PermissionTypes.AddVoicemail]: {
    android: PERMISSIONS.ANDROID.ADD_VOICEMAIL,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.AnswerPhoneCalls]: {
    android: PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.BluetoothAdvertise]: {
    android: PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
    ios: PERMISSIONS.IOS.BLUETOOTH,
  },
  [PermissionTypes.BluetoothConnect]: {
    android: PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    ios: PERMISSIONS.IOS.BLUETOOTH,
  },
  [PermissionTypes.BluetoothScan]: {
    android: PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    ios: PERMISSIONS.IOS.BLUETOOTH,
  },
  [PermissionTypes.BodySensors]: {
    android: PERMISSIONS.ANDROID.BODY_SENSORS,
    ios: PERMISSIONS.IOS.MOTION,
  },
  [PermissionTypes.CallPhone]: {
    android: PERMISSIONS.ANDROID.CALL_PHONE,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.Camera]: {
    android: PERMISSIONS.ANDROID.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA,
  },
  [PermissionTypes.GetAccounts]: {
    android: PERMISSIONS.ANDROID.GET_ACCOUNTS,
    ios: PERMISSIONS.IOS.CONTACTS,
  },
  [PermissionTypes.NearbyWifiDevices]: {
    android: PERMISSIONS.ANDROID.NEARBY_WIFI_DEVICES,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.PostNotifications]: {
    android: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    ios: "", // iOS has different notification system
  },
  [PermissionTypes.ProcessOutgoingCalls]: {
    android: PERMISSIONS.ANDROID.PROCESS_OUTGOING_CALLS,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.ReadCalendar]: {
    android: PERMISSIONS.ANDROID.READ_CALENDAR,
    ios: PERMISSIONS.IOS.CALENDARS,
  },
  [PermissionTypes.ReadCallLog]: {
    android: PERMISSIONS.ANDROID.READ_CALL_LOG,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.ReadContacts]: {
    android: PERMISSIONS.ANDROID.READ_CONTACTS,
    ios: PERMISSIONS.IOS.CONTACTS,
  },
  [PermissionTypes.ReadExternalStorage]: {
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  },
  [PermissionTypes.ReadMediaAudio]: {
    android: PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
  },
  [PermissionTypes.ReadMediaImages]: {
    android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
  },
  [PermissionTypes.ReadMediaVideo]: {
    android: PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
  },
  [PermissionTypes.ReadMediaVisualUserSelected]: {
    android: PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED,
    ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
  },
  [PermissionTypes.ReadPhoneNumbers]: {
    android: PERMISSIONS.ANDROID.READ_PHONE_NUMBERS,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.ReadPhoneState]: {
    android: PERMISSIONS.ANDROID.READ_PHONE_STATE,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.ReadSms]: {
    android: PERMISSIONS.ANDROID.READ_SMS,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.ReceiveMms]: {
    android: PERMISSIONS.ANDROID.RECEIVE_MMS,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.ReceiveSms]: {
    android: PERMISSIONS.ANDROID.RECEIVE_SMS,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.ReceiveWapPush]: {
    android: PERMISSIONS.ANDROID.RECEIVE_WAP_PUSH,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.RecordAudio]: {
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
    ios: PERMISSIONS.IOS.MICROPHONE,
  },
  [PermissionTypes.SendSms]: {
    android: PERMISSIONS.ANDROID.SEND_SMS,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.UseSip]: {
    android: PERMISSIONS.ANDROID.USE_SIP,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.UwbRanging]: {
    android: PERMISSIONS.ANDROID.UWB_RANGING,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.WriteCalendar]: {
    android: PERMISSIONS.ANDROID.WRITE_CALENDAR,
    ios: PERMISSIONS.IOS.CALENDARS_WRITE_ONLY,
  },
  [PermissionTypes.WriteCallLog]: {
    android: PERMISSIONS.ANDROID.WRITE_CALL_LOG,
    ios: "", // iOS doesn't have an equivalent
  },
  [PermissionTypes.WriteContacts]: {
    android: PERMISSIONS.ANDROID.WRITE_CONTACTS,
    ios: PERMISSIONS.IOS.CONTACTS,
  },
  [PermissionTypes.WriteExternalStorage]: {
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
  },
};

export function getPermissionConstants(
  permissionType: PermissionTypes
): Permission {
  const permission = permissionMappings[permissionType];
  if (!permission) {
    throw new Error(`Permission type "${permissionType}" is not defined.`);
  }

  return (isPlatformIOS ? permission.ios : permission.android) as Permission;
}
