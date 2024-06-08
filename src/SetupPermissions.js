import fs from "fs";
import { fileURLToPath } from "url";
import {
  FileConstants,
  PersmissionConstants,
  ToastMessages,
  ToastTypes,
} from "./Constants.js";
import { Toast } from "./Toast.js";
import { copyFile, installPackages, replaceFileContent } from "./Utils.js";

export async function SetupPermissions(
  directory,
  prefixTextPackages = "[1/2]",
  prefixText = "[2/2]"
) {
  try {
    // Install React Native permissions
    await installPackages(
      ["react-native-permissions"],
      false,
      "Permissions",
      prefixTextPackages
    );

    // Replace the content of the Podfile
    await replaceFileContent(
      `${directory}/ios/Podfile`,
      [PersmissionConstants.OLD_PODFILE],
      [PersmissionConstants.NEW_PODFILE],
      prefixText
    );

    copyFile(
      "/Users/aashirraza/Desktop/Tests/generator-functions/src/permissionService.ts",
      `${directory}/src/services/permissionService.ts`
    );

    // Toast(ToastMessages.PERMISSIONS_INSTALLED, ToastTypes.INFO);
    return true;
  } catch (error) {
    // Toast(error, ToastTypes.ERROR);
    return false;
  }
}

// If the file is run directly (not imported), execute the setup logic
const __filename = fileURLToPath(import.meta.url);

// If the file is run directly (not imported), execute the setup logic
if (process.argv[1] === __filename) {
  // Get the current working directory
  const currentDirectory = process.cwd();

  // Check if the current directory contains the necessary files or folders
  if (
    !FileConstants.REQUIRED_FOLDERS.every((f) =>
      fs.existsSync(`${currentDirectory}/${f}`)
    )
  ) {
    Toast(ToastMessages.REQUIRED_FOLDERS_MISSING, ToastTypes.ERROR);
    process.exit(1);
  }

  // Run the setup function
  await SetupPermissions(currentDirectory);
}
