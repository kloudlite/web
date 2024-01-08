import path from "path"
import { mergeConfig } from "vite"
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
      }
    }
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "~/components": path.resolve(__dirname, '../components'),
        },
      },
    })
  },
  stories: ['../book/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen-typescript', // or false if you don't need docgen at all
    skipBabel: true,
    check: false,
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
