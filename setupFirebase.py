from installPackages import install_packages

def setup_firebase_dependencies():
    # Install required packages
    packages = [
        'react-native-firebase',
        'react-native-google-signin',
    ]
    
    install_packages(packages)
