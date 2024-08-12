import mongoose from "mongoose";

const connection = {};

const dbConnection = async () => {
  if (connection.isConnected) {
    console.log("DB is already connected");
    return;
  } else {
    try {
      const db = await mongoose.connect(process.env.MONGODB_URI);
      console.log("DB connected");
      connection.isConnected = db.connections[0].readyState;
    } catch (error) {
      console.log("Error connecting to the database", error);
    }
  }
};

export default dbConnection;
