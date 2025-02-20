const Ev = require("../models/EV");

const getAllEVs = async (req, res) => {
  const evs = await Ev.find({ createdBy: req.user._id }).sort("createdAt");
  const formattedEvs = evs.map((ev) => {
    ev.formattedLastUpdated = ev.updatedAt.toLocaleDateString("en-US");
    return ev;
  });
  res.render("evs", { evs: formattedEvs });
};

const editEV = async (req, res) => {
  const id = req.params.id;
  const ev = await Ev.findById({ _id: id });
  if (ev.createdBy.toString() === req.user._id.toString()) {
    res.render("ev", { ev });
  } else {
    res.render("noAccess");
  }
};

const createEV = async (req, res) => {
  res.render("ev", { ev: null, errors: req.flash("errors") });
};

const updateEV = async (req, res) => {
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
    const ev = await Ev.findById(evID);
    return res.render("ev", { errors: req.flash("errors"), ev });
  }
  const ev = await Ev.findOneAndUpdate(
    { _id: evID, createdBy: req.user._id },
    { year, make, model, status },
    { new: true },
  );
  if (!ev) {
    throw new Error(`No edit access to EV with id ${evID}`);
  }
  res.redirect("/evs");
};

const removeEV = async (req, res) => {
  const {
    params: { id: evID },
  } = req;
  const ev = await Ev.findOneAndDelete({ _id: evID, createdBy: req.user._id });
  if (!ev) {
    throw new Error(`No EV with id ${evID}`);
  }
  res.redirect("/evs");
};

const addEV = async (req, res) => {
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
};

module.exports = {
  getAllEVs,
  editEV,
  createEV,
  updateEV,
  removeEV,
  addEV,
};
