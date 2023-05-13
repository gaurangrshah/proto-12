/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  pluginSearchDirs: false // disable auto-loading of plugins becaues of priority loading of plugins.
};

module.exports = config;
