module.exports = {
    "env": {
        "browser": false,
        "node": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 6
    },
    "extends": "eslint:recommended",
    "globals": {
    },
    "rules": {

        "no-trailing-spaces": "error",
        "brace-style": ["warn", "stroustrup", { "allowSingleLine": true }],
        "no-multi-spaces": ['warn'], // <--- no-multi-spaces removes consecutive spaces when brace-style-fix leaves indentation as-is
        
        "comma-spacing": ["warn", { "before": false, "after": true }],
        "keyword-spacing": "warn",
        "no-multiple-empty-lines": ["warn", {"max": 1}],
        "semi-spacing": ["warn", {"before": false, "after": true}],
        "space-before-blocks": "warn",
        "space-infix-ops": "warn",
        "indent": ["warn", 2],

        //// Proposed rules:
        "quotes": ["warn", "single"],

        // currently not in use (but might be handy):
        "curly": ["warn", "multi-line"], //, "multi-or-nest"],
        // "object-curly-newline": ["error", {"ObjectExpression": {multiline: true}}],
        "space-before-function-paren": "warn",

        // adjust inherited rules:
        "no-empty": ["error", { "allowEmptyCatch": true }],


        /// RULES STILL IN PULL-REQUEST STATE
        // "padding-line-between-statements": [
        //     "error", 
        //     { "blankLine": "always", "prev": "*", "next": "function"}
        // ],

        // disable unwanted rules:
        "no-unused-vars": "warn",
        "no-console": "off"
    }
};