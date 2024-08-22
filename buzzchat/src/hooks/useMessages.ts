import { useState } from "react";
import { useConversationalContext } from "../contexts/ConversationContext";
import { useAuthContext } from "../contexts/AuthContext";
import { deleteMessage, sendMessage } from "../api/messageApiHandler";
import { Member, Message } from "../utils/types";

export default function useMessages() {
    const [messageCardAnchorEl, setMessageCardAnchorEl] =
        useState<HTMLElement | null>(null);
    const { currentConversation } = useConversationalContext()!
    const { loggedInUser } = useAuthContext()
    const [openEmojiIconEl, setOpenEmojiIconEl] = useState<HTMLElement | null>(
        null
    );
    const [messageBody, setMessageBody] = useState<{
        body?: string;
        fileId?: string | null;
        fileUrl?: string | null
    }>({
        body: "",
        fileId: null,
        fileUrl: null
    })

    function handleReset() {
        setMessageBody({
            body: "",
            fileId: null,
            fileUrl: null
        })
    }
    async function handleDeleteMessage(message: Message) {
        await deleteMessage({ message })
        setMessageCardAnchorEl(null)
    }

    async function handleSendMessage() {
        const senderId = currentConversation?.members?.find((member: Member) => (
            member?.userId === loggedInUser?.user?.id
        ))?.id as string

        console.log("sener id ", senderId)

        await sendMessage({
            conversationId: currentConversation?.id as string,
            senderId,
            messageBody
        })
        handleReset()
    }


    return { messageBody, setMessageBody, handleSendMessage, openEmojiIconEl, setOpenEmojiIconEl, handleDeleteMessage, messageCardAnchorEl, setMessageCardAnchorEl }
}