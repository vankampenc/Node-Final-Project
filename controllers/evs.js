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
  }
  else {
    res.render("noAccess")
  }
};

const createEV = async (req, res) => {
  res.render("ev", { ev: null });
};

module.exports = {
  getAllEVs,
  editEV,
  createEV,
};
