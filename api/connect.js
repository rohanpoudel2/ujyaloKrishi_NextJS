import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "root",
  password: "root",
  database: "krishi"
});