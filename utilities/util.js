const d3 = require('d3');

module.exports = {

    //CONSTANTS FOR THE TYPES
    types: {
        NUMBER: 'number',
        STRING: 'string',
        VARIABLE: 'variable',
        UNDEFINED: 'undefined'
    },

    //CONSTANTS FOR THE OPERATIONS
    operation: {
        SUM: 'sum',
        SUBSTRACTION: 'substraction',
        MULTIPLICATION: 'multiplication',
        DIVISION: 'division',
        EXP: 'exp',
        DECLARATION: 'declaration',
        SENTENCES: 'sentences',
        PRINT: 'print',
        REASSIGNMENT: 'reassignment'
    }
    
};