import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model";


export const generateJwtToken = (res: Response, user: IUserDocument) => {
    try {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict'
        })

    } catch (err: any) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to generate JWT token",
        })
    }
}