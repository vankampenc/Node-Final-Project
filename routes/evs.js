const express = require("express");
const router = express.Router();
const Ev = require('../models/EV')

const { getAllEVs, editEV, createEV } = require('../controllers/evs');

router.route("/").get(getAllEVs)
router.route("/edit/:id").get(editEV)
router.route("/new").get(createEV)

router.post("/update/:id", async (req, res) => {
    const { body: { make, model, status }, params: { id: evID } } = req

    console.log("STATUS", req.body)

    const ev = await Ev.findByIdAndUpdate({ _id: evID }, { make, model, status })
    console.log("Updated EV", ev)
    if (!ev) {
        throw new Error(`No EV with id ${evID}`)
    }
    res.redirect("/evs")
})

router.post("/delete/:id", async (req, res) => {
    console.log("start")
    const { params: { id: evID } } = req
    const ev = await Ev.findOneAndDelete({ _id: evID })
    console.log("Deleted", ev)
    if (!ev) {
        throw new Error(`No EV with id ${evID}`)
    }
    res.redirect("/evs")
})

router.post("/", async (req, res) => {
    console.log("USER", req.user)
    req.body.createdBy = req.user._id
    const ev = await Ev.create(req.body)
    console.log("EV", ev)
    res.redirect("/evs")
})



module.exports = router