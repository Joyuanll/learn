const { getRepoList, getTagList } = require("./http");
// const ora = require("ora");
const inquirer = require("inquirer");
const util = require("util");
const downloadGitRepo = require("download-git-repo");
const path = require("path");

async function wrapLoading(fn, message, ...args) {
  // const spinner = ora(message);
  // spinner.start();
  try {
    const result = await fn(...args);
    // spinner.succeed();
    return result;
  } catch (err) {
    // spinner.fail("request failed, ", err);
    console.log("request failed, ", err);
  }
}

class Generator {
  constructor(name, targetDir) {
    this.name = name;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async getRepo() {
    const repoList = await wrapLoading(getRepoList, "waiting fetch template");
    if (!repoList) return;
    const repos = repoList.map((item) => item.name);
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "choose a template",
    });
    return repo;
  }

  async getTag(repo) {
    const repoList = await wrapLoading(
      getTagList,
      "waiting fetch template",
      repo
    );
    if (!repoList) return;
    const repos = repoList.map((item) => item.name);
    const { tag } = await inquirer.prompt({
      name: "tag",
      type: "list",
      choices: repos,
      message: "choose a tag",
    });
    return tag;
  }

  async download(repo, tag) {
    const requestUrl = `zhurong-cli/${repo}${tag ? "#" + tag : ""}`;
    await wrapLoading(
      this.downloadGitRepo,
      "loading template",
      requestUrl,
      path.resolve(process.cwd(), this.targetDir)
    );
  }

  async create() {
    const repo = await this.getRepo();
    const tag = await this.getTag(repo);
    await this.download(repo, tag);
    console.log("U choose this, repo = " + repo + "this version = " + tag);
  }
}

module.exports = Generator;
