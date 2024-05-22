
const express = require('express');
const { createConfig, insertData, getConfigerationById, updateConfigaritionById } = require('../controller/configController');
const router = express.Router();

router.post("/api/createConfig", createConfig)
router.get("/api/configaritions/:id", getConfigerationById)

router.post("/api/insert", insertData)
router.put("/api/configaritions/:id", updateConfigaritionById)



module.exports = router;