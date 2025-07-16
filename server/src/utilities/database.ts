import mongoose from "mongoose";

const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to the database successfully");
  } catch (error) {
    if (error instanceof mongoose.Error)
      console.error(`\n[MongoDB Error]: ${error.stack ?? error.message}\n`);
    if (error instanceof Error)
      console.error(`\n[Uncaught Error]: ${error.stack ?? error.message}\n`);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
