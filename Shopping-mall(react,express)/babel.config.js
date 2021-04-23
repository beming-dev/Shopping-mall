module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    loaders:[
        loader:'babel-loader',
    ],
    plugins: [
      [
        'module-resolver',
        {
          "root": ['./src'],
          "alias": {
            "@": "./src",
            "#components":"./src/components"
          }
        },
      ],
    ],
  }