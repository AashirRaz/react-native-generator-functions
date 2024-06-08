String.prototype.format = function () {
  const args = arguments;
  return this.replace(/{(\d+)}/g, function (match, index) {
    return typeof args[index] !== "undefined" ? args[index] : match;
  });
};

export const PackageConstants = {
  DEFAULT_PACKAGES: [
    "@hookform/resolvers",
    "@react-native-community/netinfo",
    "@react-navigation/drawer",
    "@react-navigation/native",
    "@react-navigation/native-stack",
    "@tanstack/query-core",
    "@tanstack/react-query",
    "@tanstack/react-query-persist-client",
    "apisauce",
    "dayjs",
    "react-hook-form",
    "react-native-background-timer",
    "react-native-confirmation-code-field",
    "react-native-device-info",
    "react-native-exception-handler",
    "react-native-gesture-handler",
    "react-native-keyboard-manager",
    "react-native-mmkv",
    "react-native-reanimated",
    "react-native-safe-area-context",
    "react-native-screens",
    "react-native-size-matters",
    "rn-animated-toast",
    "yup",
    "zustand",
  ],
  DEFAULT_DEV_PACKAGES: [
    "@types/react-native-background-timer",
    "babel-plugin-module-resolver",
  ],
};

export const ToastMessages = {
  //   FileManager
  FOLDER_CREATING_ERROR: "Error occurred while creating folder '{0}': {1}",
  FILE_CREATING_ERROR: "Error occurred while creating file '{0}': {1}",
  FILE_NAME_NOT_PROVIDED: "File name not provided. Exiting.",
  FILE_NAME_SPACES_ERROR: "Skipping file '{0}' as it contains spaces.",
  FILE_CREATING_SUCCESS: "Files created for {0}",
  FOLDER_ALREADY_EXISTS: "Folder '{0}' already exists.",
  FILE_ALREADY_EXISTS: "File '{0}' already exists.",

  //   Permissions
  PERMISSIONS_INSTALLED: "Permissions setup completed successfully.",
  REQUIRED_FOLDERS_MISSING:
    "Required folders are missing. Please run the command in the root of your React Native project.",

  //   Install packages
  PACKAGES_INSTALLED: "Packages installed successfully.",
  PACKAGES_ERROR: "Error occurred while installing packages. {0}",

  //   Firebase
  FIREBASE_INIT_SUCCESS:
    "Firebase initialized successfully. Don't forget to add GoogleService-Info.plist and google-services.json",
  FIREBASE_INIT_ERROR: "Error occurred while initializing Firebase.",
  FIREBASE_MESSAGING_INIT:
    "Please follow the instructions at https://rnfirebase.io/messaging/usage/ios-setup#enable-push-notifications",
  FIREBASE_MESSAGING_SUCCESS: "Firebase messaging initialized successfully.",
  FIREBASE_MESSAGING_ERROR:
    "Error occurred while initializing Firebase messaging.",
  FIREBASE_COMBINE_SUCCESS: "Firebase and messaging initialized successfully.",
  FIREBASE_COMBINE_ERROR:
    "Error occurred while initializing Firebase and messaging.",

  // init project
  BOILERPLATE_INIT_SUCCESS: "Boilerplate integrated successfully.",
  BOILERPLATE_INIT_ERROR: "Error integrating boilerplate: {0}",
  ALREADY_PROJECT_INIT:
    "Already in a React Native project directory. Skipping project creation.",
  PROJECT_BUILD_SUCCESSFULL: "React Native project created successfully.",
  PROJECT_BUILD_ERROR: "Error creating React Native project: {0}",
};

export const ToastTypes = {
  ERROR: "ERROR",
  INFO: "INFO",
  SUCCESS: "SUCCESS",
  UNKNOWN: "UNKNOWN",
};

export const Structure = {
  COMPONENT_FILE: `import React from "react";
import { StyleSheet, Text, View } from "react-native";
import use{1} from './{0}Container';

export default function {0}() {
  const {} = use{1}();

  return (
    <View style={styles.container}>
      <Text>{0}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});`,
  CONTAINER_FILE: `import React from "react";

export default function use{0}() {
  return {};
}`,
};

