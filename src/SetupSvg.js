/**
 * # Icon Component Setup Guide
 *
 * This guide will help you set up your React Native project to use SVG icons with the `Icon` component defined in this file.
 *
 * ## Steps to Setup SVG Support
 *
 * ### 1. Install `react-native-svg`
 *
 * Run the following command to add the `react-native-svg` package:
 *
 * ```sh
 * yarn add react-native-svg
 * ```
 *
 * ### 2. Install `react-native-svg-transformer`
 *
 * Run the following command to add the `react-native-svg-transformer` package as a development dependency:
 *
 * ```sh
 * yarn add react-native-svg-transformer --dev
 * ```
 *
 * ### 3. Configure Metro Bundler
 *
 * Transform your `metro.config.js` to enable the SVG transformer. Add the following configuration:
 *
 * ```javascript
 * const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
 *
 * const defaultConfig = getDefaultConfig(__dirname);
 * const {assetExts, sourceExts} = defaultConfig.resolver;
 *
 * /**
 *  * Metro configuration
 *  * https://facebook.github.io/metro/docs/configuration
 *  *
 *  * @type {import('metro-config').MetroConfig}
 *  *\/
 * const config = {
 *   transformer: {
 *     babelTransformerPath: require.resolve('react-native-svg-transformer'),
 *   },
 *   resolver: {
 *     assetExts: assetExts.filter(ext => ext !== 'svg'),
 *     sourceExts: [...sourceExts, 'svg'],
 *   },
 * };
 *
 * module.exports = mergeConfig(defaultConfig, config);
 * ```
 *
 * ### 4. Create TypeScript Declarations File
 *
 * Create a file named `declarations.d.ts` in the root of your project and add the following content to it:
 *
 * ```typescript
 * declare module '*.svg' {
 *   import React from 'react';
 *   import {SvgProps} from 'react-native-svg';
 *   const content: React.FC<SvgProps>;
 *   export default content;
 * }
 * ```
 *
 * ### 5. Clear Metro Cache
 *
 * Before running your React Native project, clear the Metro bundler cache with the following command:
 *
 * ```sh
 * yarn start --reset-cache
 * ```
 *
 * After following these steps, you can use the `Icon` component to display SVG icons in your React Native application.
 */
