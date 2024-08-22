import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { app, io, server } from "./socket/socket";
import { CLIENT_URL, PORT } from "./constants";
import authRouter from "./routes/authRoute";
import authMiddleware from "./middleware/authMiddleware";
import userRoute from "./routes/userRoute";
import conversationRoute from "./routes/conversationRoute";
import messageRoute from "./routes/messageRoute";
import { handleEvents } from "./socket/event";

dotenv.config();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/auth", authRouter);

// Protected routes
app.use("/users", authMiddleware, userRoute);
app.use("/conversation", authMiddleware, conversationRoute);
app.use("/message", authMiddleware, messageRoute);

io.on("connection", (socket) => {
    handleEvents(socket);
});

app.get("/", (req, res) => {
    return res.status(200).json({ message: "server is working fine." });
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});





// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
// import cors from "cors";
// import { app, io, server } from "./socket/socket"
// import { CLIENT_URL, PORT } from "./constants";
// import authRouter from "./routes/authRoute"
// import authMiddleware from "./middleware/authMiddleware"
// import userRoute from "./routes/userRoute";
// import conversationRoute from "./routes/conversationRoute"
// import messageRoute from "./routes/messageRoute"
// import { handleEvents } from "./socket/event";

// dotenv.config()

// app.use(cors({ origin: CLIENT_URL, credentials: true }))
// app.use(cookieParser());
// app.use(bodyParser.json());

// app.use("/auth", authRouter);

// /// protected routes

// app.use("/users", authMiddleware, userRoute)

// app.use("/conversation", authMiddleware, conversationRoute)

// app.use("/message", authMiddleware, messageRoute)

// io.on("connection", (socket) => {
//     console.log(socket?.id, "a user connected")
//     handleEvents(socket)
// })

// app.get("/", (req, res) => {
//     return res.status(200).json({ message: "server is working fine." })
// })

// server.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}....`)
// })