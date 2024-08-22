import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants";



export default async function generateToken(user: Prisma.UserCreateInput) {

    const token = await jwt.sign(
        {
            email: user?.email,
            id: user?.id,
            name: user?.name,
            imgUrl: user?.imageUrl
        }, JWT_SECRET_KEY, { expiresIn: '7d' }
    )
    console.log(token)
    return token;

}

