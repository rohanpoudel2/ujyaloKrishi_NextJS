import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const updateUser = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, process.env.verify_token, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "UPDATE users SET  `profilePic`=? WHERE id = ?";

    db.query(q, [req.body.profilePic, userInfo.id], (err, data) => {
      if (err) res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated");
      return res.status(403).json("You can update only your profie");
    })

  });

}

export const getUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, process.env.verify_token, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      const { password, ...info } = data[0];
      return res.json(info);
    });
  });
};