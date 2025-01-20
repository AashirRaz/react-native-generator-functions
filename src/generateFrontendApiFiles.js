import axios from "axios";
import fs from "fs";
import path from "path";
import { ToastTypes } from "./Constants.js";
import { Toast } from "./Toast.js";
import ora from "ora";
import { execSync } from "child_process"; // Import child_process for running Prettier

// Function to check if the script is running from the root directory
function isRootDirectory() {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  return fs.existsSync(packageJsonPath);
}

// Function to find the base URL dynamically based on the environment in Api.ts
function getBaseUrl() {
  const apiFilePath = path.join(process.cwd(), "src", "constants", "Api.ts");
  if (!fs.existsSync(apiFilePath)) {
    Toast(
      "Please run the command in the root of your React project.",
      ToastTypes.ERROR
    );
  }

  const apiFileContent = fs.readFileSync(apiFilePath, "utf8");

  // Extract `env` value
  const envMatch = apiFileContent.match(
    /const\s+env:\s*['"].+['"]\s*=\s*['"](\w+)['"]/
  );
  if (!envMatch) {
    Toast(
      "The `env` variable is not defined in Api.ts. Please ensure the file defines an environment (e.g., DEV, QA, TEST, PROD).",
      ToastTypes.ERROR
    );
  }

  const env = envMatch[1];

  Toast(`Detected environment: ${env}`, ToastTypes.INFO);

  // Extract the corresponding base URL for the detected environment
  const baseUrlRegex = new RegExp(`${env}:\\s*['"]([^'"]+)['"]`);
  const baseUrlMatch = apiFileContent.match(baseUrlRegex);

  if (!baseUrlMatch || !baseUrlMatch[1]) {
    Toast(
      `Base URL for environment '${env}' not found in Api.ts. Ensure the file defines a URL for '${env}'.`,
      ToastTypes.ERROR
    );
  }

  return baseUrlMatch[1];
}

// File paths for saving responses
const filePaths = {
  requestTypes: path.join(process.cwd(), "src", "apis", "RequestTypes.ts"),
  responseTypes: path.join(process.cwd(), "src", "apis", "ResponseTypes.ts"),
  apiUrls: path.join(process.cwd(), "src", "constants", "ApiUrls.ts"),
};

// API endpoints
function getEndpoints(baseUrl) {
  return {
    generateRequestTypes: `${baseUrl}frontendcodegeneration/generate-request-types`,
    generateEnumsAndResponseTypes: `${baseUrl}frontendcodegeneration/generate-enums-and-response-types`,
    generateApiRoutes: `${baseUrl}frontendcodegeneration/generate-api-routes`,
  };
}

// Format all files at the end
function formatFilesWithPrettier(files) {
  try {
    const spinner = ora({
      text: "Formatting files with Prettier...",
      spinner: "aesthetic",
      prefixText: "[4/4]",
    }).start();
    execSync(`npx prettier --write ${files.join(" ")}`, { stdio: "ignore" });
    spinner.succeed("Files formatted successfully with Prettier");
  } catch (error) {
    Toast(
      `Error formatting files with Prettier: ${error.message}`,
      ToastTypes.ERROR
    );
  }
}

// Generator function to fetch and write data
async function* generateFiles(endpoints) {
  try {
    const spinner = ora({
      text: `Fetching Request Types data from API...`,
      spinner: "aesthetic",
      prefixText: "[1/4]",
    }).start();

    // Fetch data from each API
    const requestTypesResponse = await axios.get(
      endpoints.generateRequestTypes
    );
    spinner.succeed(
      "Request Types data fetched successfully & written to file"
    );

    yield { filePath: filePaths.requestTypes, data: requestTypesResponse.data };

    const spinner1 = ora({
      text: `Fetching Response Types data from API...`,
      spinner: "aesthetic",
      prefixText: "[2/4]",
    }).start();

    const responseTypesResponse = await axios.get(
      endpoints.generateEnumsAndResponseTypes
    );
    spinner1.succeed(
      "Response Types data fetched successfully & written to file"
    );
    yield {
      filePath: filePaths.responseTypes,
      data: responseTypesResponse.data,
    };

    const spinner2 = ora({
      text: `Fetching API Routes data from API...`,
      spinner: "aesthetic",
      prefixText: "[3/4]",
    }).start();

    const apiRoutesResponse = await axios.post(endpoints.generateApiRoutes);
    spinner2.succeed("API Routes data fetched successfully & written to file");
    yield { filePath: filePaths.apiUrls, data: apiRoutesResponse.data };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

// Main function: Generate Frontend Files
async function generateFrontendFiles() {
  if (!isRootDirectory()) {
    Toast(
      "Please run the command in the root of your React project.",
      ToastTypes.ERROR
    );
    process.exit(1);
  }

  let baseUrl;
  try {
    baseUrl = getBaseUrl();
  } catch (error) {
    process.exit(1);
  }

  Toast(`Using base URL: ${baseUrl}`, ToastTypes.INFO);

  const endpoints = getEndpoints(baseUrl);
  const generator = generateFiles(endpoints);

  const filesToFormat = [];

  for await (const { filePath, data } of generator) {
    try {
      fs.writeFileSync(filePath, data, "utf8");
      filesToFormat.push(filePath);
    } catch (error) {
      Toast(
        `Error writing to file ${filePath}: ${error.message}`,
        ToastTypes.ERROR
      );
    }
  }

  // Format all files in one go without logs
  formatFilesWithPrettier(filesToFormat);

  Toast(
    "Frontend files generated and formatted successfully!",
    ToastTypes.SUCCESS
  );
}

// Run the generator function
generateFrontendFiles();
