import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getAnswers = (req, res) => {

  const q = `
  SELECT a.*, u.id AS userId, name, profilePic, city 
  FROM answers AS a 
  JOIN users AS u ON (u.id = a.userId) 
  WHERE a.questionId = ? 
  ORDER BY a.answeredAt DESC
  `;

  db.query(q, [req.query.questionId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

export const addAnswer = (req, res) => {

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in");
  } else {
    jwt.verify(token, "rohandon", (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");

      const q = "INSERT INTO answers (`desc`, `answeredAt` ,`userId`,  `questionId`) VALUES (?)";

      const values = [
        req.body.answer,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.body.questionId
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Question has been Answered");
      });
    })
  }

}