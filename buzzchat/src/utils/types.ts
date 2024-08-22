


import React, { SetStateAction } from "react";
import { Socket } from "socket.io-client";
export interface SignupData {
    email: string;
    fullName: string;
    password: string;
    cPassword: string;
    showP: boolean;
    showCP: boolean;
    imageUrl: string;
}

export interface LoginData {
    email: string;
    password: string;
    showP: boolean;
}

export interface SettingsMenuProps {
    settingsAnchorEl: HTMLElement | null;
    setSettingsAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}
export interface User {
    id: string;
    email: string;
    name: string;
    imageUrl: string | null;
}
export type LoggedInUser = {
    isAuthenticated: boolean;
    user: User | null;
};
export type AuthContextType = {
    loggedInUser: LoggedInUser;
    setLoggedInUser: React.Dispatch<SetStateAction<LoggedInUser>>;
    showLoading: boolean;
    tabValue: number;
    handleTabChange: any
};
export interface SocketContextType {
    socket: Socket | null;
    // setSocket: React.Dispatch<SetStateAction<Socket | null>> | null;
}

export interface ConversationContextType {
    allMessages: Message[];
    messagesEndRef: React.RefObject<HTMLDivElement>;
    currentConversation: Conversation | null;
    setCurrentConversation: React.Dispatch<
        SetStateAction<Conversation | null>
    > | null;
    numberOfOnlineUsersInCurrentConversation: number;
    setNumberOfOnlineUsersInCurrentConversation: React.Dispatch<
        SetStateAction<number>
    >;
    handleGoToHome: () => void;
    newMessagesInConversations: Message[];
    setNewMessageInConversations: React.Dispatch<SetStateAction<Message[]>>;
    groupTitle: string;
    setGroupTitle: React.Dispatch<React.SetStateAction<string>>;
    conversations: Conversation[];
    allUsers: User[];
    addChatAnchorEl: HTMLElement | null;
    setAddChatAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    openCreateConversationModal: {
        isOpen: boolean;
        type: ConversationType;
    };
    setOpenCreateConversationModal: React.Dispatch<
        React.SetStateAction<{
            isOpen: boolean;
            type: ConversationType;
        }>
    >;
    selectedUserForConversation: User[];
    setSelectedUserForConversation: React.Dispatch<React.SetStateAction<User[]>>;
    handleCreateConversation: () => Promise<void>;
    handleSearchUserChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleDeleteConversation: () => Promise<void>;
    chatMenuAnchorEl: HTMLElement | null;
    setChatMenuAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    searchConversationValue: string;
    setSearchConversationValue: React.Dispatch<React.SetStateAction<string>>;

    handleResetNewMessagesInConversation: (cId: string) => void;
    searchUserValue: string;
}

export interface Message {
    id: string;
    body: string;
    conversationId: string;
    senderId: string;
    createdAt: string;
    updatedAt: string;
    sender: Sender;
    fileId?: string | null;
    fileUrl?: string | null;
}

export interface Sender {
    id: string;
    joinedAt: string;
    userId: string;
    conversationId: string;
    role: string;
    user: User;
}
// Generated by https://quicktype.io

export interface Conversation {
    id: string;
    isGroup: boolean;
    groupTitle: null;
    type: string;
    createdAt: string;
    updatedAt: string;
    members: Member[];
}

export interface Member {
    id: string;
    joinedAt: string;
    userId: string;
    conversationId: string;
    role: string;
    user: User;
}
export interface StartConversationModalProps {
    open: boolean;
    onClose: () => void;
    type: "DIRECT_MESSAGE" | "GROUP";
}
export interface ChatListDrawerProps {
    conversations: Conversation[];
    drawerWidth: number;
}
export interface CustomAppBarProps {
    drawerWidth: number;
}
export interface ConversationContainerProps {
    drawerWidth: number;
}
export interface SendMessageContainerProps {
    currentConversation: Conversation | null;
    loggedInUser: LoggedInUser;
}
export interface MessagesListProps {
    allMessages: Message[];
    loggedInUser: LoggedInUser;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}
export interface MessageCardProps {
    message: Message;
    passRef: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}
export interface ChatListItemProps {
    conversation: Conversation;
    currentConversation: Conversation | null;
    newMessagesInConversations: Message[];
    handleResetNewMessagesInConversation: (cId: string) => void;
}
export interface SearchChatListItemProps { }

export interface AddUserListItemProps {
    setSelectedUsers: React.Dispatch<SetStateAction<User[]>>;
    user: User;
    selectedUsers: User[];
    type: ConversationType;
}
// Generated by https://quicktype.io

export interface CreateConversationData {
    email: string;
    id: string;
    name: string;
    imageUrl: string | null;
}
export interface VersionInfo {
    id: string;
    name: string;
}

export interface File {
    fileId: string;
    name: string;
    size: number;
    versionInfo: VersionInfo;
    filePath: string;
    url: string;
    fileType: string;
    height: number;
    width: number;
    thumbnailUrl: string;
    AITags: null;
}
// Generated by https://quicktype.io

export interface EmojiData {
    id: string;
    name: string;
    native: string;
    unified: string;
    keywords: string[];
    shortcodes: string;
    emoticons: string[];
}
export interface MessageBody {
    fileId?: string | null;
    fileUrl?: string | null;
    body?: string | null;
}
export type ConversationType = "DIRECT_MESSAGE" | "GROUP";

export interface SettingsMenuProps {
    settingsAnchorEl: HTMLElement | null;
    setSettingsAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
export interface ImageKitContextType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ikUploadRef: any | null;
    uploadImageLoading: boolean;
    setUploadImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
    fileUrl: string | null;
    setFileUrl: React.Dispatch<React.SetStateAction<string | null>>;
    fileId: string | null;
    setFileId: React.Dispatch<React.SetStateAction<string | null>>;
}