const User = require("../models/User");
const parseVErr = require("../utils/parseValidationErrs");

const registerShow = (req, res) => {
  res.render("register");
};

const registerDo = async (req, res, next) => {
  if (!req.body.name) {
    req.flash("errors", "Name required");
  }
  if (!req.body.email) {
    req.flash("errors", "Email required");
  }
  if (!req.body.password) {
    req.flash("errors", "Password required");
  } else if (req.body.password != req.body.password1) {
    req.flash("errors", "The passwords entered do not match.");
    return res.render("register", { errors: req.flash("errors") });
  }
  try {
    await User.create(req.body);
  } catch (e) {
    if (e.constructor.name === "ValidationError") {
      parseVErr(e, req);
    } else if (e.name === "MongoServerError" && e.code === 11000) {
      req.flash("errors", "That email address is already registered.");
    } else {
      return next(e);
    }
    return res.render("register", { errors: req.flash("errors") });
  }
  res.redirect("/");
};

const logoff = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

const logonShow = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("logon");
};

module.exports = {
  registerShow,
  registerDo,
  logoff,
  logonShow,
};
