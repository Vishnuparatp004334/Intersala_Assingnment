const express = require("express");
const router = express.Router();

const orders = require("../model/shaleOrder");

router.post("/takeorder", async(req,res) => {
    const{name,email,age,Price,work,add} = req.body;

    if (!name || !email || !age || !Price || !work || !add) {
        res.status(422).json("plz fill the data");
    }

    try {
        const preorder = await orders.findOne({email:email});

        if (preorder) {
            res.status(422).json("this user is already present");
        }else{
            const addorder = new orders({
                name,email,age,Price,work,add
            });

            await addorder.save();
            res.status(201).json(addorder)
        }
    } catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
})

router.get("/getorder", async(req,res) => {
    try {
        const orderdata = await orders.find();
        res.status(201).json(orderdata)
        console.log(orderdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.post('/updateorderstatus', async (req, res) => {
    const { id, status } = req.body;
    try {
      const updatedOrder = await orders.findByIdAndUpdate(id, { status }, { new: true });
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(422).json(err);
    }
  });

router.get("/getorder/:id", async(req,res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const orderindividual = await orders.findById({_id:id});
        console.log(orderindividual);
        res.status(201).json(orderindividual)  
    } catch (error) {
        res.status(422).json(error);
    }
})

router.patch("/updateorder/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const updateorder = await orders.findByIdAndUpdate(id, req.body, {
            new:true
        })

        console.log(updateorder);
        res.status(201).json(updateorder)
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;