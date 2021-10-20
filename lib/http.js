const axios = require("axios");

axios.interceptors.response.use((res) => {
  return res.data;
});

//.........上传远程仓库后再继续

async function getRepoList() {
  // return axios.get("https://api.github.com/Joyuanll/learn/repos");
  return axios.get("https://api.github.com/orgs/zhurong-cli/repos");
}

async function getTagList(repo) {
  // return axios.get(`https://api.github.com/Joyuanll/learn/${repo}/tags`);
  return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`);
}

module.exports = {
  getRepoList,
  getTagList,
};
