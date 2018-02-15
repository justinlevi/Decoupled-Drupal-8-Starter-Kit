const path = require('path')  // assuming you use cwd-relative paths in your NODE_PATH

module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    },
    "env": {
        "jest": true,
        "browser": true,
        "node": true,
    }
};

module.exports.settings = {
    "import/resolver": {
    node: { paths: 'src/' }
    }
}