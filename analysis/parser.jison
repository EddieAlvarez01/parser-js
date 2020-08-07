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
    |SENTENCES  { $$ = new ParserNode(0, util.operation.SENTENCES, util.operation.SENTENCES); $$.Add($1); };

SENTENCES
    : DECLARATION { $$ = $1; }
    | PRINT { $$ = new ParserNode(0, util.operation.PRINT, util.operation.PRINT); $$.Add($1); };

DECLARATION
    : VAR IDENTIFIER ASSIGNMENT { $$ = new ParserNode(0, util.operation.DECLARATION, $2); if($3 != null){ $$.Add($3); } };

ASSIGNMENT
    : SEMICOLON { $$ = null; }
    | EQUAL EXP SEMICOLON { $$ = new ParserNode(0, util.operation.EXP, util.operation.EXP); $$.Add($2); };

PRINT
    : CONSOLE POINT LOG LPAREN EXP RPAREN SEMICOLON { $$ = new ParserNode(0, util.operation.EXP, util.operation.EXP); $$.Add($5); };

EXP
    : EXP PLUSSIGN EXP { $$ = new ParserNode(0, util.operation.SUM, util.operation.SUM); $$.Add($1); $$.Add($3); }
    | EXP MINUSSIGN EXP { $$ = new ParserNode(0, util.operation.SUBSTRACTION, util.operation.SUBSTRACTION); $$.Add($1); $$.Add($3); }
    | EXP PORSIGN EXP { $$ = new ParserNode(0, util.operation.MULTIPLICATION, util.operation.MULTIPLICATION); $$.Add($1); $$.Add($3); }
    | EXP DIVISIONSIGN EXP { $$ = new ParserNode(0, util.operation.DIVISION, util.operation.DIVISION); $$.Add($1); $$.Add($3); }
    | LPAREN EXP RPAREN { $$ = $2; }
    | NUMBER { $$ = new ParserNode(0, util.types.NUMBER, Number($1)); }
    | IDENTIFIER { $$ = new ParserNode(0, util.types.VARIABLE, $1); }
    | CHAIN { $$ = new ParserNode(0, util.types.STRING, $1.substring(1, $1.length - 1)); };