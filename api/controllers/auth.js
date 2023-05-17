import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendMail } from "../mail/mail.js";

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

export const verify = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not Logged in to the System");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");

      if (userInfo.verified) {
        return res.status(200).json("User already verified");
      }

      const verificationToken = generateVerificationToken();

      const q = "UPDATE users SET verificationToken = ? WHERE id = ?";

      db.query(q, [verificationToken, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);

        const q1 = "SELECT email FROM users WHERE id = ?";

        db.query(q1, [userInfo.id], (err, data) => {
          if (err) return res.status(403).json("Unauthorized");

          sendMail(data[0].email, "Verify Your Account", `This is your verification code ${verificationToken} , Please use this to verify your account.`);
          return res.status(200).json("Verification Email Sent");
        });
      });
    });
  }
}

const generateVerificationToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
}

export const confirm = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not Logged in to the System");
  } else {
    jwt.verify(token, process.env.verify_token, (err, userInfo) => {
      if (err) return res.status(403).json("Unauthorized");

      const verificationToken = req.body.token;

      const q = 'SELECT verificationToken FROM users WHERE id = ?';

      db.query(q, [userInfo.id], (err, data) => {

        if (verificationToken === data[0].verificationToken) {

          const q = "UPDATE users SET verified = 1 WHERE id = ?";
          db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json("User verified successfully");
          });
        } else {
          return res.status(400).json("Invalid verification token");
        }

      });


    });
  }
}