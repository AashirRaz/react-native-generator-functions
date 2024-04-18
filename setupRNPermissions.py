import os
from installPackages import install_packages, toast
from Generics import ReplaceFileContent
import Constants


def setup_rn_permissions(directory : str) -> bool:
    # Setup React Native permissions.
    try:
        # Install Reac
        install_packages(['react-native-permissions'])

        # Replace the content of the Podfile
        ReplaceFileContent(f'{directory}/ios/Podfile', [Constants.CodeConstants.PodFile.OLD_PODFILE], [Constants.CodeConstants.PodFile.NEW_PODFILE])

        toast(Constants.ToastConstants.Message.PERMISSIONS_INSTALLED, type=Constants.ToastConstants.Type.INFO)
        return True

    except Exception as e:
        toast(e, type=Constants.ToastConstants.Type.ERROR)
        return False

if __name__ == "__main__":
    path = os.getcwd()
    setup_rn_permissions(directory=path)