const express = require("express");
const router = express.Router();
const Ev = require("../models/EV");

const {
  getAllEVs,
  editEV,
  createEV,
  updateEV,
  removeEV,
  addEV,
} = require("../controllers/evs");

router.route("/").get(getAllEVs);
router.route("/edit/:id").get(editEV);
router.route("/new").get(createEV);

router.post("/update/:id", updateEV);

router.post("/delete/:id", removeEV);

router.post("/", addEV);

module.exports = router;
