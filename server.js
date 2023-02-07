import express from "express";
import logger from "morgan";
import emailRouter from "./routes/emailRoute.js";
import connectDB from "./dBase/dbaseConfig.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(logger("dev"));
app.use("/email", emailRouter);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server Running at http://localhost:${Port}`);
});
