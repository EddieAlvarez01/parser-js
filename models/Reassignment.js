const Error = require('./Error');

class Reassignment {

    constructor(id, value){
        this.id = id;
        this.value = value;
    }

    //EXECUTE OPERATION  ST = SYMBOL TABLE(SCOPE)
    execute(st){
        let result = this.value.execute(st);
        if (result instanceof Error){
            return result;
        }
        result = st.Set(this.id, result);
        if (result instanceof Error){
           return result; 
        }
        return null;
    }

}

module.exports = Reassignment;