
import express from "express"
import { createMessage, deleteMessage, getMessage } from "../controllers/messageController"


const app = express.Router()


app.post("/create", createMessage)
app.post("/", getMessage)
app.delete("/delete", deleteMessage)


export default app;