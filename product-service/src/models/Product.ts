import { Schema, model } from "mongoose"

// Define the schema
const ProductSchema = new Schema({
  code: { type: String, required: true },
  type: { type: String, required: true },
})

// Create the model
const Product = model("Products", ProductSchema)

// Export the model
export default Product
