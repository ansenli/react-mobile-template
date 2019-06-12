const { override, fixBabelImports,addLessLoader,addWebpackAlias } = require('customize-cra');
const rewireCssModules = require('react-app-rewire-css-modules');
const path = require("path");
process.env.GENERATE_SOURCEMAP = "false";
module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd-mobile',
     style: true,
   }),
   addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    "Components": path.resolve(__dirname, "src/Components"),
    "Container": path.resolve(__dirname, "src/Container"),
  }),
 );
