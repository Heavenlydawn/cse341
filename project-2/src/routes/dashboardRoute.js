const express = require('express');
const router = express.Router();
const dashboardController = require("../controllers/dashboardController.js");
const { ensureAuth } = require("../middleware/auth.js");

router.get("/", ensureAuth, dashboardController.getDashboard);

module.exports = router;
