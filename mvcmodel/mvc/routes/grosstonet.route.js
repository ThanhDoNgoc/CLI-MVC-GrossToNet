const express = require('express');
const router = express.Router();
const grosstonetcontroller = require('../controllers/grosstonet.controller');

router.post('/',grosstonetcontroller.grossToNet_create);
router.get('/', grosstonetcontroller.grossToNet_home);

module.exports = router;