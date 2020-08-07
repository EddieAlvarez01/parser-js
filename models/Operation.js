const util = require('../utilities/util');
const Error = require('../models/Error');

class Operation {

    leftOperation;
    rightOperation;
    value;
    type;

    constructor(leftOperation, rightOperation, type, value){
        this.leftOperation = leftOperation;
        this.rightOperation = rightOperation;
        this.type = type;
        this.value = value;
    }

    static NewOperation(leftOperation, rightOperation, type){
        return new Operation(leftOperation, rightOperation, type, '');
    }

    static NewOperationValue(type, value){
        return new Operation(null, null, type, value);
    }

    //EXECUTE OPERATION  ST = SYMBOL TABLE(SCOPE)
    execute(st){
        let leftOperation;
        let rightOperation;
        switch(this.type){
            case util.operation.SUM:
                leftOperation = this.leftOperation.execute(st);
                rightOperation = this.rightOperation.execute(st);
                if (leftOperation instanceof Error) {
                    return leftOperation
                }
                if (rightOperation instanceof Error) {
                    return rightOperation
                }
                if (leftOperation.type == util.types.STRING || rightOperation.type == util.types.STRING){
                    return Operation.NewOperationValue(util.types.STRING, leftOperation.value + rightOperation.value);
                }
                return Operation.NewOperationValue(util.types.NUMBER, leftOperation.value + rightOperation.value);
            case util.operation.SUBSTRACTION:
                leftOperation = this.leftOperation.execute(st);
                rightOperation = this.rightOperation.execute(st);
                if (leftOperation instanceof Error) {
                    return leftOperation
                }
                if (rightOperation instanceof Error) {
                    return rightOperation
                }
                if (leftOperation.type == util.types.NUMBER && leftOperation.type == util.types.NUMBER) {
                    return Operation.NewOperationValue(util.types.NUMBER, leftOperation.value - rightOperation.value);
                }
                return new Error("you can't substract a type 'number' with a 'string'");
            case util.operation.MULTIPLICATION:
                leftOperation = this.leftOperation.execute(st);
                rightOperation = this.rightOperation.execute(st);
                if (leftOperation instanceof Error) {
                    return leftOperation
                }
                if (rightOperation instanceof Error) {
                    return rightOperation
                }
                if (leftOperation.type == util.types.NUMBER && leftOperation.type == util.types.NUMBER) {
                    return Operation.NewOperationValue(util.types.NUMBER, leftOperation.value * rightOperation.value);
                }
                return new Error("you can't multiply a type 'number' with a 'string'");
            case util.operation.DIVISION:
                leftOperation = this.leftOperation.execute(st);
                rightOperation = this.rightOperation.execute(st);
                if (leftOperation instanceof Error) {
                    return leftOperation
                }
                if (rightOperation instanceof Error) {
                    return rightOperation
                }
                if (leftOperation.type == util.types.NUMBER && leftOperation.type == util.types.NUMBER) {
                    if (rightOperation.value !== 0) {
                        return Operation.NewOperationValue(util.types.NUMBER, leftOperation.value / rightOperation.value);
                    }
                    return new Error("can't be divided within 0");
                }
                return new Error("you can't divided a type 'number' with a 'string'");
            case util.types.VARIABLE:
                return st.Get(this.value);
            default:
                return this;

        }
    }

}

module.exports = Operation;