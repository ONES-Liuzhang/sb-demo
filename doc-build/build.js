#!/usr/bin/env node
const { buildStatic } = require("@storybook/core/server");
const reactOptions = require("@storybook/react/dist/cjs/server/options").default;

const locale = process.env.LOCALE;

buildStatic({
  ...reactOptions,
  outputDir: `./temp/${locale}`,
}).catch((err) => {
  throw new Error("编译报错:", err);
});
