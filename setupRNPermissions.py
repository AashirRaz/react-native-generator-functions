import os
from installPackages import install_packages, toast
from Generics import ReplaceFileContent
from Constants import CodeConstants, FileConstants, ToastConstants


def setup_rn_permissions(directory : str) -> bool:
    # Setup React Native permissions.
    try:
        # Install Reac
        install_packages(['react-native-permissions'])

        # Replace the content of the Podfile
        ReplaceFileContent(f'{directory}/ios/Podfile', [CodeConstants.PodFile.OLD_PODFILE], [CodeConstants.PodFile.NEW_PODFILE])

        toast(ToastConstants.Message.PERMISSIONS_INSTALLED, type=ToastConstants.Type.INFO)
        return True

    except Exception as e:
        toast(e, type=ToastConstants.Type.ERROR)
        return False

if __name__ == "__main__":
    # Get the current working directory and project name
    current_directory = os.getcwd()

    # Check if the current directory contains the necessary files or folders
    if not all(os.path.exists(os.path.join(current_directory, f)) for f in FileConstants.REQUIRED_FOLDERS):
        print("Error: Please execute this script from the root folder of your project directory.")
        exit()
    
    setup_rn_permissions(directory=current_directory)