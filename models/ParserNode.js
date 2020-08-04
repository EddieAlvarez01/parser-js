class ParserNode{

    constructor(row, operation, value){
        this.row = row;
        this.operation = operation;
        this.value = value;
        this.childs = [];
    };

    //ADD CHILDREN TO THE NODE
    Add(node) {
        this.childs.push(node);
    }

}

module.exports = ParserNode;