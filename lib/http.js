const axios = require("axios");

axios.interceptors.response.use((res) => {
  return res.data;
});

//.........上传远程仓库后再继续
