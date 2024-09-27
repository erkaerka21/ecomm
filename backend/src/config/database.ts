import mongoose from "mongoose";

const connectDatabase = async (URL: string) => {
  try {
    const connconnect = await mongoose.connect(`${URL}`);
    console.log("өгөгдлийн сантай холбогдсон", connconnect.connection.host);
  } catch (error) {
    console.error("холбогдож чадсангүй");
  }
};

export default connectDatabase;
