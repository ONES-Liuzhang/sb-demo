export const parameters = {

  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// https://storybook.js.org/docs/react/essentials/toolbars-and-globals
// globals 配置
export const globalTypes = {
  locale: {
    name: "Locale",
    description: "国际化",
    defaultValue: "zhHans",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", right: "🇺🇸", title: "English" },
        { value: "ja", right: "🇯🇵", title: "日本語" },
        { value: "zhHans", right: "🇨🇳", title: "简体中文" },
      ],
    },
  },
};

// https://storybook.js.org/docs/react/writing-stories/decorators
// 导出全局装饰器，会包裹所有 Story
const withLocalProvider = (Story, context) => {
  return <Story />;
};

export const decorators = [];
