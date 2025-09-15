import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

export const register = async (req, res) => {
  try {
    console.log("Register Request Body:", req.body);
    console.log("Register Request Files:", req.files);
    const { fullname, email, password, phoneNumber, role } = req.body;
    console.log("Extracted fields:", {
      fullname,
      email,
      password: password ? "provided" : "missing",
      phoneNumber,
      role,
    });

    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }

    //convert password to hash
    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePhotoUrl = "";
    if (req.files && req.files.profilePhoto && req.files.profilePhoto.length > 0) {
      try {
        const fileUri = getDataUri(req.files.profilePhoto[0]);
        const cloudinaryResponse = await cloudinary.uploader.upload(
          fileUri.content
        );
        console.log("Cloudinary Response:", cloudinaryResponse);
        profilePhotoUrl = cloudinaryResponse.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload failed:", cloudinaryError);
        // Continue without profile photo if upload fails
        // profilePhotoUrl = "";
      }
    }

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    await newUser.save();

    return res
      .status(201)
      .json({
        message: `Account created successfully ${fullname}`,
        success: true,
      });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      // Duplicate key (email or phoneNumber)
      return res.status(400).json({
        message: `Duplicate value for: ${Object.keys(error.keyValue).join(
          ", "
        )}`,
        success: false,
      });
    }
    res
      .status(500)
      .json({ message: "Server Error registering user", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Incorrect email or password", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    if (role !== user.role) {
      return res
        .status(401)
        .json({
          message: "You dont have the necessary role to access this resource",
          success: false,
        });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({ message: `Welcome back ${user.fullname}!`, user, token, success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server Error login failed", success: false });
  }
};

export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error logout", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("Update Profile Request Body:", req.body);
    console.log("Update Profile Request Files:", req.files);
    console.log("Update Profile Request ID:", req.id);

    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const files = req.files;
    console.log("Update Profile Request:", {
      fullname,
      email,
      phoneNumber,
      bio,
      skills,
      files: files ? Object.keys(files) : "No files",
    });

    //cloudinary upload for resume, profilePhoto, and phoneNumberFile
    let resumeCloudinaryResponse = null;
    let profilePhotoCloudinaryResponse = null;
    let phoneNumberFileCloudinaryResponse = null;

    if (files && files.resume && files.resume.length > 0) {
      const resumeFile = files.resume[0];
      const fileUri = getDataUri(resumeFile);
      resumeCloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    if (files && files.profilePhoto && files.profilePhoto.length > 0) {
      const profilePhotoFile = files.profilePhoto[0];
      const fileUri = getDataUri(profilePhotoFile);
      profilePhotoCloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    if (files && files.phoneNumberFile && files.phoneNumberFile.length > 0) {
      const phoneNumberFile = files.phoneNumberFile[0];
      const fileUri = getDataUri(phoneNumberFile);
      phoneNumberFileCloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // Adjust according to your auth middleware
    console.log("User ID from req.id:", userId);
    let user = await User.findById(userId);
    console.log("User found:", user ? "Yes" : "No");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    //update database profile
    console.log("Updating user fields...");
    if (fullname) {
      user.fullname = fullname;
    }
    if (email) {
      user.email = email;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skills) {
      user.profile.skills = skillsArray;
    }
    if (resumeCloudinaryResponse) {
      console.log("Resume uploaded");
      user.profile.resume = resumeCloudinaryResponse.secure_url;
      user.profile.resumeOriginalName = files.resume[0].originalname;
    } else {
      console.log("No new resume uploaded, keeping existing resume");
    }
    if (profilePhotoCloudinaryResponse) {
      console.log("Profile photo uploaded");
      user.profile.profilePhoto = profilePhotoCloudinaryResponse.secure_url;
    } else {
      console.log("No new profile photo uploaded, keeping existing photo");
    }
    if (phoneNumberFileCloudinaryResponse) {
      console.log("Phone number file uploaded");
      user.profile.phoneNumberFile = phoneNumberFileCloudinaryResponse.secure_url;
      user.profile.phoneNumberFileOriginalName = files.phoneNumberFile[0].originalname;
    } else {
      console.log("No new phone number file uploaded, keeping existing file");
    }

    console.log("Saving user...");
    await user.save();
    console.log("User saved successfully");

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    console.log("Returning response...");
    return res
      .status(200)
      .json({
        message: `Profile updated successfully ${user.fullname}`,
        success: true,
        user,
      });
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    res
      .status(500)
      .json({ message: "Server Error updating profile", success: false, error: error.message, stack: error.stack });
  }
};
