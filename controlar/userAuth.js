const User = require("../models/userModel");
const SeminerBookModel=require("../models/SeminerBookModel")
const { hashPassword, comparePassword } = require("../helper/auth")
const jwt = require("jsonwebtoken")
const StudentDetails = require("../models/StudentDetailModel")
const mongoose = require('mongoose');
const cloudinary = require("cloudinary")
cloudinary.config({
  cloud_name: "arefintalukder5",
  api_key: "622592679337996",
  api_secret: "lQqwTTsKLLgm0F3_yasknj-jefg",
});
exports.register = async (req, res) => {
  //  console.log("REGISTER ENDPOINT => ", req.body);
  const { name, password, phone } = req.body;
  // validation
  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
  if (!password || password.length < 6) {
    return res.json({
      error: "Password is required and should be 6 characters long",
    });
  }

  const exist = await User.findOne({ phone });
  if (exist) {
    return res.json({
      error: "phone is taken",
    });
  }
  // id
  const randomInteger = Math.floor(Math.random() * 10);
  // console.log(randomInteger);
  // hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    password: hashedPassword,
    phone: phone,
  });
  try {
    await user.save();
    // console.log("REGISTERED USE => ", user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error. Try again.");
  }
};
exports.BookSeminer= async(req, res) => {
  const { name, email, phone } = req.body;
  
  // const exist = await User.findOne({ email });
  // if (exist) {
  //   return res.json({
  //     error: "email is taken",
  //   });
  // }
 
  const user = new SeminerBookModel({
    name,
    phone,
    email 
  });
  try {
    await user.save();
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error. Try again.");
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      return res.json({
        error: "no user found",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};


exports.currentUser = async (req, res) => {
  // console.log("test ")
  try {
    const user = await User.findById(req.user._id);
    // res.json(user);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};


exports.createStudentdetails = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      fName,
      lname,
      address,
      classOf,
      branch,
      studentId,
      action,
    } = req.body;

    const user_id = req.params.id;
    const user = await User.findById(user_id).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'User not found' });
    }
    const studentDetails = new StudentDetails({
      postedBy: user_id,
      fName,
      lName,
      address,
      classOf,
      branch,
      studentId,
      action,
    });

    // Save the student details
    await studentDetails.save({ session });

    // Optionally, update the user's details
    user.Fname = fName;
    user.Lname = lname;
    user.address = address;
    user.classOf = classOf;
    user.branch = branch;
    user.studentId = studentId;
    user.action = action;

    // Update the userDetails field in the User model
    user.userDetails.push(studentDetails._id);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'Student details created successfully' });
  } catch (error) {
    console.error('Error creating student details:', error);

    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET route to fetch all student details
exports.getAllStudents = async (req, res) => {
  try {
    const allUser = await User.find()

    res.json({ allUser });
  } catch (error) {
    console.error('Error fetching all users with student details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.upDateProfile = async (req, res) => {
  const userId = req.params.id;
const rool=210
  try {
    const user = await User.findById(userId); // Fix: Remove the curly braces around userId

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user information
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.father = req.body.father;
    user.mother = req.body.mother;
    user.paddress = req.body.paddress;
    user.parent = req.body.permanent;
    user.education = req.body.education;
    user.image = req.body.image;
   user.classrool=rool+1 
    // Save the updated user document
    await user.save();

    // Exclude the password from the response
    user.password = undefined;

    // Send a response indicating success
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getBranchA = async (req, res) => {
  try {
    const gustUsers = await User.find({ branch: 'A' });

    // Do something with gustUsers, for example, send them in the response
    res.json(gustUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getBranchB = async (req, res) => {
  try {
    const gustUsers = await User.find({ branch: 'B' });

    // Do something with gustUsers, for example, send them in the response
    res.json(gustUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
exports.allFree = async (req, res) => {
  try {
    const gustUsers = await User.find({ role: 'gust' });

    // Do something with gustUsers, for example, send them in the response
    res.json(gustUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
// user role change by admin
exports.AllStudent=async (req, res) => {
  try {
    const gustUsers = await User.find({ role: 'student' });

    // Do something with gustUsers, for example, send them in the response
    res.json(gustUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
exports.userRole = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    // console.log(req.body); // Check the entire request body

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user information
    if (req.body.role) {
      user.role = req.body.role;
    }

    if (req.body.branch) {
      user.branch = req.body.branch;
    }

    // Save the updated user document
    await user.save();

    // Exclude the password from the response
    user.password = undefined;

    // Send a response indicating success
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// exports.userRole = async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const user = await User.findById(userId);
// console.log(req.body)
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Update user information
//     user.role = req.body.role; // Make sure to send the updated value from React
    
//     // Save the updated user document
//     // await user.save();

//     // Exclude the password from the response
//     user.password = undefined;

//     // Send a response indicating success
//     res.json({ message: 'Profile updated successfully', user });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
exports.uploadImage = async (req, res) => {
  // console.log("req files => ",req.files);
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    // console.log("uploaded image url => ", result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.BookSeminerGet=async(req,res)=>{
  try{
      // Find all blogs with status 'draft'
      const pendingSeminer = await SeminerBookModel.find()
      
  res.status(200).json({ pendingSeminer });
  }
  catch(err){
    console.log("error")
  }
}