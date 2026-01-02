module.exports = function(api) {
  api.cache(true);
  
  // Check if building for web (webpack)
  const isWebpack = api.caller((caller) => {
    return caller && (caller.name === 'babel-loader' || caller.platform === 'web');
  });
  
  const plugins = ['nativewind/babel'];
  
  // react-native-reanimated plugin causes issues with webpack
  // Only include it for native builds
  if (!isWebpack) {
    plugins.push('react-native-reanimated/plugin');
  }
  
  return {
    presets: ['babel-preset-expo'],
    plugins: plugins,
  };
};

