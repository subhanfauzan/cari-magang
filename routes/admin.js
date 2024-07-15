var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const model_perusahaan = require("../models/model_perusahaan");
const model_akun = require("../models/model_akun");

router.get("/", function (req, res, next) {
  res.render("admin/index");
});

router.get("/perusahaan", async function (req, res, next) {
  let data = await model_perusahaan.getAll();
  res.render("admin/perusahaan", { data: data });
});

router.get("/tambahperusahaan", async function (req, res, next) {
  let akun = await model_akun.getbyrole();
  res.render("admin/tambahperusahaan", { akun });
});

module.exports = router;
