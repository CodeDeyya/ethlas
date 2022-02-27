const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
]);

const nextConfig = {
  webpack: (config, { dev, webpack }) => {
    // SVG Loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
  },

  env: {
    CANVAS_RENDERER: JSON.stringify(true),
    WEBGL_RENDERER: JSON.stringify(true),
  },
};

module.exports = withTM(nextConfig);
