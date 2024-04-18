class PackageConstants:
    DEFAULT_PACKAGES = ['@hookform/resolvers','@react-native-community/netinfo','@react-navigation/drawer','@react-navigation/native','@react-navigation/native-stack','@tanstack/query-core','@tanstack/react-query','@tanstack/react-query-persist-client','apisauce','dayjs','react-hook-form','react-native-background-timer','react-native-confirmation-code-field','react-native-device-info','react-native-exception-handler','react-native-gesture-handler','react-native-keyboard-manager','react-native-mmkv','react-native-reanimated','react-native-safe-area-context','react-native-screens','react-native-size-matters', 'rn-animated-toast', 'yup' ,'zustand']
    DEFAULT_DEV_PACKAGES = ['@types/react-native-background-timer', 'babel-plugin-module-resolver']

class FileConstants:
    REQUIRED_FILES = ['src', 'react-native.config.js', 'tsconfig.json' , 'babel.config.js']
    BOILERPLATE_PATH = '/Users/aashirraza/Desktop/Tests/rnboilerplate'


class ToastConstants:
    class Type:
        INFO = 'info'
        SUCCESS = 'success'
        ERROR = 'error'

    class Message:
        BOILERPLATE_INTEGRATED = "Boilerplate integrated successfully."
        ERROR_INTEGRATING_BOILERPLATE = "Error occurred while copying folder:{0}."
        REACT_NATIVE_PROJECT_CREATED = "React Native project setup and installation completed successfully."
        NO_PROJECTNAME_PROVIDED = "No project name provided. Exiting."
        PROJECTNAME_SPACES_ERROR = "Project name cannot contain spaces. Exiting."
        BOILERPLATE_INIT_TIMER = "Boilerplate setup completed in {0} seconds. Enjoy Coding!"
        PACKAGES_INSTALLED = "Packages installed successfully."
        PACKAGES_ERROR = "Error occurred while installing packages. {0}"
        PERMISSIONS_INSTALLED = "Permissions setup completed successfully."
        FOLDER_CREATING_ERROR = "Error occurred while creating folder '{0}': {1}"
        FILE_CREATING_ERROR = "Error occurred while creating file '{0}': {1}"
        FILE_NAME_NOT_PROVIDED = "File name not provided. Exiting."
        FILE_NAME_SPACES_ERROR = "Skipping file '{0}' as it contains spaces."
        FILE_CREATING_SUCCESS = "Files created for {0}"
        OLDCONTENT_NOT_EQUALS_NEWCONTENT = "Length of oldContent and newContent should be same"



class CodeConstants:
    class IndexJs:
        IMPORT_APP_OLD = "import App from './src';"
        IMPORT_APP_NEW = '''import App from './src';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';'''
        APP_REGISTERY_NEW = "AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));"
        APP_REGISTERY_OLD = "AppRegistry.registerComponent(appName, () => App);"
    
    class PackageJson:
        OLD_SCRIPT = '"test": "jest"'
        NEW_SCRIPT = '''"test": "jest",
    "postinstall": "pod install --project-directory=ios",
    "clean": "cd android && gradlew clean && cd..",
    "build": "cd android && gradlew clean && gradlew assembleRelease && cd..",
    "releasebuild": "cd android && gradlew clean && gradlew bundleRelease && cd..",
    "open-apk": "open android/app/build/outputs/apk/release/"''',

    class PodFile:
        OLD_PODFILE = 'platform :ios, min_ios_version_supported'
        NEW_PODFILE = '''def rn_permissions_setup(script)
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

platform :ios, min_ios_version_supported'''

    class Structure:
        COMPONENT_FILE = '''import React from 'react';
import {{ StyleSheet, Text, View }} from 'react-native';
import use{1} from './{0}Container';

export default function {0}() {{
  const {{}} = use{1}();

  return (
    <View style={{styles.container}}>
      <Text>{0}</Text>
    </View>
  );
}}

const styles = StyleSheet.create({{ 
  container: {{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }},
}});
'''

        CONTAINER_FILE = '''import {{ StyleSheet, Text, View }} from 'react-native';
import React from 'react';

export default function use{0}() {{
  return {{}};
}}
'''