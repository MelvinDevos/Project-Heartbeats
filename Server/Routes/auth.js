const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../Modules/db");
const joi = require("joi");
const verify = require("../Modules/verifyToken");

//Validatie schema maken voor registreren
const schemaRegister = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().min(3).required().email(),
  password: joi.string().min(3).required(),
  level: joi.number().min(1).max(3).required(),
});

//Validatie schema maken voor registreren
const schemaLogin = joi.object({
  email: joi.string().min(3).required().email(),
  password: joi.string().min(3).required(),
});

//Express router
const router = express.Router();

//-=*=-
// Routes
// -=*=-

// Testroute
router.get("/", (req, res) => {
  res.send("Hello from Heartbeats AUTH API");
});

// Register admin
router.post("/register", async (req, res) => {
  //Valideer de data voordat we een gebruiker registreren
  try {
    const value = await schemaRegister.validateAsync(req.body);

    let admin = {
      name: pool.escape(value.name),
      email: pool.escape(value.email),
      password: value.password,
      level: value.level,
    };

    try {
      let hash = await bcrypt.hash(admin.password, 10);
      console.log(admin);
      console.log(hash);

      const connection = pool.query(
        `INSERT INTO admin (name, email, password, level) VALUES (${admin.name}, ${admin.email}, '${hash}', ${admin.level})`,
        (error, result) => {
          if (error) return res.status(400).send({ message: error.sqlMessage });
          res.status(200).json({ message: "Admin account created" });
        }
      );
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Error generating password hash" });
    }
  } catch (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
});

//   Login admin
router.post("/login", async (req, res) => {
  try {
    const value = await schemaLogin.validateAsync(req.body);

    let admin = {
      email: pool.escape(value.email),
      password: value.password,
    };

    const connection = pool.query(
      `SELECT name, email, password, level FROM admin WHERE email =${admin.email}`,
      (error, result) => {
        if (error) return res.status(400).send({ message: error.sqlMessage });

        //   result = [] when no email is found
        if (Object.keys(result).length === 0) {
          return res.status(400).send({ message: "Email not found" });
        }

        //   compare password from http POST request to hash password in database
        const compare = bcrypt.compare(
          admin.password,
          result[0].password,
          (err, same) => {
            if (err) {
              return res
                .status(400)
                .send("Something went wrong with bcrypt compare");
            }
            console.log(same);
            if (!same)
              return res.status(400).send({ message: "Password not correct" });

            //Create JWT token
            const token = jwt.sign(
              { name: result[0].name, level: result[0].level },
              process.env.JWT_TOKEN_SECRET
            );

            return res
              .header("Authorization", token)
              .status(200)
              .send({ message: "Admin logged in" });
          }
        );
      }
    );
  } catch (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  let ID = pool.escape(req.params.id);

  try {
    let connection = pool.query(
      `DELETE FROM admin WHERE id = ${ID}`,
      (error, result) => {
        console.log(result);
        if (result.affectedRows == 0) {
          return res.status(400).send({ message: "Admin not found" });
        }

        if (error) {
          return res.status(400).send({ message: error.sqlMessage });
        }

        return res.status(200).send({ message: "Admin deleted" });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.post("/show", async (req, res) => {
  let connection = pool.query(`SELECT * FROM admin`, (error, result) => {
    if (error) return res.status(400).send({ message: error.sqlMessage });
    return res.status(200).send(result);
  });
});

module.exports = router;
