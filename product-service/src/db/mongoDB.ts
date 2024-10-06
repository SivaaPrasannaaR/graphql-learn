import mongoose from "mongoose"

const mongoURI = "mongodb://mongo:27017/productsdb" || process.env.MONGO_URI

// Connect to MongoDB
export const connectMongoDB = async () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err))
}
