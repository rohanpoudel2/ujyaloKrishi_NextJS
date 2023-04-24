import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRequests = (req, res) => {

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in to the System.");
  } else {
    jwt.verify(token, "rohandon", (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");
      const q = `SELECT r.*, u.id AS userId, name, profilePic, city FROM requests AS r JOIN users AS u ON (u.id = r.userId) WHERE u.id = ? ORDER BY r.createdAt DESC`;

      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
  }

}

export const addRequest = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in");
  } else {
    jwt.verify(token, "rohandon", (err, userInfo) => {
      if (err) res.status(403).json("Not Logged in to the System");

      const q = "INSERT INTO requests (`title`, `desc`, `userId`, `createdAt`, `expiresAt`) VALUES (?)";

      const values = [
        req.body.title,
        req.body.desc,
        userInfo.id,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        moment(Date.now()).add(1, 'month').format("YYYY-MM-DD HH:mm:ss")
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Request Has been Sent");
      });
    })
  }
}

export const deleteRequest = (req, res) => {

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in" + req.cookies.accessToken);
  } else {
    jwt.verify(token, "rohandon", (err, userInfo) => {
      if (err) res.status(403).json("Not Logged in to the System");

      const q = "DELETE FROM requests WHERE id = ?";

      const values = [
        req.query.id
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Request Has been Deleted");
      });
    })
  }

}