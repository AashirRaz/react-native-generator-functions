import fs from "fs";
import { copyFile, installPackages, replaceFileContent } from "./Utils.js";
import { Toast } from "./Toast.js";
import {
  FileConstants,
  FirebaseConstants,
  ToastMessages,
  ToastTypes,
} from "./Constants.js";
import ora from "ora";
import pkg from "enquirer";
const { Input } = pkg;

async function createNotificationService(directory, both = false) {
  const spinner = ora({
    text: "Creating notification service...",
    spinner: "aesthetic",
    prefixText: both ? "[8/9]" : "[3/4]",
  }).start();

  try {
    // Copy the file to the project asynchronously
    await copyFile(
      FileConstants.NOTIFICATION_TEMPLATE_COPY,
      `${directory}/src/services/notificationService.ts`
    );
    spinner.succeed("Notification service created");
  } catch (error) {
    console.log(error);
    spinner.fail("Failed to create notification service");
    throw error;
  }
}

const initFirebase = async (directory, projectName, both = false) => {
  const firebasePackages = ["@react-native-firebase/app"];
  try {
    await installPackages(
      firebasePackages,
      false,
      "Firebase App",
      both ? "[1/9]" : "[1/5]"
    );

    const androidBuildGradlePath =
      FileConstants.PATH_TO_GRADLE.format(directory);
    const androidAppBuildGradlePath =
      FileConstants.PATH_TO_ANDROID_GRADLE.format(directory);
    const appDelegatePath = FileConstants.PATH_TO_APP_DELEGATE.format(
      directory,
      projectName
    );
    const podfilePath = FileConstants.PATH_TO_PODFILE.format(directory);

    await replaceFileContent(
      androidBuildGradlePath,
      [FirebaseConstants.BUILD_GRADLE_OLD],
      [FirebaseConstants.BUILD_GRADLE_NEW],
      both ? "[2/9]" : "[2/5]"
    );

    await replaceFileContent(
      androidAppBuildGradlePath,
      [FirebaseConstants.ANDROID_BUILD_GRADLE_OLD],
      [FirebaseConstants.ANDROID_BUILD_GRADLE_NEW],
      both ? "[3/9]" : "[3/5]"
    );

    await replaceFileContent(
      appDelegatePath,
      [
        FirebaseConstants.APPDELEGATE_OLD_IMPORT,
        FirebaseConstants.APPDELEGATE_OLD_CONFIGURE,
      ],
      [
        FirebaseConstants.APPDELEGATE_NEW_IMPORT,
        FirebaseConstants.APPDELEGATE_NEW_CONFIGURE,
      ],
      both ? "[4/9]" : "[4/5]"
    );

    await replaceFileContent(
      podfilePath,
      [FirebaseConstants.PODFILE_OLD],
      [FirebaseConstants.PODFILE_NEW],
      both ? "[5/9]" : "[5/5]"
    );

    Toast(ToastMessages.FIREBASE_INIT_SUCCESS, ToastTypes.SUCCESS);

    return true;
  } catch (error) {
    Toast(ToastMessages.FIREBASE_INIT_ERROR, ToastTypes.ERROR);
    return false;
  }
};

const initMessaging = async (directory, projectName, both = false) => {
  const messagingPackages = [
    "@react-native-firebase/messaging",
    "@notifee/react-native",
  ];
  try {
    await installPackages(
      messagingPackages,
      false,
      "Firebase Messaging",
      both ? "[6/9]" : "[1/4]"
    );

    Toast(ToastMessages.FIREBASE_MESSAGING_INIT, ToastTypes.INFO);

    // make a copy of the file
    fs.copyFileSync(
      FileConstants.NOTIFICATION_TEMPLATE_PATH,
      FileConstants.NOTIFICATION_TEMPLATE_COPY
    );

    // Replace the contents of the notificationService.ts file
    await replaceFileContent(
      FileConstants.NOTIFICATION_TEMPLATE_COPY,
      ["genericName_notification_channel_id"],
      [`${projectName}_notification_channel_id`],
      both ? "[7/9]" : "[2/4]"
    );

    await createNotificationService(directory, both);

    // Remove the original file
    fs.unlinkSync(FileConstants.NOTIFICATION_TEMPLATE_COPY);

    // Replace the contents of the index.js file
    await replaceFileContent(
      `${directory}/index.js`,
      [FirebaseConstants.INDEX_JS_OLD],
      [FirebaseConstants.INDEX_JS_NEW],
      both ? "[9/9]" : "[4/4]"
    );

    return true;
  } catch (error) {
    Toast(ToastMessages.FIREBASE_MESSAGING_ERROR, ToastTypes.ERROR);
    return false;
  }
};

const main = async () => {
  // Get the current working directory and project name
  const currentDirectory = process.cwd();
  const projectName = currentDirectory.split("/").pop();

  if (
    !FileConstants.REQUIRED_FOLDERS.every((f) =>
      fs.existsSync(`${currentDirectory}/${f}`)
    )
  ) {
    Toast(ToastMessages.REQUIRED_FOLDERS_MISSING, ToastTypes.ERROR);
    process.exit(1);
  }

  console.log("\nPress 1 for basic init");
  console.log("Press 2 for messaging init");
  console.log("Press 3 for combine init");
  console.log("Press any key to exit to exit\n");

  const prompt = new Input({
    name: "choice",
    message: "Enter your choice:",
  });
  const choice = await prompt.run();

  switch (choice) {
    case "1":
      await initFirebase(currentDirectory, projectName);
      break;
    case "2":
      await initMessaging(currentDirectory, projectName);
      break;
    case "3":
      await initFirebase(currentDirectory, projectName, true);
      await initMessaging(currentDirectory, projectName, true);
      break;
    default:
      console.log("Exiting...");
      process.exit(0);
  }
};

main();
