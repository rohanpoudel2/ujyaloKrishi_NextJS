import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

  //Checking if User Exists

  const q = `SELECT * FROM users WHERE username = ?`;

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User Already Exists !!!");
    //Create a new User
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (`username`, `email`, `password`, `name`,  `city` ,`type`) VALUE (?)";

    const values = [req.body.username, req.body.email, hashedPassword, req.body.name, req.body.city, req.body.type];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User Has Been Created");
    });
  });



}

export const login = (req, res) => {

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("USER NOT FOUND");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

    if (!checkPassword) return res.status(400).json("Incorrect Username or Password");

    const token = jwt.sign({ id: data[0].id }, "rohandon");

    const { password, ...others } = data[0];

    res.cookie("accessToken", token, {
      httpOnly: true,
    }).status(200).json(others);
  });

}

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("User has been logged out");
}
