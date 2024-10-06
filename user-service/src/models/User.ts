import { Schema, model } from "mongoose"

// Define the schema
const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
})

// Create the model
const User = model("User", userSchema)

// Export the model
export default User
