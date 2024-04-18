import sys
import time
import shutil
from installPackages import install_packages
from setupRNPermissions import setup_rn_permissions, os, subprocess, toast

packages = ['@hookform/resolvers','@react-native-community/netinfo','@react-navigation/drawer','@react-navigation/native','@react-navigation/native-stack','@tanstack/query-core','@tanstack/react-query','@tanstack/react-query-persist-client','apisauce','dayjs','react-hook-form','react-native-background-timer','react-native-confirmation-code-field','react-native-device-info','react-native-exception-handler','react-native-gesture-handler','react-native-keyboard-manager','react-native-mmkv','react-native-reanimated','react-native-safe-area-context','react-native-screens','react-native-size-matters', 'rn-animated-toast', 'yup' ,'zustand']
dev_packages = ['@types/react-native-background-timer', 'babel-plugin-module-resolver']

def copy_folder(folder):
    try:
        for a in ['src', 'react-native.config.js', 'tsconfig.json' , 'babel.config.js']:
            source_folder = os.path.join(folder, a)
            folder_name = os.path.basename(source_folder)
            destination_folder = os.path.join(os.getcwd(), folder_name)

            # Check if the source is a file
            if os.path.isfile(source_folder):
                # If source is a file, copy it directly to the destination directory
                shutil.copy(source_folder, destination_folder)
            else:
                # If source is a directory, copy its entire contents to the destination directory
                shutil.copytree(source_folder, destination_folder, dirs_exist_ok=True)

        toast(f"Boilerplate integrated successfully.", type='info')
    except Exception as e:
        toast(f"Error occurred while copying folder:{e}", type='error')

def create_react_native_project(project_name):
    """Create a new React Native project."""
    try:
        
        # Run the command to create a new React Native project
        subprocess.run(['npx', 'react-native@latest', 'init', project_name], check=True)

        directory = f'{os.getcwd()}/{project_name}'

        os.chdir(directory)

        # Copy required files
        copy_folder('/Users/aashirraza/Desktop/Tests/rnboilerplate')

        # Read the content of the index.js file
        with open(f'{directory}/index.js', 'r') as file:
            index_file = file.read()

        # Replace the imports and AppRegistry with the updated content
        updated_index_file = index_file.replace("import App from './App';" , 
        '''import App from './src';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';''')
        new_index_file = updated_index_file.replace("AppRegistry.registerComponent(appName, () => App);" , "AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));")


        # Write the updated content back to the index.js file
        with open(f'{directory}/index.js', 'w') as file:
            file.write(new_index_file)


        os.remove(f'{directory}/App.tsx')

        # Install dependencies
        install_packages(packages)
        install_packages(dev_packages, dev=True)

        # Run additional setup
        subprocess.run(['npx', 'react-native-asset'], check=True)

        # Setup permissions
        setup_rn_permissions(directory)

        # Open project in VSCode
        subprocess.run(['code', '.'], check=True)

        toast("React Native project setup and installation completed successfully.", type='success')
        return True
    
    except Exception as e:
        toast(e, type='error')
        return False
    
 
if __name__ == "__main__":
    start_time = time.time()

    # Check if project name is provided as a command-line argument
    if len(sys.argv) > 1:
        project_name = sys.argv[1]
    else:
        # If not provided, ask for project name
        project_name = input("Enter project name: ")
        if not project_name:
            toast("No project name provided. Exiting.", type='error')
            sys.exit(1)
        elif ' ' in project_name:
            toast("Project name cannot contain spaces. Exiting.", type='error')
            sys.exit(1)
            

    # Create React Native project
    create_react_native_project(project_name=project_name)

    # Print final elapsed time
    elapsed_time = round(time.time() - start_time)
    toast(f"Total time elapsed: {elapsed_time}s", type='info')
