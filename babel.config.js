// console.log('config executed')
// module.exports = function (api) {
//     const presets = [
//         '@babel/preset-env',
//         '@babel/preset-react',
//       ];
//     const plugins = [
//         '@babel/plugin-proposal-class-properties',
//         'transform-es2015-modules-commonjs',
//         'babel-plugin-dynamic-import-node',
//     ];
    
//     api.cache(true);
      
//     return {
//         presets,
//         plugins
//         };
// }
// const config = {
//     presets: [
//         '@babel/preset-env',
//         '@babel/preset-react',
//       ],
//       env: {
//         test: {
//           presets: [
//             '@babel/preset-env',
//             '@babel/preset-react',
//           ],
//           plugins: [
//             '@babel/plugin-proposal-class-properties',
//             'transform-es2015-modules-commonjs',
//             'babel-plugin-dynamic-import-node',
//           ],
//         },
//       },
//     }
// export default config;

// const config = {
//   babelrc: false,
//   presets: [
//     [
//       "@babel/env",
//       {
//         modules: false
//       }
//     ],
//     "@babel/react"
//   ],
//   plugins: [
//     // ["@babel/plugin-proposal-decorators", { legacy: true }],
//     ["@babel/plugin-proposal-class-properties", { loose: true }],
//     // "transform-es2015-modules-commonjs"
//   ]
// }
// module.exports = require("babel-jest").createTransformer(config);

// {
//   "plugins": [
//     "lodash"
//   ],
//   "env": {
//     "test": {
//       "presets": [
//         "env",
//         "react"
//       ]
//     }
//   }
// }

// removed babel-runtime 6.26.0 
// removed "@babel/runtime": "^7.0.0-beta.54",
// removed "babel-preset-env": "^1.7.0",
// removed "babel-preset-meteor": "^7.1.6",
// removed     "@babel/plugin-proposal-class-properties": "^7.1.0",
// removed     "babel-preset-react": "^6.24.1",
// added   "@babel/preset-react": "^7.0.0",
// added "@babel/runtime": "^7.1.5"
// added "babel-core": "^7.0.0-bridge.0",
// added @babel/plugin-proposal-class-properties
// removed jest.config.js in favour of jest config in package.json

/**
 *   "jest": {
    "setupTestFrameworkScriptFile": "<rootDir>/tests/setup.js",
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/mocks/fileMock.js",
      "\\.(scss|css|less)$": "<rootDir>/tests/mocks/styleMock.js"
    }
  }
 */