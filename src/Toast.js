import chalk from "chalk";
import { ToastTypes } from "./Constants.js";

export function Toast(Message, Type) {
  if (Type === ToastTypes.ERROR) {
    console.log(chalk.redBright.bold("Error ") + Message);
  } else if (Type === ToastTypes.INFO) {
    console.log(chalk.yellowBright.bold("Info ") + Message);
  } else if (Type === ToastTypes.SUCCESS) {
    console.log(chalk.greenBright.bold("Success ") + Message);
  } else {
    console.log(chalk.blueBright.bold("Unknown ") + Message);
  }
}
