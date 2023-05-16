import { db } from "../connect.js";
import moment from "moment";
import jwt from "jsonwebtoken";
import { sendMail } from "../mail/mail.js";

export const getOffers = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not Logged in to the System");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");

      const q = `
      SELECT o.*, r.userid, u.username, u.name,u.city,rq.title
      FROM offers o
      JOIN requests r ON o.requestid = r.id
      JOIN users u ON o.userid = u.id
      JOIN requests rq ON o.requestid = rq.id
      WHERE r.userid = ?;
      `;

      db.query(q, [req.query.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    })
  }
}

export const makeOffer = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged in");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");

      const checkOfferQuery = "SELECT * FROM offers WHERE requestId = ? AND userId = ?";
      const checkOfferValues = [req.body.requestId, userInfo.id];

      db.query(checkOfferQuery, checkOfferValues, (err, existingOffer) => {
        if (err) return res.status(500).json(err);

        if (existingOffer.length > 0) {
          return res.status(400).json("Offer already exists for this request");
        }

        const insertOfferQuery = "INSERT INTO offers (`requestId`, `userId`, `status`, `createdAt`) VALUES (?, ?, ?, ?)";
        const insertOfferValues = [
          req.body.requestId,
          userInfo.id,
          null,
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];

        db.query(insertOfferQuery, insertOfferValues, (err, offerData) => {
          if (err) return res.status(500).json(err);

          const selectUserIdQuery = "SELECT userId FROM requests WHERE id = ?";
          const selectUserIdValues = [req.body.requestId];

          db.query(selectUserIdQuery, selectUserIdValues, (err, userIdResult) => {
            if (err) return res.status(500).json(err);

            const userId = userIdResult[0].userId;

            const selectUserEmailQuery = "SELECT email FROM users WHERE id = ?";
            const selectUserEmailValues = [userId];

            db.query(selectUserEmailQuery, selectUserEmailValues, (err, userEmailResult) => {
              if (err) return res.status(500).json(err);

              const email = userEmailResult[0].email;

              sendMail(email, "Help Offered", "Someone has offered to help on your request. Please check your Ujyalo Krishi account for details.");
              return res.status(200).json("Help has been offered");
            });
          });
        });
      });
    });
  }
}



export const responseOffer = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not Logged in to the System");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");

      const q = `
      UPDATE offers SET status = ?
      WHERE offers.id = ?
      `;

      const values = [
        req.body.status,
        req.body.offerId
      ];

      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);

        const q1 = "SELECT userId from offers where id = ?";
        db.query(q1, [req.body.offerId], (err, data) => {
          if (err) return res.status(500).json(err);

          const userId = data[0].userId;

          const q2 = "SELECT email from users WHERE id = ?";
          db.query(q2, [userId], (err, data) => {
            if (err) return res.status(500).json(err);

            const email = data[0].email;

            sendMail(email, "Offer Accepted", "Your offer to help has been accepted. Please login to your Ujyalo Krishi account to see the details.");
            return res.status(200).json("Offer Status Has been Updated");
          })
        });
      });
    });
  }
};



export const deleteOffer = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not Logged in to the System");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");

      const q = `
        DELETE FROM offers WHERE id = ?
      `;

      const values = [
        req.query.id
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Offer has been deleted");
      });
    })
  }

}

export const getOfferStatus = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not Logged in to the System");
  } else {
    jwt.verify(token, process.env.verify_token, (err, data) => {

      const q = `
      SELECT users.name, users.email , requests.title, offers.id
      FROM offers
      INNER JOIN requests ON offers.requestId = requests.id
      INNER JOIN users ON requests.userId = users.id
      WHERE offers.status = '1' AND offers.userId = ?
    `;

      db.query(q, [req.query.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });

    })
  }
}
