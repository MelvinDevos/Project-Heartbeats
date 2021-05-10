const express = require("express");
const pool = require("../Modules/db");
const verify = require("../modules/verifyToken");
const joi = require("joi");

const router = express.Router();

//Validatie schema maken voor create
const schemaCreate = joi.object({
  name: joi.string().required(),
  age: joi.number().required(),
  box_id: joi.string().allow(""),
  type_dementia: joi.string(),
  hr_tresh: joi.number(),
  custom: joi.bool(),
});

//Routes
router.get("/", (req, res) => {
  res.send("Hello from Heartbeats patient API");
});

router.post("/create", verify, async (req, res) => {
  try {
    const value = await schemaCreate.validateAsync(req.body);

    let patient = {
      name: pool.escape(value.name),
      age: pool.escape(value.age),
      box_id: pool.escape(value.box_id),
      type_dementia: pool.escape(value.type_dementia),
      hr_tresh: pool.escape(value.hr_tresh),
      custom: pool.escape(value.custom),
    };

    const connection = pool.query(
      `INSERT INTO patient (name, age, box_id, type_dementia, hr_tresh, custom) VALUES (${patient.name}, ${patient.age}, ${patient.box_id}, ${patient.type_dementia}, ${patient.hr_tresh}, ${patient.custom})`,
      (error, result) => {
        if (error) return res.status(400).send({ message: error.sqlMessage });
        res
          .status(200)
          .json({
            message: "Patient created",
            patient: { id: result.insertId, ...value },
          });
      }
    );
  } catch (error) {
    console.log("schema error");
    return res.status(400).send({ message: error.details[0].message });
  }
});

router.put("/update/:id", verify, async (req, res) => {
  console.log("er is update voor patient")
  try {
    const value = await schemaCreate.validateAsync(req.body);

    console.log(value);
    let patient = {
      id: pool.escape(req.params.id),
      name: pool.escape(value.name),
      box_id: pool.escape(value.box_id),
      type_dementia: pool.escape(value.type_dementia),
      hr_tresh: pool.escape(value.hr_tresh),
      custom: pool.escape(value.custom),
    };

    const connection = pool.query(
      `UPDATE patient SET  name=${patient.name}, box_id=${patient.box_id}, type_dementia=${patient.type_dementia}, hr_tresh=${patient.hr_tresh}, custom=${patient.custom} WHERE id=${patient.id}`,
      (error, result) => {
        if (error) return res.status(400).send({ message: error.sqlMessage });
        console.log(req.body);
        console.log(patient);
        res
          .status(200)
          .json({
            message: "Patient updated",
            patient: { ...req.body, id: req.params.id },
          });
      }
    );
  } catch (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
});

router.delete("/delete/:id", verify, (req, res) => {
  const id = req.params.id;
  console.log(id);
  const connection = pool.query(
    `DELETE FROM patient WHERE id=${id}`,
    (error, result) => {
      if (error) return res.status(400).send({ message: error.sqlMessage });
      res.status(200).json({ message: "Patient deleted" });
    }
  );
});

router.get("/show/:id?", verify, (req, res) => {
  const ID = req.params.id;
  let sql = "SELECT * FROM patient";
  if (ID) sql = `SELECT * FROM patient WHERE id = ${ID}`;

  const connection = pool.query(sql, (error, result) => {
    if (error) return res.status(400).send({ message: error.sqlMessage });
    res.status(200).json(result);
  });
});

module.exports = router;
