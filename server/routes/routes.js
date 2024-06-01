const express = require("express");
const router = new express.Router();
const userdb = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keysecret = "mynameisvishnupratapsingh1234567890";

// for 1st time signup
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(422).json({ error: "fill all the details" });
    }
    try {
        const preuserByEmail = await userdb.findOne({ email: email });
        const preuserByUsername = await userdb.findOne({ username: username });

        if (preuserByEmail) {
            return res
                .status(422)
                .json({ error: "This email is already registered" });
        }

        if (preuserByUsername) {
            return res.status(422).json({ error: "This username is already taken" });
        }

        //  Hash the password
        const hashedPassword = await bcrypt.hash(password, 15);

        const finalUser = new userdb({
            username,
            email,
            password: hashedPassword
        })

        const storeData = await finalUser.save();
        console.log(storeData);
        res.status(201).json({ status: 201, storeData });
    } catch (error) {
        res.status(422).json({ error });
        console.log("catch block error");
    }
});

// login router
router.post("/login", async(req,res) => {
    const{loginpoint, password} = req.body;

    if (!loginpoint || !password) {
        return res.status(422).json({ error: "fill all the details" });
    }
    try {
        const userValid = await userdb.findOne({
            $or: [
              { email: loginpoint },
              { username: loginpoint },
            ],
          });
          if (!userValid) {
            return res.status(422).json({ error: "Invalid email" });
          }
          const isMatch = await bcrypt.compare(password, userValid.password);
          if (isMatch) {
            // generate token
            const token = await jwt.sign({ _id: userValid.id }, keysecret);
            const { _id, email, username } = userValid;
      
            res.cookie("usercookie", token, {
              expires: new Date(Date.now() + 9000000),
              httpOnly: true,
            });
            console.log(token);
            res.status(201).json({ status: 201, token, user: { _id, email, username } });
          }
          else {
            console.log(error);
            return res.status(422).json({ error: "Password is not matching" });
          }
    } catch (error) {
        console.error("Error:", error);
    }
})


module.exports = router;