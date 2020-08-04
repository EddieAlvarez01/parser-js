const parser = require('../analysis/parser');

const controller = {
    index: (req, res) => {
        res.render('index', {
            data: req.data
        });
    },

    compile: (req, res, next) => {
        const {txt} = req.body;
        if (txt === "" || txt === undefined) {
            req.data = {
                status: 'error',
                message: 'No se ha proveido ningún texto' 
            };
            return next();
        }
        try{
            const result = parser.parse(txt);   //JISON
            console.log(result.childs[0].childs[0]);
            req.data = {
                status: 'success',
                message: 'Compilado correctamente' 
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

module.exports = controller;