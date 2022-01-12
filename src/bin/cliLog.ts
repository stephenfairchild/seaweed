import chalk from "chalk";

export function error(message: string): void {
    console.log(chalk.red(message));
    process.exit();
}

export function log(message: string): void {
    console.log(chalk.yellow(message));
}
