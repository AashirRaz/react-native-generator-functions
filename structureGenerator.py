import os
import sys
from toast import toast
from Constants import ToastConstants, CodeConstants, FileConstants

class FileManager:
    def __init__(self):
        self.file_extensions = ['.tsx', 'Container.ts', 'types.ts']

    def create_folder(self, folder_name):
        try:
            os.makedirs(folder_name, exist_ok=True)
        except Exception as e:
            toast(ToastConstants.Message.FOLDER_CREATING_ERROR.format(folder_name, e), type=ToastConstants.Type.ERROR)

    def create_file(self, file_path, content):
        try:
            with open(file_path, 'w') as file:
                file.write(content)
        except Exception as e:
            toast(ToastConstants.Message.FILE_CREATING_ERROR.format(file_path, e), type=ToastConstants.Type.ERROR)

    def create_files(self, file_names):
        if not file_names:
            toast(ToastConstants.Message.FILE_NAME_NOT_PROVIDED, type=ToastConstants.Type.INFO)
            return

        for file_name in file_names:
            if ' ' in file_name:
                toast(ToastConstants.Message.FILE_NAME_SPACES_ERROR.format(file_name), type=ToastConstants.Type.INFO)
                continue

            file_basename, _ = os.path.splitext(file_name)
            self.create_folder(file_basename)

            component_content = CodeConstants.Structure.COMPONENT_FILE.format(file_basename, file_basename.capitalize())
            container_content = CodeConstants.Structure.CONTAINER_FILE.format(file_basename.capitalize())

            for extension in self.file_extensions:
                if(extension == 'Container.ts'):
                    content = container_content
                elif extension == '.tsx':
                    content = component_content
                else:
                    content = ''       
                self.create_file(os.path.join(file_basename, f'{file_basename if extension != 'types.ts' else ''}{extension}'), content)

            toast(ToastConstants.Message.FILE_CREATING_SUCCESS.format(file_basename), type=ToastConstants.Type.SUCCESS)

def main():    
    file_manager = FileManager()

    # Check if file names are provided as command-line arguments
    if len(sys.argv) > 1:
        file_names = sys.argv[1:]
    else:
        # If not provided, ask for file names
        file_names = []
        while True:
            file_name = input("Enter file name (leave blank to finish): ").strip()
            if not file_name:
                break
            file_names.append(file_name)

    file_manager.create_files(file_names)


if __name__ == "__main__":
    main()