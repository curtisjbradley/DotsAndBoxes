import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {connectMongo} from "./connectMongo";
import {registerAuthRoutes} from "./routes/authRoutes";
import {CredentialsProvider} from "./providers/CredentialsProvider";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoClient = connectMongo()
const credentialsProvider = new CredentialsProvider(mongoClient);

registerAuthRoutes(app, credentialsProvider);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
