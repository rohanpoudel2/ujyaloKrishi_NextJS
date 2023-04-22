import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getQuestions = (req, res) => {

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in to the System.");
  } else {
    jwt.verify(token, "rohandon", (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");
      const q = `SELECT q.*, u.id AS userId, name, profilePic, city
      FROM questions AS q 
      JOIN users AS u ON (u.id = q.userId) 
      ORDER BY q.createdAt DESC
      `;

      db.query(q, [userInfo.id, userInfo.id], (err, data) => {
        if (err) return res.status(200).json(data);
        return res.status(200).json(data);
      });
    });
  }

}


export const addQuestion = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in");
  } else {
    jwt.verify(token, "rohandon", (err, userInfo) => {
      if (err) res.status(403).json("Not Logged in to the System");

      const q = "INSERT INTO questions (`question`, `desc`, `userId`, `createdAt`) VALUES (?)";

      const values = [
        req.body.question,
        req.body.desc,
        userInfo.id,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(200).json(data);
        return res.status(200).json("Question has been asked");
      });
    })
  }
}