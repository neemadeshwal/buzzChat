import express from "express";
import { createConversation, deleteConversation, getConversation } from "../controllers/conversationController";

const conversationRoute = express.Router();

conversationRoute.post("/", getConversation)
conversationRoute.post("/create", createConversation)
conversationRoute.delete("/delete", deleteConversation)


export default conversationRoute