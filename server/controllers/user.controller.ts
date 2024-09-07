import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailsender/email";
import { generateJwtToken } from "../utils/generateJwtToken";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import uploadImageOnCloudinary from "../utils/imageUpload";


export const signup = async (req: Request, res: Response) => {
    try {
        const { fullname, email, password, contact } = req.body;

        if (!fullname || !email || !password || !contact) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationCode();


        user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        generateJwtToken(res, user);

        await sendVerificationEmail(user.email, verificationToken);

        const userWithoutPassword = await User.findOne({ email }).select("-password");

        return res.status(201).json({
            message: "Otp sent successfully",
            user: userWithoutPassword
        })


    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password"
            });
        }

        user.lastLogin = new Date();
        await user.save();

        generateJwtToken(res, user);

        // send user without passowrd
        const userWithoutPassword = await User.findOne({ email }).select("-password");

        return res.status(200).json({
            message: `Welcome back ${user.fullname}`,
            user: userWithoutPassword
        });

    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}


export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { verificationCode } = req.body;



        const user = await User.findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: { $gt: Date.now() }
        }).select("-password");



        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired verification token"
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined
        await user.save();

        // send welcome email
        await sendWelcomeEmail(user.email, user.fullname);

        return res.status(200).json({
            message: "Email verified successfully.",
            user,
        })
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const logout = async (_: Request, res: Response) => {
    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged out successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};



export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
        }

        const resetToken = crypto.randomBytes(40).toString('hex');
        const resetTokenExpiresAt = new Date(Date.now() + 20 * 60 * 1000); // 20 min 

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

        await user.save();

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`);

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({ resetPasswordToken: token.toString(), resetPasswordTokenExpiresAt: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            });
        }
        //update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();

        // send success reset email
        await sendResetSuccessEmail(user.email);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}



export const checkAuth = async (req: Request, res: Response) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        };
        return res.status(200).json({
            user
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.id;

        const { fullname, email, address, city, country } = req.body;

        const file = req.file;


        let imageUrl: any;

        if (file) {
            imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        }

        console.log(imageUrl);

        const updatedData = { fullname, email, address, city, country, profilePicture: imageUrl };

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        return res.status(200).json({
            user,
            message: "Profile updated successfully"
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}