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

  // Ensure environment variables are available in the browser
  const webpack = require('webpack');
  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.EXPO_PUBLIC_FIREBASE_API_KEY': JSON.stringify(process.env.EXPO_PUBLIC_FIREBASE_API_KEY),
      'process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN),
      'process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID': JSON.stringify(process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID),
      'process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET),
      'process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
      'process.env.EXPO_PUBLIC_FIREBASE_APP_ID': JSON.stringify(process.env.EXPO_PUBLIC_FIREBASE_APP_ID),
      'process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID),
      'process.env.EXPO_PUBLIC_RETELL_PUBLIC_KEY': JSON.stringify(process.env.EXPO_PUBLIC_RETELL_PUBLIC_KEY),
      'process.env.EXPO_PUBLIC_RETELL_AGENT_ID': JSON.stringify(process.env.EXPO_PUBLIC_RETELL_AGENT_ID),
      'process.env.EXPO_PUBLIC_RETELL_RECAPTCHA_KEY': JSON.stringify(process.env.EXPO_PUBLIC_RETELL_RECAPTCHA_KEY),
    })
  );

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
    vm: false, // Disable vm module for browser (used by asn1.js but not needed)
  };

  return config;
};

