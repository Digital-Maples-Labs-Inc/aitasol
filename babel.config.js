module.exports = function(api) {
  // Cache configuration - must be called once
  api.cache(true);
  
  // Check if building for web (webpack) - check caller before using it
  let isWebpack = false;
  try {
    const caller = api.caller((caller) => caller);
    isWebpack = caller && (caller.name === 'babel-loader' || caller.platform === 'web');
  } catch (e) {
    // If caller check fails, assume not webpack
    isWebpack = false;
  }
  
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

