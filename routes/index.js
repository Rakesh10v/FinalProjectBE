var express = require("express");
var router = express.Router();
let UserSchema = require("../Schema/schema");
let { encrypt, decrypt } = require("../Schema/crypt");

/* GET home page. */
router.get("/display", async (req, res) => {
  try {
    const user = await UserSchema.find();
    res.json({
      message: "display all data",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });
    if (user) {
      res.send("User Already Exist");
    } else {
      const encode = await encrypt(req.body.password);
      req.body.password = encode;
      await UserSchema.create(req.body);
      res.json({
        message: "Data Inserted",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (user) {
      let result = decrypt(req.body.password, user.password);

      if (result) {
        res.send("login success");
      } else {
        res.send("wrong password");
      }
    } else {
      res.send("kindly create account");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
