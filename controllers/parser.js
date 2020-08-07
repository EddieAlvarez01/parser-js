const parser = require('../analysis/parser');
const util = require('../utilities/util');
const Declaration = require('../models/Declaration');
const Operation = require('../models/Operation');
const Print = require('../models/Print');
const SymbolTable = require('../models/SymbolTable');
const Error = require('../models/Error');

const controller = {
    index: (req, res) => {
        res.render('index', {
            data: req.data
        });
    },

    compile: async (req, res, next) => {
        const {txt} = req.body;
        if (txt === "" || txt === undefined) {
            req.data = {
                status: 'error',
                message: 'No se ha proveido ningún texto' 
            };
            return next();
        }
        try{
            const root = parser.parse(txt);   //JISON
            const instructions = MapInstruccions(root);
            const output = ExecuteCode(instructions);
            let message = '';
            output.forEach(item => {
                message += item + '\n';
            });
            req.data = {
                status: 'success',
                message: message 
            };
            return next();
        }catch(error){
            console.log(error);
            req.data = {
                status: 'error',
                message: parseErrors(error.hash)
            };
            return next();
        }
    }
};

//CONVERT JISON ERRORS TO TEXT 
function parseErrors(hash){
    let text = `Error '${hash.text}' token ${hash.token} en la linea ${hash.line} se esperaba`;
    hash.expected.forEach(item => {
        text += ` ${item}`;
    });
    return text;
}

//RETURN INSTRUCTIONS LIST
function MapInstruccions(root) {
    const intruccions = [];
    root.childs.forEach(item => {
        intruccions.push(RecognizeInstruction(item));
    });
    return intruccions;
}

//RETURN INSTRUCTION INSTANCE
function RecognizeInstruction(node) {
    switch(node.operation){
        case util.operation.DECLARATION:
            if (node.childs.length > 0){
                return new Declaration(node.value, ResolveExpression(node.childs[0].childs[0]));
            }else{
                return new Declaration(node.value, '');
            }
        case util.operation.PRINT:
            return new Print(ResolveExpression(node.childs[0].childs[0]));
        default:
            return null;
    }
}

//RETURN EXPRESSION
function ResolveExpression(node) {
    let leftOperator;
    let rightOperator;
    switch(node.operation){
        case util.operation.SUM:
            leftOperator = ResolveExpression(node.childs[0]);
            rightOperator = ResolveExpression(node.childs[1]);
            return Operation.NewOperation(leftOperator, rightOperator, util.operation.SUM);
        case util.operation.SUBSTRACTION:
            leftOperator = ResolveExpression(node.childs[0]);
            rightOperator = ResolveExpression(node.childs[1]);
            return Operation.NewOperation(leftOperator, rightOperator, util.operation.SUBSTRACTION);
        case util.operation.MULTIPLICATION:
            leftOperator = ResolveExpression(node.childs[0]);
            rightOperator = ResolveExpression(node.childs[1]);
            return Operation.NewOperation(leftOperator, rightOperator, util.operation.MULTIPLICATION);
        case util.operation.DIVISION:
            leftOperator = ResolveExpression(node.childs[0]);
            rightOperator = ResolveExpression(node.childs[1]);
            return Operation.NewOperation(leftOperator, rightOperator, util.operation.DIVISION);
        case util.types.NUMBER:
            return Operation.NewOperationValue(util.types.NUMBER, node.value);
        case util.types.STRING:
            return Operation.NewOperationValue(util.types.STRING, node.value);
        default:
            return Operation.NewOperationValue(util.types.VARIABLE, node.value);
    }
}

//EXECUTE CODE INSTRUCTION BY INSTRUCTION
function ExecuteCode(instructions) {
    
    //GLOBAL SYMBOL TABLE
    const st = new SymbolTable();
    
    //OUTPUT
    const output = [];

    for (var item of instructions){
        const result = item.execute(st);
        if (result instanceof Error){
            console.log(st);
            output.push(result.value);
            return output;
        }
        if (result !== null) {
            output.push(result);
        }
    }
    return output;
}

module.exports = controller;