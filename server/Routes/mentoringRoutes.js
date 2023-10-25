// mentoringRoutes.js
const express = require('express');
const { onSearch } = require('../Controllers/mentoringController');

const router = express.Router();

// Define the route for the 'on_search' request
router.post('/on_search', onSearch);

module.exports = router;
