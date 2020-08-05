const { types } = require("../utilities/util");

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

}

module.exports = Operation;