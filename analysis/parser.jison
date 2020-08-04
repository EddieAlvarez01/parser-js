%{
    const ParserNode = require('../models/ParserNode');
    const util = require('../utilities/util');
%}

/* lexical grammar */
%lex
%options case-insensitive
%%
\s+                   /* skip whitespace */
"VAR"                 return 'VAR';
"CONSOLE"             return 'CONSOLE';
"LOG"                 return 'LOG';
[a-zA-Z]([a-zA-Z]|[0-9])*"_"?([a-zA-Z]|[0-9])*    return 'IDENTIFIER';
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
"="                   return 'EQUAL';
"("                   return 'LPAREN';
")"                   return 'RPAREN';
";"                   return 'SEMICOLON';
"."                   return 'POINT';
"*"                   return 'PORSIGN';
"/"                   return 'DIVISIONSIGN';
"-"                   return 'MINUSSIGN';
"+"                   return 'PLUSSIGN';
\d+                   return 'NUMBER';
"\""[^"\""]*"\""      return 'CHAIN';
<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left 'PLUSSIGN' 'MINUSSIGN'
%left 'PORSIGN' 'DIVISIONSIGN'

%start expressions

%% /* language grammar */

expressions
    : LSENTENCES EOF { return $1; };

LSENTENCES
    : LSENTENCES SENTENCES { $$ = $1; $$.Add($2); }
    |SENTENCES  { $$ = new ParserNode(0, 'sentences', 'sentences'); $$.Add($1); };

SENTENCES
    : DECLARATION { $$ = $1; }
    | PRINT {  };

DECLARATION
    : VAR IDENTIFIER ASSIGNMENT { $$ = new ParserNode(0, 'declaration', $2); if($3 != null){ $$.Add($3); } };

ASSIGNMENT
    : SEMICOLON { $$ = null; }
    | EQUAL EXP SEMICOLON { $$ = new ParserNode(0, 'exp', 'exp'); $$.Add($2); };

PRINT
    : CONSOLE POINT LOG LPAREN EXP RPAREN {  };

EXP
    : EXP PLUSSIGN EXP { }
    | EXP MINUSSIGN EXP { }
    | EXP PORSIGN EXP { }
    | EXP DIVISIONSIGN EXP { }
    | LPAREN EXP RPAREN { }
    | NUMBER {}
    | IDENTIFIER {}
    | CHAIN { $$ = new ParserNode(0, util.types.STRING, $1); };