export const FileConstants = {
  BOILERPLATE_PATH: "/Users/aashirraza/Desktop/Tests/rnboilerplate",
  REQUIRED_FILES: [
    "src",
    "react-native.config.js",
    "tsconfig.json",
    "babel.config.js",
  ],
  REQUIRED_FOLDERS: ["android", "ios", "src"],
  PATH_TO_GRADLE: "{0}/android/build.gradle",
  PATH_TO_ANDROID_GRADLE: "{0}/android/app/build.gradle",
  PATH_TO_PODFILE: "{0}/ios/Podfile",
  PATH_TO_APP_DELEGATE: "{0}/ios/{1}/AppDelegate.mm",
  NOTIFICATION_TEMPLATE_PATH:
    "/Users/aashirraza/Desktop/Tests/generator-functions/src/notificationServiceTemplate.ts",
  NOTIFICATION_TEMPLATE_COPY:
    "/Users/aashirraza/Desktop/Tests/generator-functions/src/notificationService.ts",
};

export const PersmissionConstants = {
  OLD_PODFILE: `platform :ios, min_ios_version_supported`,
  NEW_PODFILE: `def rn_permissions_setup(script)
# Resolve script with node to allow for hoisting
require Pod::Executable.execute_command('node', ['-p',
"require.resolve(
  '#{script}',
  {paths: [process.argv[1]]},
)", __dir__]).strip
end
  
rn_permissions_setup('react-native/scripts/react_native_pods.rb')
rn_permissions_setup('react-native-permissions/scripts/setup.rb')

setup_permissions([
'Camera',
'LocationAlways',
'LocationWhenInUse',
'Notifications',
'PhotoLibrary',
'MediaLibrary',
])

platform :ios, min_ios_version_supported`,
};

export const FirebaseConstants = {
  BUILD_GRADLE_OLD: 'classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")',
  BUILD_GRADLE_NEW: `classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
        classpath 'com.google.gms:google-services:4.4.1'  // Firebase`,
  ANDROID_BUILD_GRADLE_OLD: 'apply plugin: "com.facebook.react"',
  ANDROID_BUILD_GRADLE_NEW: `apply plugin: "com.facebook.react"
apply plugin: 'com.google.gms.google-services' // Firebase`,
  PODFILE_OLD: "config = use_native_modules!",
  PODFILE_NEW: `config = use_native_modules!

  use_frameworks! :linkage => :static  # Firebase
  $RNFirebaseAsStaticFramework = true  # Firebase`,
  APPDELEGATE_OLD_IMPORT: '#import "AppDelegate.h"',
  APPDELEGATE_NEW_IMPORT: `#import "AppDelegate.h"
#import <Firebase.h> // Firebase`,
  APPDELEGATE_OLD_CONFIGURE: `- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{`,
  APPDELEGATE_NEW_CONFIGURE: `- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure]; // Firebase
`,
  INDEX_JS_OLD: "import {name as appName} from './app.json';",
  INDEX_JS_NEW: `import {name as appName} from './app.json';
import NotificationService from '@Service/notificationService';

NotificationService.createNotificationListeners(); // Firebase
NotificationService.requestUserPermission(); // Firebase`,
};

export const ProjectInitConstants = {
  IMPORT_APP_OLD: "import App from './src';",
  IMPORT_APP_NEW: `import App from './src';
  import {gestureHandlerRootHOC} from 'react-native-gesture-handler';`,
  APP_REGISTERY_OLD: "AppRegistry.registerComponent(appName, () => App);",
  APP_REGISTERY_NEW:
    "AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));",
  OLD_SCRIPT: '"test": "jest"',
  NEW_SCRIPT: `"test": "jest",
  "postinstall": "pod install --project-directory=ios",
  "clean": "cd android && gradlew clean && cd..",
  "build": "cd android && gradlew clean && gradlew assembleRelease && cd..",
  "releasebuild": "cd android && gradlew clean && gradlew bundleRelease && cd..",
  "open-apk": "open android/app/build/outputs/apk/release/"`,
};
