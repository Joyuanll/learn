#! /usr/bin/env node
// import ora from "ora";
const program = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const spawn = require("cross-spawn");
const createFile = require("../lib/create");
const figlet = require("figlet");
// // 自定义文本信息
// const message = "Loading unicorns";
// // 初始化
// const spinner = ora(message);
// // 开始加载动画
// spinner.start();

// setTimeout(() => {
//   spinner.color = "red";
//   spinner.text = "Loading rainbows";

//   setTimeout(() => {
//     spinner.stop(); // 停止
//     spinner.succeed("Loading succeed");
//   }, 2000);
// }, 2000);

const dependencies = ["react", "react-router", "react-dom"];
// const child = spawn("yarn", ["add"].concat(dependencies), { stdio: "inherit" });

// child.on("close", (code) => {
//   if (code !== 0) {
//     console.log(chalk.red("ERROR YARN MODU"));
//     process.exit(1);
//   } else {
//     console.log(chalk.blue("PASS"));
//   }
// });

program
  .command("create <name>")
  .description(chalk.blue("Now, Create you project!"))
  .option("-f,--force", "Overwrite target directory if it exist!")
  .action((name, options) => {
    console.log(
      "Your project name is " + chalk.red(JSON.stringify(name)),
      "this options is " + chalk.red(JSON.stringify(options))
    );
    createFile(name, options);
  });

program
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");

// 配置 config 命令
program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <path>", "get value from option")
  .option("-s, --set <path> <value>")
  .option("-d, --delete <path>", "delete option from config")
  .action((value, options) => {
    console.log(value, options);
  });

// 配置 ui 命令
program
  .command("ui")
  .description("start add open roc-cli ui")
  .option("-p, --port <port>", "Port used for the UI Server")
  .action((option) => {
    console.log(option);
  });

program.on("--help", () => {
  console.log(
    `\r\nRun ${chalk.cyan(
      `cli-t <command> --help`
    )} for detailed usage of given command\r\n`
  );
});

program.on("--help", () => {
  // 使用 figlet 绘制 Logo
  console.log(
    "\r\n" +
      figlet.textSync("Joyuan", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
  );
  // 新增说明信息
  console.log(
    `\r\nRun ${chalk.cyan(`cli-t <command> --help`)} show details\r\n`
  );
});

// inquirer
//   .prompt([
//     {
//       type: "input",
//       name: "name",
//       message: "who are you",
//       default: "A",
//     },
//   ])
//   .then((res) => {
//     console.log(chalk.green(JSON.stringify(res)));
//     program.parse(process.argv);
//   });

program.parse(process.argv);
