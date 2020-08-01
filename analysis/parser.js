const {Parser} = require('jison');

const grammar = {
    "lex": {
        "options": {
            "case-insensitive": true
        },

        "rules": [
            ["\\s+", "/* skip whitespace */"],
            ["VAR", "return 'VAR';"],
            ["CONSOLE", "return 'CONSOLE';"],
            ["LOG", "return 'LOG';"],
            ["[a-zA-Z]([a-zA-Z]|[0-9])*_?([a-zA-Z]|[0-9])*", "return 'IDENTIFIER';"],
            ["=", "return 'EQUAL';"],
            ["\\(", "return 'LPAREN';"],
            ["\\)", "return 'RPAREN';"],
            [";", "return 'SEMICOLON';"],
            ["\\+", "return 'PLUSSIGN';"],
            ["-", "return 'MINUSSIGN';"],
            ["\\*", "return 'PORSIGN';"],
            ["\\/", "return 'DIVISIONSIGN';"],
            ["\\d+", "return 'NUMBER';"],
            ["\"[^\\\"]*\"", "return 'CHAIN';"],
            ["$", "return 'EOF';"]
        ]
    },

    "bnf": {
        "expressions" :[[ "DECLARATION EOF",   "return $1;"  ]],

        "DECLARATION": [["VAR IDENTIFIER SEMICOLON", ""]]
    }
};

const parser = new Parser(grammar);

module.exports = function (text) {
    return parser.parse(text);
}