const fs = require("fs-extra");
const inquirer = require("inquirer");
const path = require("path");
const Generator = require("./generator");

module.exports = async function(name, options) {
  const cwd = process.cwd();
  const targetAir = path.join(cwd, name);
  console.log(
    ">>>>>>>>>>>>>CREATE",
    name,
    options,
    options.force,
    fs.existsSync(targetAir)
  );
  if (fs.existsSync(targetAir)) {
    if (options.force) {
      await fs.remove(targetAir);
    } else {
      let { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "文件已存在是否覆盖",
          choices: [
            {
              name: "覆盖",
              value: "yes",
            },
            {
              name: "不覆盖",
              value: "no",
            },
          ],
        },
      ]);
      if (action === "yes") {
        await fs.remove(targetAir);
      }
    }
  }

  const generator = new Generator(name, targetAir);
  generator.create();
};
