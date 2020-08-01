const {Router} = require('express');
const controller = require('../controllers/parser');

const router = Router();

//PARSER ROUTES
router.get('/', controller.index);
router.post('/parser', controller.compile, controller.index);

module.exports = router;