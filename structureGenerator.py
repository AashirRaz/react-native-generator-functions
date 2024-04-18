import os
import sys
from toast import toast

class FileManager:
    def __init__(self):
        self.file_extensions = ['.tsx', 'Container.ts', 'types.ts']

    def create_folder(self, folder_name):
        try:
            os.makedirs(folder_name, exist_ok=True)
        except Exception as e:
            toast(f"Error occurred while creating folder '{folder_name}': {e}", type='error')

    def create_file(self, file_path, content):
        try:
            with open(file_path, 'w') as file:
                file.write(content)
        except Exception as e:
            toast(f"Error occurred while creating file '{file_path}': {e}", type='error')

    def create_component_file_content(self, file_basename):
        return f'''import React from 'react';
import {{ StyleSheet, Text, View }} from 'react-native';
import use{file_basename.capitalize()} from './{file_basename}Container';

export default function {file_basename}() {{
  const {{}} = use{file_basename.capitalize()}();

  return (
    <View style={{styles.container}}>
      <Text>{file_basename}</Text>
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

    def create_container_file_content(self, file_basename):
        return f'''import {{ StyleSheet, Text, View }} from 'react-native';
import React from 'react';

export default function use{file_basename.capitalize()}() {{
  return {{}};
}}
'''

    def create_files(self, file_names):
        if not file_names:
            toast("No file names provided. Exiting.", type='info')
            return

        for file_name in file_names:
            if ' ' in file_name:
                toast(f"Skipping file '{file_name}' as it contains spaces.", type='info')
                continue

            file_basename, _ = os.path.splitext(file_name)
            self.create_folder(file_basename)

            component_content = self.create_component_file_content(file_basename)
            container_content = self.create_container_file_content(file_basename)

            for extension in self.file_extensions:
                if(extension == 'Container.ts'):
                    content = container_content
                elif extension == '.tsx':
                    content = component_content
                else:
                    content = ''       
                self.create_file(os.path.join(file_basename, f'{file_basename if extension != 'types.ts' else ''}{extension}'), content)

            toast(f"Files created for {file_basename}", type='success')

if __name__ == "__main__":
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
