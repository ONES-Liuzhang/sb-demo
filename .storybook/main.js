const isDev = process.env.NODE_ENV !== "production";

const defaultLocalConfig = {
  id: "en_US",
  name: "英文",
  suffix: "_US",
};

const locales = [
  defaultLocalConfig,
  {
    id: "zh_CN",
    name: "中文",
    suffix: "_CN",
  },
];

const currentLocaleId = process.env.LOCALE ?? "zh_CN";
const currentLocale = currentLocaleId
  ? locales.find((localeConf) => {
      return localeConf.id?.toLowerCase() === currentLocaleId.toLowerCase();
    })
  : defaultLocalConfig;

const stories = isDev ? ["../src/**/*.stories.mdx"] : [`../src/**/*${currentLocale.suffix ?? ""}.stories.mdx`];

module.exports = {
  stories: stories,
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true, // 关闭 Storybook 的匿名信息收集
  },
  outputDir: "docs",
  // addons.addConfig({ refs })
  refs: () => {
    return {
      ["v2.x"]: {
        title: "ones-design",
        url: "https://bangwork.github.io/ones-design",
      },
    };
  },
  // preview webpack config
  webpackFinal: async (config, { configType }) => {
    if (configType === "development") return config;

    // output
    const storybookFilename = config.output.filename;
    const arr = storybookFilename.split(".");
    arr[2] = `${arr[2]}${currentLocale.suffix}`;
    config.output.filename = arr.join(".");

    // 1. 共用 public
    // 2. 共用 static/css、staric/media、static/xxx
    console.log("webpack config ", config);

    return config;
  },
  // managerWebpackConfig
  managerWebpack: (config, { configType }) => {
    if (configType === "development") return config;

    // output
    const storybookFilename = config.output.filename;
    const arr = storybookFilename.split(".");
    arr[2] = `${arr[2]}${currentLocale.suffix}`;
    config.output.filename = arr.join(".");

    // 1. 共用 public
    // 2. 共用 static/css、staric/media、static/xxx
    console.log("webpack config ", config);

    return config;
  },
};
