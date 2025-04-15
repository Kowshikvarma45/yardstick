import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/")
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// User Schema
const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // (fix: it was "require")
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Transaction Schema
const transactionschema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "financialusers", // Reference to users
    required: true,
  },
});

// Models
export const userModel =
  mongoose.models["financialusers"] || mongoose.model("financialusers", userschema);

export const transactionModel =
  mongoose.models["financialtransactions"] ||
  mongoose.model("financialtransactions", transactionschema);
