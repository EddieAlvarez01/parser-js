const {Router} = require('express');
const controller = require('../controllers/parser');

const router = Router();

//PARSER ROUTES
router.post('/parser', controller.compile);

module.exports = router;