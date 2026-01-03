// Minimal Babel config without NativeWind (for testing)
// If this works, the issue is with NativeWind plugin
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

