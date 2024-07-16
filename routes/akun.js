var express = require("express");
var router = express.Router();
const Model_Akun = require("../models/model_akun.js");

router.get("/", async function (req, res, next) {
  let rows2 = await Model_Akun.getAll();
  res.render("admin/akun/", {
    data: rows2,
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nik, email, password, role } = req.body;
    let Data = {
      nik,
      email,
      password,
      role,
    };
    await Model_Akun.create(Data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/akun");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/akun");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    let akun = await Model_Akun.getAll();
    res.render("admin/akun/edit", {
      id: id,
      nik: akun[0].nik,
      email: akun[0].email,
      password: akun[0].password,
      role: akun,
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal memuat halaman edit akun");
    res.redirect("/akun");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_akun, kabupaten, alamat, kriteria_magang, durasi_magang } =
      req.body;
    let Data = {
      nama_akun,
      kabupaten,
      alamat,
      kriteria_magang,
      durasi_magang,
    };
    await Model_Akun.update(id, Data);
    req.flash("success", "Berhasil update data");
    res.redirect("/akun");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/akun");
  }
});

router.get("/delete/(:id)", async function (req, res, next) {
  let id = req.params.id;
  await Model_Akun.remove(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/paket");
});

module.exports = router;
