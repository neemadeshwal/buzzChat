import { Request, Response } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import jwt, { JwtPayload } from "jsonwebtoken"
import { CLIENT_AUTH_URL, JWT_SECRET_KEY } from "../constants";


interface decodedTokenType {
    email: string;
    id: string;
    name: string;
    imageUrl?: string;
}

const signUp = async (req: Request, res: Response) => {

    const { email, password, name, imageUrl = null } = req?.body;

    if (!email || !name || !password) {
        return res.status(400).json({ msg: "please provide credentials" })
    }

    try {
        const existingUser = await prisma.user.findFirst({ where: { email: email } });

        if (existingUser) {
            return res.status(409).json({ success: false, message: "user already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        })
        console.log(newUser)
        res.cookie("token", await generateToken(newUser), {
            httpOnly: false
        });
        return res.status(201).json({ success: true, message: "successfuly created an account", userData: { email: newUser?.email, name: newUser?.name, id: newUser?.id, imageUrl: newUser?.imageUrl } })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error?.toString() })
    }


}


const login = async (req: Request, res: Response) => {
    const { email, password } = req?.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "please provide required credentials" })
    }
    try {


        const existingUser = await prisma.user.findFirst({ where: { email: email } });

        if (!existingUser) {
            return res.status(401).json({ error: true, message: "User doesnt exist." })
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: true, message: "Password is incorrect.Please try again" })
        }

        res.cookie("token", await generateToken(existingUser), {
            httpOnly: false
        })

        return res.status(200).json({
            success: true, message: "successfully logged in", user: {
                email: existingUser?.email,
                name: existingUser?.name,
                id: existingUser?.id,
                imageUrl: existingUser?.imageUrl
            }
        })




    }
    catch (err) {

        console.log(err)
        return res.status(500).json({ error: true, message: err?.toString() })

    }
}



const verifyUser = async (req: Request, res: Response) => {
    const token = req?.cookies?.token

    if (!token) {
        return res.redirect(CLIENT_AUTH_URL as string)

    }
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload

    if (!decodedToken) {
        return res.redirect(CLIENT_AUTH_URL as string)
    }

    try {
        const existingUser = await prisma.user.findFirst({ where: { email: decodedToken?.email } })

        if (!existingUser) {
            res.redirect(CLIENT_AUTH_URL as string)
        }

        return res.json({
            isAuthenticated: true,
            user: {
                email: existingUser?.email,
                id: existingUser?.id,
                name: existingUser?.name,
                imageUrl: existingUser?.imageUrl
            }
        })
    }
    catch (err) {
        console.log("why this error")
        console.log(err)
        res.redirect(CLIENT_AUTH_URL as string)
    }
}



export { signUp, login, verifyUser };