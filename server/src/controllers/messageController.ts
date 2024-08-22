import { Request, Response } from "express";
import { prisma } from "../prisma";
import { io } from "../socket/socket";




export const createMessage = async (req: Request, res: Response) => {
    try {
        const message = await prisma.message.create({
            data: {
                ...req?.body?.messageBody,
                sender: { connect: { id: req?.body?.senderId } },
                conversation: { connect: { id: req?.body?.conversationId } }
            },
            include: {
                sender: {
                    include: {
                        user: {
                            select: { id: true, imageUrl: true, email: true, name: true }
                        }
                    }
                }
            }
        })
        io.to(req?.body?.conversationId).emit("newMessage", message)

        return res.status(201).json({ success: true, successMessage: "successfully created message", message })

    }
    catch (err) {
        console.log(err)

        return res.status(500).json({ error: true, message: err?.toString() })
    }
}

export const getMessage = async (req: Request, res: Response) => {

    try {

        const message = await prisma.message.findMany({
            where: { conversationId: req?.body?.conversationId },
            include: {
                sender: {
                    include: {
                        user: {
                            select: {
                                id: true, imageUrl: true, name: true, email: true
                            }
                        }
                    }
                }
            }
        })

        return res.status(200).json({
            success: true,
            successMessage: "successfully received all the messages",
            message
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: true, message: err?.toString() })
    }
}

export const deleteMessage = async (req: Request, res: Response) => {

    try {
        const message = await prisma.message.findFirst({
            where: { id: req?.body?.message?.id },
            include: {
                conversation: {
                    include: {
                        members: {
                            include: {
                                user: {
                                    select: { id: true }

                                }
                            }
                        }
                    }
                }
            }
        })
        const member = await prisma.member.findFirst({
            where: {
                id: message?.senderId
            }
        })

        if (member?.userId !== req?.user?.id) {
            return res.status(200).json({
                message: "You are not allowed to delete this message"
            })
        }
        console.log(req?.body)

        await prisma.message.delete({ where: { id: req?.body?.message?.id } })

        io.to(req?.body?.message?.conversationId).emit("deleteMessage", message?.id)

        return res.status(200).json({
            success: true,
            successMessage: "Successfully deleted the message",
            message
        })
    }
    catch (err) {
        console.log(err?.toString())
    }
}