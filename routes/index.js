const express = require("express");
const { postCode, getCode } = require("../controllers/index");
const router = express.Router();

router.post("/postcode", postCode);
router.get("/getcode", getCode);
module.exports = router;
