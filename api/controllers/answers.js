import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import Filter from "bad-words";

export const getAnswers = (req, res) => {
  const q = `
    SELECT a.*, u.id AS userId, name, profilePic, city,
      COALESCE(v.vote_count, 0) AS vote_count
    FROM answers AS a
    JOIN users AS u ON (u.id = a.userId)
    LEFT JOIN (
      SELECT answerId, COUNT(*) AS vote_count
      FROM votes
      GROUP BY answerId
    ) AS v ON (v.answerId = a.id)
    WHERE a.questionId = ?
    ORDER BY vote_count DESC, a.answeredAt DESC
  `;

  db.query(q, [req.query.questionId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const addAnswer = (req, res) => {

  const token = req.cookies.accessToken;

  const filter = new Filter();

  if (!token) {
    return res.status(401).json("Not Logged in");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");

      const q = "INSERT INTO answers (`desc`, `answeredAt` ,`userId`,  `questionId`) VALUES (?)";

      const ans = filter.clean(req.body.answer);

      const values = [
        ans,
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

export const deleteAnswer = (req, res) => {

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in " + req.cookies.accessToken);
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) res.status(403).json("Not logged in to the System");

      const q = "DELETE FROM answers WHERE id = ?";
      const values = [
        req.query.id
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Answer has been deleted");
      })
    })
  }
}