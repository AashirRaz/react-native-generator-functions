import os
from installPackages import install_packages, subprocess, toast


def setup_rn_permissions(directory):
    """Setup React Native permissions."""
    try:
        # Run yarn add command to install react-native-permissions
        install_packages(['react-native-permissions'])

        # Read the content of the Podfile
        with open(f'{directory}/ios/Podfile', 'r') as file:
            podfile_content = file.read()

        # Replace the platform line with the updated content
        updated_podfile_content = podfile_content.replace(
            'platform :ios, min_ios_version_supported',
            '''def rn_permissions_setup(script)
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
        )

        # Write the updated content back to the Podfile
        with open(f'{directory}/ios/Podfile', 'w') as file:
            file.write(updated_podfile_content)

        toast("Permissions setup completed successfully.", type='info')
        return True

    except Exception as e:
        toast(e, type='error')
        return False

if __name__ == "__main__":
    path = os.getcwd()
    setup_rn_permissions(directory=path)