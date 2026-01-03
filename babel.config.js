module.exports = function(api) {
  api.cache(true);
  
  // Detect if we're building for web
  const isWeb = process.env.EXPO_PUBLIC_PLATFORM === 'web' || 
                process.env.BABEL_ENV === 'web' ||
                (api.caller && api.caller((caller) => caller?.name === 'babel-loader'));
  
  const plugins = [
    'nativewind/babel',
  ];
  
  // react-native-reanimated plugin causes issues with webpack
  // Only include it for native builds
  if (!isWeb) {
    plugins.push('react-native-reanimated/plugin');
  }
  
  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};

