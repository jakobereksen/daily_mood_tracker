module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true,
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
      "indent": [
        "error","tab"
      ],
      "linebreak-style": [
        "error","unix"
      ],
      "quotes": [
        "error","double"
      ],
      "semi": [
        "error","always"
      ]  
    }};
