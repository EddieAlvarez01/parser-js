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
            ["\\.", "return 'POINT';"],
            ["\\+", "return 'PLUSSIGN';"],
            ["-", "return 'MINUSSIGN';"],
            ["\\*", "return 'PORSIGN';"],
            ["\\/", "return 'DIVISIONSIGN';"],
            ["\\d+", "return 'NUMBER';"],
            ["\"[^\\\"]*\"", "return 'CHAIN';"],
            ["$", "return 'EOF';"]
        ]
    },

    "operators": [
        ["left", "PLUSSIGN", "MINUSSIGN"],
        ["left", "PORSIGN", "DIVISIONSIGN"]
    ],

    "bnf": {
        "expressions" :[[ "LSENTENCES EOF",   "return $1;"  ]],

        "LSENTENCES": [["LSENTENCES SENTENCES", ""],
                        ["SENTENCES", ""]],

        "SENTENCES": [["DECLARATION", ""],
                    ["PRINT", ""]],

        "DECLARATION": [["VAR IDENTIFIER ASSIGNMENT", ""]],

        "ASSIGNMENT": [["SEMICOLON", ""],
                        ["EQUAL EXP SEMICOLON", ""]],

        "PRINT": [["CONSOLE POINT LOG LPAREN EXP RPAREN SEMICOLON", ""]],
        
        "EXP": [["EXP PLUSSIGN EXP", ""],
                ["EXP MINUSSIGN EXP", ""],
                ["EXP PORSIGN EXP", ""],
                ["EXP DIVISIONSIGN EXP", ""],
                ["LPAREN EXP RPAREN", ""],
                ["NUMBER", ""],
                ["IDENTIFIER", ""],
                ["CHAIN", ""]]
    }
};

const parser = new Parser(grammar);

module.exports = function (text) {
    return parser.parse(text);
}