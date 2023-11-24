import ServerlessHttp from "serverless-http";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import checkAuth from "./middlewares/checkAuth.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/todos', checkAuth, todoRoutes);
export const handler = ServerlessHttp(app);

