import fs from "fs";
import path from "path";
import { Toast } from "./Toast.js";
import { ToastMessages, ToastTypes, Structure } from "./Constants.js";
import pkg from "enquirer";
const { Input } = pkg;

const fileExtensions = [".tsx", "Container.ts", "types.ts"];

const fileNamesArray = [];

function createFolderIfNotExists(folderName) {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true });
    return true;
  }
  Toast(
    ToastMessages.FOLDER_ALREADY_EXISTS.format(folderName),
    ToastTypes.INFO
  );
  return false;
}

function createFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  Toast(ToastMessages.FILE_ALREADY_EXISTS.format(filePath), ToastTypes.INFO);
  return false;
}

function createFiles() {
  if (fileNamesArray.length === 0) {
    Toast(ToastMessages.FILE_NAME_NOT_PROVIDED, ToastTypes.INFO);
    return;
  }

  fileNamesArray.forEach((fileName) => {
    if (fileName.includes(" ")) {
      Toast(
        ToastMessages.FILE_NAME_SPACES_ERROR.format(fileName),
        ToastTypes.INFO
      );
      return;
    }

    const fileBasename = path.basename(fileName, path.extname(fileName));
    const capitalBaseName =
      fileBasename.charAt(0).toUpperCase() + fileBasename.slice(1);
    const folderName = fileBasename;

    if (!createFolderIfNotExists(folderName)) return;

    const componentContent = Structure.COMPONENT_FILE.format(
      fileBasename,
      capitalBaseName
    );
    const containerContent = Structure.CONTAINER_FILE.format(capitalBaseName);

    fileExtensions.forEach((extension) => {
      let content = "";
      if (extension === "Container.ts") {
        content = containerContent;
      } else if (extension === ".tsx") {
        content = componentContent;
      }
      createFileIfNotExists(
        path.join(
          folderName,
          `${extension === "types.ts" ? "types.ts" : fileBasename}${
            extension === "types.ts" ? "" : extension
          }`
        ),
        content
      );
    });

    Toast(
      ToastMessages.FILE_CREATING_SUCCESS.format(fileBasename),
      ToastTypes.SUCCESS
    );
  });
}

async function promptFileName() {
  const prompt = new Input({
    name: "fileName",
    message: "Enter file name (leave blank or enter space to finish):",
  });

  try {
    const fileName = await prompt.run();
    const trimmedFileName = fileName.trim();
    if (trimmedFileName && trimmedFileName !== " ") {
      fileNamesArray.push(trimmedFileName);
      promptFileName(); // Continue prompting for more file names
    } else {
      createFiles(); // Call the function to create files
    }
  } catch (error) {
    console.error("Error prompting for file name:", error);
  }
}

async function main() {
  await promptFileName();
}

main();
