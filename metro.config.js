const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  const { resolver } = config;

  config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
  config.resolver.assetExts = resolver.assetExts.filter((ext) => ext !== 'svg');
  config.resolver.sourceExts = [...resolver.sourceExts, 'svg'];

  return config;
})();
