const express = require("express");
const router = express.Router();
const Ev = require("../models/EV");

const { getAllEVs, editEV, createEV } = require("../controllers/evs");

router.route("/").get(getAllEVs);
router.route("/edit/:id").get(editEV);
router.route("/new").get(createEV);

router.post("/update/:id", async (req, res) => {
  const {
    body: { year, make, model, status },
    params: { id: evID },
  } = req;

  if (!year) {
    req.flash("errors", "Year required");
  }
  if (!make) {
    req.flash("errors", "Make required");
  }
  if (!model) {
    req.flash("errors", "Model required");
  }
  if (!year || !make || !model) {
    return res.render("ev", { errors: req.flash("errors"), ev: req.body });
  }
  const ev = await Ev.findOneAndUpdate(
    { _id: evID, createdBy: req.user._id },
    { year, make, model, status },
  );
  if (!ev) {
    throw new Error(`No edit access to EV with id ${evID}`);
  }
  res.redirect("/evs");
});

router.post("/delete/:id", async (req, res) => {
  const {
    params: { id: evID },
  } = req;
  const ev = await Ev.findOneAndDelete({ _id: evID, createdBy: req.user._id });
  if (!ev) {
    throw new Error(`No EV with id ${evID}`);
  }
  res.redirect("/evs");
});

router.post("/", async (req, res) => {
  const {
    body: { year, make, model, status },
    params: { id: evID },
  } = req;

  if (!year) {
    req.flash("errors", "Year required");
  }
  if (!make) {
    req.flash("errors", "Make required");
  }
  if (!model) {
    req.flash("errors", "Model required");
  }
  if (!year || !make || !model) {
    return res.render("ev", { errors: req.flash("errors"), ev: null });
  }
  req.body.createdBy = req.user._id;
  const ev = await Ev.create(req.body);
  res.redirect("/evs");
});

module.exports = router;
