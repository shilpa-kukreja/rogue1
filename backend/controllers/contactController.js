import nodemailer from 'nodemailer';
import contactModel from '../models/contactModel.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });




  const contact= async (req, res) => {
    const { name, email, message } = req.body;
  
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, 
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
  };


  const addContact=async(req,res)=>{
    try {
        const contact=new contactModel(req.body);
        await contact.save();
        res.status(201).json({success:true,message:"From Data Saved Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Failed to save Data"});
    }
}


const listContact=async(req,res)=>{
    try {
        const contacts=await contactModel.find({}).sort({submittedAt:-1});
        res.status(200).json(contacts)
    } catch (error) {
         console.log(error)
         res.status(500).json({success:false,message:"Failed to fetch data"})
    }
}



const removeContact=async(req,res)=>{
    try {
        await contactModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Contact Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {contact,addContact,listContact,removeContact};