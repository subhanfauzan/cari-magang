var express = require("express");
var router = express.Router();
const model_perusahaan = require("../models/model_perusahaan.js");
const Model_Akun = require("../models/model_akun.js");

router.get("/", async function (req, res, next) {
  let rows = await model_perusahaan.getAll();
  res.render("admin/perusahaan/", {
    data: rows,
  });
});

router.get("/create", async function (req, res, next) {
  try {
    // Mendapatkan data barang dan data peminjam
    let rows2 = await model_wisata.getALL();

    // Merender halaman pembuatan paket dengan data yang diperoleh
    res.render("paket/create", {
      id_wisata: "",
      nama_paket: "",
      deskripsi: "",
      harga: "",
      data_wisata: rows2,
    });
  } catch (error) {
    // Tangani kesalahan
    console.error(
      "Error saat mendapatkan data barang atau data peminjam:",
      error
    );
    req.flash("error", "Gagal memuat halaman pembuatan paket");
    res.redirect("/paket"); // Redirect ke halaman lain atau lakukan hal lain sesuai kebutuhan
  }
});

router.post("/store", async function (req, res, next) {
  try {
    let { nik, nama_perusahaan } = req.body;
    let Data = {
      nik,
      nama_perusahaan,
    };
    await model_perusahaan.create(Data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/admin");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/perusahaan");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows2 = await model_perusahaan.getById();
    let rows = await Model_Akun.getById();
    res.render("admin/perusahaan/edit", {
      id: id,
      nik: rows2,
      nama_perusahaan: rows2[0].nama_perusahaan,
      kabupaten: rows2[0].kabupaten,
      alamat: rows2[0].alamat,
      kriteria_magang: rows2[0].kriteria_magang,
      durasi_magang: rows2[0].durasi_magang,
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal memuat halaman edit perusahaan");
    res.redirect("/perusahaan");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { id_wisata, nama_paket, deskripsi, harga } = req.body;
    let Data = {
      id_wisata,
      nama_paket,
      deskripsi,
      harga,
    };
    await model_perusahaan.update(id, Data);
    req.flash("success", "Berhasil update data");
    res.redirect("/editperusahaan");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/paket");
  }
});

router.get("/delete/(:id)", async function (req, res, next) {
  let id = req.params.id;
  await model_perusahaan.remove(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/paket");
});

module.exports = router;
