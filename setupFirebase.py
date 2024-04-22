from installPackages import install_packages, toast
import os
from Generics import ReplaceFileContent
from Constants import CodeConstants, FileConstants
from toast import colors
import shutil

def init_firebase(directory:str, project_name: str):
    # Install Firebase App
    install_packages(['@react-native-firebase/app'])
    
    # Replace the contents of the android/build.gradle file
    ReplaceFileContent(f'{directory}/android/build.gradle', 
                       [CodeConstants.FIREBASE.BUILD_GRADLE_OLD], [CodeConstants.FIREBASE.BUILD_GRADLE_NEW])

    # Replace the contents of the android/app/build.gradle file
    ReplaceFileContent  (f'{directory}/android/app/build.gradle', 
                         [CodeConstants.FIREBASE.ANDROID_BUILD_GRADLE_OLD], [CodeConstants.FIREBASE.ANDROID_BUILD_GRADLE_NEW])

    # Replace the contents of the AppDelegate.mm file
    ReplaceFileContent(f'{directory}/ios/{project_name}/AppDelegate.mm', 
                       [CodeConstants.FIREBASE.APPDELEGATE_OLD_IMPORT, CodeConstants.FIREBASE.APPDELEGATE_OLD_CONFIGURE], 
                       [CodeConstants.FIREBASE.APPDELEGATE_NEW_IMPORT, CodeConstants.FIREBASE.APPDELEGATE_NEW_CONFIGURE])

    # Replace the contents of the Podfile file
    ReplaceFileContent(f'{directory}/ios/Podfile', 
                       [CodeConstants.FIREBASE.PODFILE_OLD], [CodeConstants.FIREBASE.PODFILE_NEW])
    
    toast('Firebase initialized successfully, Dont forget to add GoogleService-Info.plist and google-services.json', type='info')


def init_messaging(directory:str, project_name: str):

    # Install Firebase Messaging
    install_packages(['@react-native-firebase/messaging', '@notifee/react-native'])

    source_file_base_path = '/Users/aashirraza/Desktop/Tests/react-native-generator-functions/'

    print(colors.YELLOW + 'Please follow the instructions at' + colors.YELLOW_BOLD + ' https://rnfirebase.io/messaging/usage/ios-setup#enable-push-notifications' + colors.END)

    # make a copy of the file
    shutil.copy(f'{source_file_base_path}/notificationServiceTemplate.ts', '/Users/aashirraza/Desktop/Tests/react-native-generator-functions/notificationService.ts')

    # Replace the contents of the notificationService.ts file
    ReplaceFileContent(f'{source_file_base_path}/notificationService.ts', ['genericName_notification_channel_id'], [f'{project_name}_notification_channel_id'])

    # Copy the file to the project
    shutil.copy(f'{source_file_base_path}/notificationService.ts', f'{directory}/src/services')

    # Remove the original file
    os.remove(f'{source_file_base_path}/notificationService.ts')

    # Replace the contents of the index.js file
    ReplaceFileContent(f'{directory}/index.js', [CodeConstants.FIREBASE.INDEX_JS_OLD], [CodeConstants.FIREBASE.INDEX_JS_NEW])
    
def main():
    # Get the current working directory and project name
    current_directory = os.getcwd()
    project_name = current_directory.split('/')[-1]

    # Check if the current directory contains the necessary files or folders
    if not all(os.path.exists(os.path.join(current_directory, f)) for f in FileConstants.REQUIRED_FOLDERS):
        print("Error: Please execute this script from the root folder of your project directory.")
        return
    
    while True:
        print("Press 1 for basic init")
        print("Press 2 for messaging init")
        print("Press 3 for combine init")
        print("Press 4 to exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            init_firebase(directory=current_directory, project_name=project_name)
        elif choice == '2':
            init_messaging(directory=current_directory, project_name=project_name)
        elif choice == '3':
            init_firebase(directory=current_directory, project_name=project_name)
            init_messaging(directory=current_directory, project_name=project_name)
        elif choice == '4':
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please enter a valid option.")    

if __name__ == "__main__":
    main()