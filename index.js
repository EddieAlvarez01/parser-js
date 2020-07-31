//ENVIRONMENT VARIABLES
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

function init (){
    app.listen(app.get('PORT'));
    console.log('Server on port', app.get('PORT'));
}

init();
