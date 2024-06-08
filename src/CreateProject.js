import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { Toast } from "./Toast.js";
import { installPackages, replaceFileContent, copyFile } from "./Utils.js";
import {
  FileConstants,
  PackageConstants,
  ProjectInitConstants,
  ToastMessages,
  ToastTypes,
} from "./Constants.js";
import { SetupPermissions } from "./setupPermissions.js";
import ora from "ora";
import pkg from "enquirer";
const { Input } = pkg;

async function copyDirectory(source, destination) {
  try {
    await fs.promises.mkdir(destination, { recursive: true });
    const entries = await fs.promises.readdir(source, { withFileTypes: true });

    for (let entry of entries) {
      const srcPath = path.join(source, entry.name);
      const destPath = path.join(destination, entry.name);

      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    throw new Error(`Error copying directory: ${err.message}`);
  }
}

export async function copyFolder(folder) {
  const spinner = ora({
    text: `Copying Boilerplate files...`,
    spinner: "aesthetic",
    prefixText: "[1/8]",
  }).start();
  try {
    for (let a of FileConstants.REQUIRED_FILES) {
      const sourceFolder = path.join(folder, a);
      const folderName = path.basename(sourceFolder);
      const destinationFolder = path.join(process.cwd(), folderName);

      const stats = await fs.promises.stat(sourceFolder);

      if (stats.isFile()) {
        await copyFile(sourceFolder, destinationFolder);
      } else if (stats.isDirectory()) {
        await copyDirectory(sourceFolder, destinationFolder);
      }
    }
    spinner.succeed(`Boilerplate files copied`);
  } catch (error) {
    spinner.fail(`Error copying Boilerplate files`);
  }
}

const createReactNativeProject = async (projectDirectory, projectName) => {
  try {
    // Check if already in a React Native project directory
    if (
      fs.existsSync(path.join(projectDirectory, "android")) &&
      fs.existsSync(path.join(projectDirectory, "ios"))
    ) {
      Toast(ToastMessages.ALREADY_PROJECT_INIT, ToastTypes.INFO);
    } else {
      // Run command to create a new React Native project
      execSync(`npx react-native init ${projectName}`, { stdio: "inherit" });

      // Change current working directory to the newly created project directory
      process.chdir(projectDirectory);
    }

    // Copy required files
    await copyFolder(FileConstants.BOILERPLATE_PATH);

    // Replace contents of index.js file
    await replaceFileContent(
      path.join(projectDirectory, "index.js"),
      [
        ProjectInitConstants.IMPORT_APP_OLD,
        ProjectInitConstants.APP_REGISTERY_OLD,
      ],
      [
        ProjectInitConstants.IMPORT_APP_NEW,
        ProjectInitConstants.APP_REGISTERY_NEW,
      ],
      "[2/8]"
    );

    // Replace contents of package.json file
    await replaceFileContent(
      path.join(projectDirectory, "package.json"),
      [ProjectInitConstants.OLD_SCRIPT],
      [ProjectInitConstants.NEW_SCRIPT],
      "[3/8]"
    );

    // Remove App.tsx file
    fs.unlinkSync(path.join(projectDirectory, "App.tsx"));

    // Install dependencies
    await installPackages(
      PackageConstants.DEFAULT_PACKAGES,
      false,
      "Boilerplate",
      "[4/8]"
    );
    await installPackages(
      PackageConstants.DEFAULT_DEV_PACKAGES,
      true,
      "Boilerplate",
      "[5/8]"
    );

    const spinner = ora({
      text: `Linking assets...`,
      spinner: "aesthetic",
      prefixText: "[6/8]",
    }).start();
    // Linking assets
    execSync("npx react-native-asset", { stdio: "ignore" });
    spinner.succeed(`Assets linked`);
    // Setup permissions
    await SetupPermissions(projectDirectory, "[7/8]", "[8/8]");

    // Open project in VSCode
    execSync("code .", { stdio: "inherit" });

    Toast(ToastMessages.PROJECT_BUILD_SUCCESSFULL, ToastTypes.SUCCESS);
  } catch (error) {
    Toast(ToastMessages.PROJECT_BUILD_ERROR.format(error), ToastTypes.ERROR);
  }
};

// Entry point
const main = async () => {
  const cwd = process.cwd();
  if (
    !fs.existsSync(path.join(cwd, "android")) &&
    !fs.existsSync(path.join(cwd, "ios"))
  ) {
    const prompt = new Input({
      name: "projectName",
      message: "Enter project name:",
      validate(value) {
        return value ? true : "Project name is required.";
      },
    });
    const projectName = await prompt.run();

    const projectDirectory = path.join(cwd, projectName);

    // Create React Native project
    await createReactNativeProject(projectDirectory, projectName);
  } else {
    const projectName = path.basename(cwd);
    // Create React Native project
    await createReactNativeProject(cwd, projectName);
  }
};

main();
