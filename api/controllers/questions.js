import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import Filter from "bad-words";

export const getQuestions = (req, res) => {

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in to the System.");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");
      const q = `SELECT q.*, u.id AS userId, name, profilePic, city
      FROM questions AS q 
      JOIN users AS u ON (u.id = q.userId) 
      ORDER BY q.createdAt DESC
      `;

      db.query(q, [userInfo.id, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
  }

}


export const addQuestion = (req, res) => {
  const token = req.cookies.accessToken;
  const filter = new Filter();

  if (!token) {
    return res.status(401).json("Not Logged in");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) res.status(403).json("Not Logged in to the System");

      const q = "INSERT INTO questions (`question`, `desc`, `userId`, `createdAt`) VALUES (?)";

      const qns = filter.clean(req.body.question);
      const desc = filter.clean(req.body.desc);

      const values = [
        qns,
        desc,
        userInfo.id,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Question has been asked");
      });
    })
  }
}

export const deleteQuestion = (req, res) => {

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in " + req.cookies.accessToken);
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) res.status(403).json("Not logged in to the System");

      const q = "DELETE FROM questions WHERE id = ?";

      const values = [
        req.query.id
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Question has been deleted");
      })
    })
  }

}