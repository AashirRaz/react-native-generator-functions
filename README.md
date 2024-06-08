# React Native Generator Functions

This application makes the process of setting up a react native application completely hassle-free by using code-generators which create the default file structure in an application

## Pre-Requisites for Installation 🛠️

- node

## Getting Started 🚀

- After Cloning the project, run the following command to install all required packages

```zsh
npm install or yarn
```

- Open the Constants.js file and edit the following code:

```js
export const FileConstants = {
  BOILERPLATE_PATH: "{path to cloned-boilerplate-folder}",
};
```

## Configuration ⚙️

### Windows

1. Open your Terminal as Administrator
2. Enter the following code into your terminal

```ps1
notepad $PROFILE
```

- If you encounter any error regarding missing profiles, Enter the following code and repeat above step

```ps1
New-Item -Path $PROFILE -ItemType File -Force
```

- Paste the below code into your notepad file

```ps1
Function Setup-Firebase {
    Invoke-Expression "node `"{path to cloned-folder}/react-native-generator-functions/SetupFirebase.js`""
}

Function Create-Project {
    Invoke-Expression "node `"{path to cloned-folder}/react-native-generator-functions/CreateProject.js`""
}

Function Setup-Permissions {
    Invoke-Expression "node `"{path to cloned-folder}/react-native-generator-functions/SetupPermissions.js`""
}

Function Create-Structure {
    Invoke-Expression "node `"{path to cloned-folder}/react-native-generator-functions/FileManager.js`""
}

Set-Alias -Name setup-firebase -Value Setup-Firebase
Set-Alias -Name create-project -Value Create-Project
Set-Alias -Name setup-permissions -Value Setup-Permissions
Set-Alias -Name create-structure -Value Create-Structure
```

- Save the Notepad file and Restart your terminal to Save Changes

- Copy the main directory location of your project and put in the PATH Environment Variable

### MacOS

- Open your terminal and Enter the following code into your terminal

```zsh
cd ~
```

- Then enter this, your Bash Profile with open inside of a text editor

```zsh
nano ~/.bash_profile or ~/.zshrc
```

- Enter this into your bash_profile

```zsh
alias create-project="node {path to cloned-folder}/react-native-generator-functions/CreateProject.js";
```

```zsh
alias setup-firebase="node {path to cloned-folder}/react-native-generator-functions/SetupFirebase.js";
```

```zsh
alias setup-permissions="node {path to cloned-folder}/react-native-generator-functions/SetupPermissions.js";
```

```zsh
alias create-structure="node {path to cloned-folder}/react-native-generator-functions/FileManager.js";
```

- Save changes to your file and exit the text editor

- Enter the following into your Terminal to save the changes

```zsh
source ~/.bash_profile or ~/.zshrc
```

## Contributing 🤝

- [Submit a bug report or issue](mailto:syedaashirraza@gmail.com)
- [Contribute code by submitting a pull request](mailto:syedaashirraza@gmail.com)
- [Ask a question](mailto:syedaashirraza@gmail.com)

## Contributers 🧑‍💻

- [Syed Aashir Raza](https://github.com/AashirRaz)
- [Muhammad Musavir Waseem](https://github.com/MusavirWaseem110)

## Support 🛡️

react-native-generator-functions is something we do in our spare time around our day job, friends, and other hobbies. That means support is "when we get to it". We recognize that sometimes this isn't good enough, especially if you have a production issue. To that end, We [offer paid support and bugfixes](syedaashirraza@gmail.com). A few basic rules before you contact me:

- Changes made to react-native-generator-functions are open source.
- We reserve the right to make any changes we desire to the codebase.

Please email me if paid support is something you require, and we can work out the details via email.
