# react-native-generator-functions

This application makes the process of setting up a react native application completely hassle-free by using code-generators which create the default file structure in an application

## Pre-Requisites for Installation

- Python 3

## Getting Started

- After cloning the project, Open the Constants.py file and edit the following code:

```py
class FileConstants:
    BOILERPLATE_PATH = '$PATH TO YOUR CLONED BOILERPLATE REPOSITORY'
```

## Configuration

### MacOS

Open your terminal and Enter the following code into your terminal

```zsh
cd ~
```

Then enter this, your Bash Profile with open inside of a text editor

```zsh
nano ~/.bash_profile
```

OR if you dont have Bash Profile

```zsh
nano ~/.zshrc
```

Enter this into your bash_profile

```zsh
alias rn-create-project="python3 {path to cloned-folder}/react-native-generator-functions/createRNProject.py";
```

```zsh
alias rn-setup-firebase="python3 {path to cloned-folder}/react-native-generator-functions/setupFirebase.py";
```

```zsh
alias rn-setup-permissions="python3 {path to cloned-folder}/react-native-generator-functions/setupRNPermissions.py";
```

```zsh
alias rn-create-structure="python3 {path to cloned-folder}/react-native-generator-functions/structureGenerator.py";
```

Save changes to your file and exit the text editor

Enter the following into your Terminal to save the changes

```zsh
source ~/.bash_profile
```

## Contributing

- [Submit a bug report or issue](mailto:syedaashirraza@gmail.com)
- [Contribute code by submitting a pull request](mailto:syedaashirraza@gmail.com)
- [Ask a question](mailto:syedaashirraza@gmail.com)

## Contributers

- [Syed Aashir Raza](https://github.com/AashirRaz)
- [Muhammad Musavir Waseem](https://github.com/MusavirWaseem110)

## Support

react-native-generator-functions is something we do in our spare time around our day job, friends, and other hobbies. That means support is "when we get to it". We recognize that sometimes this isn't good enough, especially if you have a production issue. To that end, We [offer paid support and bugfixes](syedaashirraza@gmail.com). A few basic rules before you contact me:

- Changes made to Jarvis are open source.
- We reserve the right to make any changes we desire to the codebase.

Please email me if paid support is something you require, and we can work out the details via email.
