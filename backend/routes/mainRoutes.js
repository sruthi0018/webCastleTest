const express = require("express");
const { googleLogin, googleCallback, savePhone } = require("../controllers/mainController");
const router = express.Router();

router.get("/auth/google", googleLogin);
router.get("/auth/google/callback", googleCallback);
router.post("/save-phone", savePhone);

module.exports = router;
