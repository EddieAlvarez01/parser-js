const Error = require('./Error');

class Print{

    constructor(value){
        this.value = value;
    }

    //EXECUTE OPERATION  ST = SYMBOL TABLE(SCOPE)
    execute(st){
        const result = this.value.execute(st);
        if (result instanceof Error){
            return result;
        }
        return result.value;
    }

}

module.exports = Print;