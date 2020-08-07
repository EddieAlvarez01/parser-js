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
        const symbol = this.symbols.find(item => item.id === id);
        if (symbol != undefined){
            return symbol;
        }
        return new Error(`The id "${id}" not exist in the scope`);
    }

    //CHANGE THE VALUE OF A VARIABLE
    Set(id, operation){
        const index = this.symbols.findIndex(item => item.id === id);
        if (index != -1){
            this.symbols[index].type = operation.type;
            this.symbols[index].value = operation.value;
            return true;
        }
        return new Error(`The id "${id}" not exist in the scope`);
    } 

    //COPY ALL SYMBOLS IN THE NEW SCOPE
    clone(st){
        this.symbols = st.slice();
    }

}

module.exports = SymbolTable;