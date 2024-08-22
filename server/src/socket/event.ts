import { Socket } from "socket.io";

import { joinRoom, leaveRoom } from "./room.js";

export const handleEvents = (socket: Socket) => {
    socket.on("joinConversation", (conversationId: string) => {

        joinRoom(socket, conversationId)
    })
    socket.on("leaveConversation", (conversationId: string) => {
        leaveRoom(socket, conversationId)
    })

    socket.on("connectedUser", (userId: string) => {
        joinRoom(socket, userId)
    })

    socket.on("disconnectedUser", (userId: string) => {
        leaveRoom(socket, userId)
    })
}