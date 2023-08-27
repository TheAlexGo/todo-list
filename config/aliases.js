const path = require('path');

const main = {
    '@components': path.resolve(__dirname, '../src/components'),
    '@features': path.resolve(__dirname, '../src/features'),
    '@providers': path.resolve(__dirname, '../src/providers'),
    '@services': path.resolve(__dirname, '../src/services'),
    '@pages': path.resolve(__dirname, '../src/pages'),
    '@utils': path.resolve(__dirname, '../src/utils'),
    '@hooks': path.resolve(__dirname, '../src/hooks'),
};

const styles = {
    '@styles': path.resolve(__dirname, '../src/styles'),
    '@static': path.resolve(__dirname, '../src/static'),
    '@icons': path.resolve(__dirname, '../src/static/icons'),
    '@fonts': path.resolve(__dirname, '../src/static/fonts'),
};

const types = {
    '@types': path.resolve(__dirname, '../src/types.ts'),
};

exports.main = main;
exports.styles = styles;
exports.types = types;
