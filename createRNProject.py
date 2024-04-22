import sys
import time
import shutil
from installPackages import install_packages, subprocess, toast
from setupRNPermissions import setup_rn_permissions, os
from Constants import PackageConstants, FileConstants, ToastConstants, CodeConstants
from Generics import ReplaceFileContent

def copy_folder(folder):
    try:
        for a in FileConstants.REQUIRED_FILES:
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

        toast(ToastConstants.Message.BOILERPLATE_INTEGRATED, type=ToastConstants.Type.INFO)
    except Exception as e:
        toast(ToastConstants.Message.ERROR_INTEGRATING_BOILERPLATE.format(e), type=ToastConstants.Type.ERROR)

def create_react_native_project(project_name):
    # Create a new React Native project
    try:
        
        # Run the command to create a new React Native project
        subprocess.run(['npx', 'react-native@latest', 'init', project_name], check=True)

        directory = f'{os.getcwd()}/{project_name}'

        # Change the current working directory to the newly created project directory
        os.chdir(directory)

        # Copy required files
        copy_folder(FileConstants.BOILERPLATE_PATH)

        # Replace the contents of the index.js file
        ReplaceFileContent(f'{directory}/index.js', [CodeConstants.IndexJs.IMPORT_APP_OLD, CodeConstants.IndexJs.APP_REGISTERY_OLD], [CodeConstants.IndexJs.IMPORT_APP_NEW, CodeConstants.IndexJs.APP_REGISTERY_NEW])

        # Replace the contents of the package.json file
        ReplaceFileContent(f'{directory}/package.json', [CodeConstants.PackageJson.OLD_SCRIPT], [CodeConstants.PackageJson.NEW_SCRIPT])

        # Remove the App.tsx file
        os.remove(f'{directory}/App.tsx')

        # Install dependencies
        install_packages(PackageConstants.DEFAULT_PACKAGES)
        install_packages(PackageConstants.DEFAULT_DEV_PACKAGES, dev=True)

        # linking assets
        subprocess.run(['npx', 'react-native-asset'], check=True)

        # Setup permissions
        setup_rn_permissions(directory)

        # Open project in VSCode
        subprocess.run(['code', '.'], check=True)

        toast(ToastConstants.Message.REACT_NATIVE_PROJECT_CREATED, type=ToastConstants.Type.SUCCESS)
        return True
    
    except Exception as e:
        toast(e, type=ToastConstants.Type.ERROR)
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
            toast(ToastConstants.Message.NO_PROJECTNAME_PROVIDED, type=ToastConstants.Type.ERROR)
            sys.exit(1)
        elif ' ' in project_name:
            toast(ToastConstants.Message.PROJECTNAME_SPACES_ERROR, type=ToastConstants.Type.ERROR)
            sys.exit(1)
            

    # Create React Native project
    create_react_native_project(project_name=project_name)

    # Print final elapsed time
    elapsed_time = round(time.time() - start_time)
    toast(ToastConstants.Message.BOILERPLATE_INIT_TIMER.format(elapsed_time), type=ToastConstants.Type.INFO)
