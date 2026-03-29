const { model } = require("mongoose");
const { PositionsSchema } = require("../schemas/PositionsSchema");
PositionsModel = new model("position", PositionsSchema);

module.exports = { PositionsModel };