import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {connectMongo} from "./connectMongo";
import {registerAuthRoutes} from "./routes/authRoutes";
import {CredentialsProvider} from "./providers/CredentialsProvider";
import {GameProvider} from "./providers/GameProvider";
import {registerGameRoutes} from "./routes/gameRoutes";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(STATIC_DIR));


const mongoClient = connectMongo()
const credentialsProvider = new CredentialsProvider(mongoClient);
const gameProvider = new GameProvider(mongoClient);


registerAuthRoutes(app, credentialsProvider);
registerGameRoutes(app, gameProvider);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


app.get("*", (req: Request, res: Response) => {
    res.sendFile("index.html", {root: STATIC_DIR});
});