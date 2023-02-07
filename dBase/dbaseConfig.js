import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connectDB;
