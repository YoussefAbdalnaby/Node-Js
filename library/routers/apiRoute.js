const express = require('express');
const registerController =    require('../controllers/apiCont');
 // Update the import

const route = express.Router();


route.post('/api',registerController.registerController); // Update the usage

module.exports = route;