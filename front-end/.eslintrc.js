const path = require('path')  // assuming you use cwd-relative paths in your NODE_PATH

module.exports = {
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
        "jest": true
    }
};

module.exports.settings = {
    "import/resolver": {
    node: { paths: process.env.NODE_PATH.split(":").map(path.resolve) }
    }
}