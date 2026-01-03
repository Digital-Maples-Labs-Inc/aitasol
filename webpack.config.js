/**
 * Webpack configuration for Expo web builds
 * Extends @expo/webpack-config to add path aliases and Node polyfills
 */

const createWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createWebpackConfigAsync(env, argv);

  // Add path aliases to match tsconfig.json
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
    '@/components': path.resolve(__dirname, 'src/components'),
    '@/screens': path.resolve(__dirname, 'src/screens'),
    '@/services': path.resolve(__dirname, 'src/services'),
    '@/types': path.resolve(__dirname, 'src/types'),
    '@/utils': path.resolve(__dirname, 'src/utils'),
    '@/hooks': path.resolve(__dirname, 'src/hooks'),
    '@/contexts': path.resolve(__dirname, 'src/contexts'),
  };

  // Add Node polyfills for browser
  // Try to use polyfills if installed, otherwise disable
  let cryptoPolyfill = false;
  let streamPolyfill = false;
  let bufferPolyfill = false;
  
  try {
    cryptoPolyfill = require.resolve('crypto-browserify');
  } catch (e) {
    console.log('crypto-browserify not installed, using fallback');
  }
  
  try {
    streamPolyfill = require.resolve('stream-browserify');
  } catch (e) {
    console.log('stream-browserify not installed, using fallback');
  }
  
  try {
    bufferPolyfill = require.resolve('buffer');
  } catch (e) {
    console.log('buffer not installed, using fallback');
  }
  
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: cryptoPolyfill,
    stream: streamPolyfill,
    buffer: bufferPolyfill,
  };

  return config;
};

