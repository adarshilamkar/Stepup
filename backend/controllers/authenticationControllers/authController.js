import userModel from "../../models/userModel.js";
import { hashPassword, comparePassword } from "../../helpers/authHelper.js";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import sendMail from "../../middlewares/sendMail.js";

dotenv.config();

const otpStore = {};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, otp } = req.body;
    console.log("Received registration request:", req.body);

    // Validations
    if (!name || !email || !password || !phone || !address) {
      console.log("Validation failed: Missing fields");
      return res.status(400).send({
        message: "Please enter all credentials",
        success: false,
      });
    }

    // Checking existing user
    const user = await userModel.findOne({ email });
    if (user) {
      console.log("User already registered:", email);
      return res.status(200).send({
        success: false,
        message: "User already registered",
      });
    }

    // Generate and store OTP if not provided
    if (!otp) {
      const OTP = generateOTP();
      otpStore[email] = {
        otp: OTP,
        expiry: Date.now() + 2 * 60 * 1000, // OTP valid for 2 minutes
      };

      const data = { name, OTP };
      console.log("Sending OTP to email:", email);
      await sendMail(email, "Stepup Shoes - OTP Verification", data);

      return res.status(200).send({
        success: true,
        message: "Please verify your email with the OTP sent",
      });
    }

    // Validate OTP
    const storedOtpData = otpStore[email];
    if (!storedOtpData || storedOtpData.expiry < Date.now()) {
      console.log("OTP expired or invalid for email:", email);
      return res.status(403).send({
        success: false,
        message: "OTP expired or invalid",
      });
    }

    // Compare provided OTP with stored OTP
    if (otp !== storedOtpData.otp) {
      console.log("Invalid OTP for email:", email);
      return res.status(403).send({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hashing password
    const passwordHash = await hashPassword(password);
    console.log("Password hashed successfully");

    // Registering user
    const newUser = new userModel({
      name,
      email,
      phone,
      address,
      password: passwordHash,
    });
    await newUser.save();

    // Clean up OTP store
    delete otpStore[email];

    console.log("User registered successfully:", email);
    return res.status(201).send({
      success: true,
      message: "Email Verified Successfully",
      newUser,
    });
  } catch (error) {
    console.error("Error in Registration:", error);
    res.status(500).json({
      message: "Error in Registration",
      success: false,
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validations
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Enter valid email and password",
      });
    }

    // Checking if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User with given email does not exist",
      });
    }

    // Checking if password is valid
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generating token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "Logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        _id: user._id,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error in Login:", error);
    return res.status(500).send({
      success: false,
      message: "Error in Login",
    });
  }
};

const protectedroute = async (req, res) => {
  return res.status(200).json({
    message: "Hello admin welcome to protected routes",
  });
};

export { registerController, loginController, protectedroute };
