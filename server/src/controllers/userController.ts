import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";



export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const search = req?.body?.search;

        const findAllUsers = await prisma.user.findMany({

            where: {
                id: { not: { equals: req?.user?.id } },
                OR: search ? [
                    {
                        email: { contains: search, mode: "insensitive" }
                    },
                    {
                        name: { contains: search, mode: "insensitive" }
                    }
                ] : undefined,
            },
            orderBy: {
                name: "asc",
            },
            select: {
                id: true,
                email: true,
                name: true,
                imageId: true,
                imageUrl: true
            }
        })

        return res.status(200).json({ success: true, message: "successfully fetch all the users", data: findAllUsers })
    }

    catch (err) {
        return res.status(500).json({ error: true, message: "internal server erro" })
    }
}