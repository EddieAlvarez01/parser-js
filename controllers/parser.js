const parser = require('../analysis/parser');

const controller = {
    compile: (req, res) => {
        const {txt} = req.body;
        console.log(txt);
        if (txt === "" || txt === undefined) {
            return res.render('index', {
                type: 'error',
                message: 'Empty string'
            });
        }
        try{
            const result = parser(txt);    //JISON
            console.log(result);
            return res.render('index');
        }catch(error){
            console.log(error);
        }
        res.render('index');
    }
};

module.exports = controller;