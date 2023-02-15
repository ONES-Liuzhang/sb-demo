const childProcess = require("child_process");
const path = require("path");

function exec(filePath, options) {
  return new Promise((resolve, reject) => {
    childProcess.execFile("node", [path.resolve(__dirname, filePath)], options, (err, stdout, stderr) => {
      if (err) {
        return reject();
      }

      return resolve();
    });
  });
}

Promise.all([
  exec("./build.js", {
    env: {
      ...process.env,
      LOCALE: "",
    },
  }),
  exec("./build.js", {
    env: {
      ...process.env,
      LOCALE: "zh_CN",
    },
  }),
])
  .then(() => {
    console.log("结束");
  })
  .catch((err) => {
    console.log("err", err);
  });
