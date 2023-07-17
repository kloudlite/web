/** @type { import('@storybook/react-vite').StorybookConfig } */
import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mergeConfig } from "vite"

const config = {
  stories: [
    "../book/**/*.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
      },
    },
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "~/components": path.resolve(__dirname, '../components'),
        },
      },
    })
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
