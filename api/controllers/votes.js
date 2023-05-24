import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getVotes = (req, res) => {

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in to the System.");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");
      const q = `SELECT COUNT(*) AS vote_count
      FROM votes
      WHERE answerId = ?
      `;

      db.query(q, [req.query.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
  }
}

export const addVote = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) res.status(403).json("Not Logged in to the System");

      const answerId = req.body.answerId;
      const userId = userInfo.id;

      const checkQuery = "SELECT COUNT(*) AS voteCount FROM votes WHERE answerId = ? AND userId = ?";
      db.query(checkQuery, [answerId, userId], (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        const voteCount = result[0].voteCount;

        if (voteCount > 0) {
          const qq = `DELETE FROM votes WHERE answerId = ? AND userId = ?`;
          db.query(qq, [answerId, userId], (err, data) => {
            if (err) {
              return res.status(500).json(err);
            }
            return res.status(200).json("Vote Removed Successfully");
          })
        } else {
          const addQuery = "INSERT INTO votes (answerId, userId) VALUES (?, ?)";
          db.query(addQuery, [answerId, userId], (err, data) => {
            if (err) {
              return res.status(500).json(err);
            }
            return res.status(200).json("Vote added successfully");
          });
        }
      });
    });
  }
}

export const deleteVote = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) res.status(403).json("Not Logged in to the System");

      const answerId = req.params.id; // Get the answer ID from the request parameter
      const userId = userInfo.id;

      const deleteQuery = "DELETE FROM votes WHERE answerId = ? AND userId = ?";
      db.query(deleteQuery, [answerId, userId], (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        return res.status(200).json("Vote removed successfully");
      });
    });
  }
}
