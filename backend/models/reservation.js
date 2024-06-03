import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must be of at least 3 Characters."],
    maxLength: [30, "First name cannot exceed 30 Characters."],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must be of at least 3 Characters."],
    maxLength: [30, "Last name cannot exceed 30 Characters."],
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone number must contain 11 Digits."],
    maxLength: [11, "Phone number must contain 11 Digits."],
  },
  dishes: [
    {
      name: {
        type: String,
        required: [true, "Dish name is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        validate: {
          validator: Number.isInteger,
          message: "Quantity must be an integer"
        }
      }
    }
  ],
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
