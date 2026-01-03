module.exports = function(api) {
  api.cache(true);
  
  // Minimal config - NativeWind not used in codebase, removed to fix webpack errors
  return {
    presets: ['babel-preset-expo'],
  };
};

