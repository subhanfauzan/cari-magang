let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pencarian-magang",
});
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Success");
  }
});

module.exports = connection;
