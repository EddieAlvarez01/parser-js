const Error = require('../models/Error');

class SymbolTable {

    constructor() {
        this.symbols = [];
    }

    //ADD SYMBOL TO SCOPE
    Add(symbol) {
        this.symbols.push(symbol);
    }

    //RETURN SYMBOL(VARIABLE) OF THE SCOPE
    Get(id){
        this.symbols.forEach(item => {
            if (item.id == id){
                return item;
            }
        });
        return new Error(`The id ${id} not exist in the scope`);
    }

    //COPY ALL SYMBOLS IN THE NEW SCOPE
    clone(st){
        this.symbols = st.slice();
    }

}

module.exports = SymbolTable;