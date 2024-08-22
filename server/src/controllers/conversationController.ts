import { NextFunction, Request, Response } from "express"
import { prisma } from "../prisma";
import { io } from "../socket/socket";



export const createConversation = async (req: Request, res: Response) => {

    const type = req?.body?.type;
    const members = req?.body?.members;


    try {
        const conversation = await prisma.conversation.create({
            data: {
                type,
                members: {
                    create: members.map((member: any) => ({ userId: member.id }))
                },
                isGroup: req?.body?.isGroup,
                groupTitle: req?.body?.groupTitle
            },
            include: { members: { include: { user: true } } }
        })
        console.log(conversation?.members, "all members")
        conversation?.members?.forEach((member) => {
            io.to(member?.userId).emit("newConversation", conversation);
        });
        // conversation?.members?.forEach((member: any) => {
        //     io.to(member?.userId).emit("newConversation", conversation)
        // })
        return res.status(201).json({ success: true, message: "successfully created the conversation", data: conversation })

    }
    catch (err) {
        console.log(err)
        console.log(err?.toString())

        return res.status(500).json({ error: true, message: "internal server error" })

    }
}


export const getConversation = async (req: Request, res: Response) => {
    const userId = req?.user?.id;
    const searchVal = req?.body?.searchValue
    try {
        const conversation = await prisma.conversation.findMany({
            where: {
                AND: [{ members: { some: { userId } } }],
                OR: searchVal ? [
                    {
                        groupTitle: { contains: searchVal, mode: "insensitive" }
                    },
                    {
                        members: {
                            some: {
                                user: {
                                    email: {
                                        contains: searchVal, mode: "insensitive"
                                    }
                                }
                            }
                        }
                    },
                    {


                        members: {
                            some: {
                                user: {
                                    name: {
                                        contains: searchVal, mode: "insensitive"
                                    }
                                }
                            }
                        }
                    }

                ] : undefined
            },
            include: {
                members: { include: { user: true } }
            },
            orderBy: { createdAt: "desc" }
        })

        return res.status(200).json({ success: true, message: "successfully fetched the conversation", data: conversation })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: true, message: "Internal server error.Please try after some time." })
    }
}


export const deleteConversation = async (req: Request, res: Response) => {

    try {
        const member = await prisma.member.findFirst({
            where: { conversationId: req?.body?.conversationId, userId: req?.body?.userId }
        })
        if (!member) {
            res.status(403).json({ error: true, messsage: "You are not allowed to delete the conversation" })
        }
        else {
            const conversation = await prisma.conversation.delete({
                where: { id: req?.body?.conversationId },
                include: {
                    members: {
                        include: {
                            user: true
                        }
                    }
                }
            })
            // conversation?.members?.forEach((member: any) => {
            //     io.to(member?.userId).emit("deleteConversation", conversation?.id)
            // })
            return res.status(200).json({ success: true, message: "successfully deleted the conversation", conversation })
        }
    }
    catch (err) {
        console.log(err?.toString())
    }
}