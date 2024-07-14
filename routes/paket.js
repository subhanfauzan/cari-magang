var express = require("express");
var router = express.Router();
const model_paket = require("../models/model_paket.js");
const model_wisata = require("../models/model_wisata.js");

router.get("/", async function (req, res, next) {
  let rows = await model_paket.getAll();
  res.render("admin/paket", {
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
    let { id_wisata, nama_paket, deskripsi, harga } = req.body;
    let Data = {
      id_wisata,
      nama_paket,
      deskripsi,
      harga,
    };
    await model_paket.create(Data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/paket");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/paket");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await model_paket.getById();
    let rows2 = await model_wisata.getById();
    res.render("paket/edit", {
      id: id,
      id_wisata: rows[0].id_wisata,
      nama_paket: rows[0].nama_paket,
      deskripsi: rows[0].deskripsi,
      harga: rows[0].harga,
      data_barang: rows2,
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal memuat halaman edit paket");
    res.redirect("/paket");
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
    await model_paket.update(id, Data);
    req.flash("success", "Berhasil update data");
    res.redirect("/paket");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/paket");
  }
});

router.get("/delete/(:id)", async function (req, res, next) {
  let id = req.params.id;
  await model_paket.remove(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/paket");
});

module.exports = router;
