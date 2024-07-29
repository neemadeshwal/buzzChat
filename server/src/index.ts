import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { app, io, server } from "./socket/socket"


dotenv.config()

app.use(cors({ origin: "http://localhost:5174" }))
app.use(cookieParser());
app.use(bodyParser.json());

io.on("connection", (socket) => {
    console.log(socket)
})

server.listen(8181, () => {
    console.log(`Server is listening on port ${8181}....`)
})