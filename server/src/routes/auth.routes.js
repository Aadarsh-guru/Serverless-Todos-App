import { Router } from "express";
import bcrypt from 'bcryptjs';
import Jwt from "jsonwebtoken";
import prisma from "../config/dbConfig.js";
const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists.",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });
        return res.status(201).json({
            message: "User registered successfully.",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "error while registering the user.",
            success: false,
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password.",
                success: false
            });
        }
        const token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({
            message: "User logged in successfully.",
            success: true,
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "error while logging in the user.",
            success: false,
            error: error.message
        });
    }
});


export default router;