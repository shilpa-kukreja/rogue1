import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';


//Register a New User



export const registerUser=async(req,res)=>{
    const {email,password,mobile}=req.body;
    try {
        const existingUser=await userModel.findOne({email})
        if (existingUser) {
            return res.status(400).json({message:"User already exists"})
        }

        const hashedPassword =await bcrypt.hash(password,10)
        const newUser=new userModel({
              email,
              password:hashedPassword,
              mobile
        })
        await newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
           expiresIn:'1d'
        })
        res.status(201).json({token,user:newUser})
    } catch (error) {
         console.log(error)
         res.status(500).json({message:'Something went wrong'})
    }
}


//Login User

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid Creadentials"})
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      res.status(200).json({token,user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something Went Wrong"})
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested a password reset. Please click the link to reset your password: \n\n ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message,
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong ' + error});
  }
};

  // Reset Password
  export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const user = await userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };


  export const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token=jwt.sign(email+password,process.env.JWT_SECRET)
  
        return res.status(200).json({ success: true, token });
      } else {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Admin Login Error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  const allUsers=async(req,res)=>{
    try {
      const Users=await userModel.find({}).select('-password')
      res.json({success:true,Users})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
    }
  }
  
  
  const deleteUser = async (req, res) => {
    try {
      const User = await userModel.findByIdAndDelete(req.params.id);
      if (!User) return res.status(404).json({ message: "partner not found" });
      res.json({ message: "partner deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


export {allUsers,deleteUser}
  
  