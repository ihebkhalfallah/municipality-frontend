const Dotenv = require('dotenv-webpack');

module.exports = {
  // ...existing code...
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
    },
  },
  plugins: [
    // ...existing plugins...
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: false, // Load .env.example (defaults to "false" which does not use dotenv-safe)
      systemvars: true, // Load all system variables as well (useful for CI purposes)
      silent: true, // Hide any errors
    }),
  ],
  // ...existing code...
};
