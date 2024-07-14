const connection = require("../config/db");

class Model_Akun {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM akun ORDER BY nik DESC", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM akun WHERE nik = ?", id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      });
    });
  }

  static async getByEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM akun WHERE email = ?",
        [email],
        function (err, rows) {
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
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO akun SET ?", data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE akun SET ? WHERE nik = ?",
        [data, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows);
          }
        }
      );
    });
  }

  static async remove(id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM akun WHERE nik = ?", id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  }
}

module.exports = Model_Akun;
