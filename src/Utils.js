import { spawn } from "child_process";
import fs from "fs";
import ora from "ora";
import path from "path";

export async function replaceFileContent(
  filePath,
  identifiers,
  replacements,
  prefixText = ""
) {
  const baseName = path.basename(filePath);
  const spinner = ora({
    text: `Replacing content in ${baseName}...`,
    spinner: "aesthetic",
    prefixText,
  }).start();

  try {
    // Read the original file content asynchronously
    let originalContent = await fs.promises.readFile(filePath, "utf8");

    // Perform replacements
    for (let i = 0; i < identifiers.length; i++) {
      originalContent = originalContent.replace(
        identifiers[i],
        replacements[i]
      );
    }

    // Write the modified content back to the file asynchronously
    await fs.promises.writeFile(filePath, originalContent, "utf8");

    spinner.succeed(`Content replaced in ${baseName}`);

    return true;
  } catch (error) {
    spinner.fail(`Error replacing content in ${baseName}`);
    // console.error(`Error replacing content in file ${filePath}: ${error}`);
    return false;
  }
}

export function installPackages(
  packages,
  dev = false,
  text = "",
  prefixText = ""
) {
  return new Promise((resolve, reject) => {
    const spinner = ora({
      text: `Installing ${dev ? "dev " : ""}packages...`,
      spinner: "aesthetic",
      suffixText: `~ For ${text}`,
      prefixText,
    }).start();
    const yarnArgs = ["add", ...(dev ? ["--dev"] : []), ...packages];

    const yarnProcess = spawn("yarn", yarnArgs, { stdio: "ignore" });

    yarnProcess.on("error", (error) => {
      spinner.fail(`Error installing ${dev ? "dev " : ""}packages`);
      console.log("error", error);
      reject(false);
    });

    yarnProcess.on("close", () => {
      spinner.succeed(`${dev ? "Dev " : ""}Packages installed`);
      // Toast(ToastMessages.PACKAGES_INSTALLED, ToastTypes.INFO);
      resolve(true);
    });
  });
}

export function copyFile(source, destination) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);

    readStream.on("error", reject);
    writeStream.on("error", reject);
    writeStream.on("finish", resolve);

    readStream.pipe(writeStream);
  });
}
