import { SERVER_ENDPOINTS } from "../utils/contants"
import { Message } from "../utils/types";
import authFetchHandler from "./authFetchHandler"



export const sendMessage = async ({ conversationId, messageBody, senderId }: {
    conversationId: string;
    messageBody: {
        body?: string | null;
        fileId?: string | null;
        fileUrl?: string | null
    };
    senderId: string;
}) => {

    const response = await authFetchHandler({
        endpoint: SERVER_ENDPOINTS.MESSAGE.CREATE,
        method: "POST",
        data: {
            conversationId,
            messageBody,
            senderId
        }
    })

    return response?.data
}

export const getMessage = async (
    conversationId: string
) => {

    const response = await authFetchHandler({
        endpoint: SERVER_ENDPOINTS.MESSAGE.GET,
        method: "POST",
        data: { conversationId }
    })
    return response?.data
}

export const deleteMessage = async (
    { message }: { message: Message }
) => {
    const response = await authFetchHandler({
        endpoint: SERVER_ENDPOINTS.MESSAGE.DELETE,
        method: "DELETE",
        data: { message }
    })

    return response?.data
}