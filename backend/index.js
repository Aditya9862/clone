require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { HoldingsModel }=require('./model/HoldingsModel');
const { PositionsModel }=require('./model/PositionsModel');
const { OrderModel, OrdersModel } = require('./model/OrdersModel');

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get("/addHoldings", async (req, res) => {
//   let tempPositions = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];
//   tempPositions.forEach((item)=>{
//     let newPositions = new PositionsModel({
//     name: String,
//     qty: Number,
//     avg : Number,
//     price: Number,
//     net: String,
//     day: String,
//     isLoss: Boolean,
//      });

//     newPositions.save();
//   });
//   res.send("DoneP!");
// });

app.get("/allHoldings", async(req,res) =>{
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("allPositions", async(req,res) =>{
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req,res) =>{
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  newOrder.save();
  res.send("order saved")
});

app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(url);
  console.log("DB started");
})
