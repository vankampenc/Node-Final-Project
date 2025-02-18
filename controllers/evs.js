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
  res.render("ev", { ev });
};

const createEV = async (req, res) => {
  res.render("ev", { ev: null });
};

module.exports = {
  getAllEVs,
  editEV,
  createEV,
};
