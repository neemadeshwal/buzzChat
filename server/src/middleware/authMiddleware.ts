import { NextFunction, Request, Response } from "express";
import { CLIENT_AUTH_URL, JWT_SECRET_KEY } from "../constants";
import jwt from "jsonwebtoken";


export default function authMiddleware(
    req: any,
    res: Response,
    next: NextFunction
) {

    const token = req?.cookies?.token ?? null;

    if (!token) {
         res.status(400).json({ error: true, message: "no token present." }).redirect(CLIENT_AUTH_URL as string);


    }

    try {

        const verifiedToken = jwt.verify(token, JWT_SECRET_KEY)

        if (!verifiedToken) {

             res.status(403).json({ error: true, message: "no token/expired token" }).redirect(CLIENT_AUTH_URL as string)
        }

        req.user = verifiedToken
        next()

    }
    catch (error) {
        console.log(error)

        res.status(500).json({ error: true, message: "internal server error.Please try again." }).redirect(CLIENT_AUTH_URL as string)
        next(error)
    }

}