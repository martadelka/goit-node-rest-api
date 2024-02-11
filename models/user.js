import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../middlewares/handleMongooseError.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be longer than 6 symbols",
    "any.required": "Password must be longer than 6 symbols",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid address",
    "any.required": "Email is required",
  }),
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    "any.only": "Subscription has only 3 values: starter, pro, business",
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": "Enter password",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Enter email",
  }),
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    "any.only": "Subscription has only 3 values: starter, pro, business",
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "Subscription is required",
      "any.only": "Subscription has only 3 values: starter, pro, business",
    }),
});

const verificationEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid address",
    "any.required": "Missing required email field",
  }),
});

export const User = model("user", userSchema);
export const authSchemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  verificationEmailSchema,
};