const Symbol = require('../models/Symbol');
const util = require('../utilities/util');
const Error = require('../models/Error');

class Declaration {

    constructor(id, value){
        this.id = id;
        this.value = value;
    }

    //EXECUTE OPERATION  ST = SYMBOL TABLE(SCOPE)
    execute(st){
        if (this.value != '') {
            const result = this.value.execute(st);
            if (result instanceof Error) {
                return result;
            }
            this.value = result.value;
            st.Add(new Symbol(this.id, result.type, this.value));
        }else{
            st.Add(new Symbol(this.id, util.types.UNDEFINED, this.value));
        }
        return null;
    }

}

module.exports = Declaration;