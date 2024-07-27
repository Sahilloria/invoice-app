import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./src/Routes/route.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())

app.use("/api/invoice-app",routes )
export default app;