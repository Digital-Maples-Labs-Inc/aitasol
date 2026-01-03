module.exports = function(api) {
  api.cache(true);
  
  const plugins = ['nativewind/babel'];
  
  // react-native-reanimated plugin causes issues with webpack
  // Since we're primarily targeting web, exclude it for now
  // If you need it for native builds, you can conditionally add it
  // For web builds, this plugin is not needed and causes errors
  
  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};

