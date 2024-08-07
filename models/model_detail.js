const connection = require("../config/db");

class model_detail {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM detail ORDER BY id_detail DESC",
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM detail WHERE id_detail = ?",
        [id],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows[0]);
          }
        }
      );
    });
  }

  static async create(data) {
    const { id_berkas, id_biodata, id_perusahaan, status } = data;
    const tanggal_daftar = new Date(); // Tanggal hari ini

    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO detail (id_berkas, id_biodata, id_perusahaan, tanggal_daftar, status) VALUES (?, ?, ?, ?, ?)",
        [id_berkas, id_biodata, id_perusahaan, tanggal_daftar, status],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.insertId);
          }
        }
      );
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE detail SET ? WHERE id_detail = ?",
        [data, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah UPDATE
          }
        }
      );
    });
  }

  static async remove(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM detail WHERE id_detail = ?",
        [id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah DELETE
          }
        }
      );
    });
  }
}

module.exports = model_detail;
