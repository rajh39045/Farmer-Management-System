import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes from "./routes/index.js";
import errorHandler from "./middlewares/error.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🌾 Krishi Market API Running...",
  });
});

app.use("/api/v1", routes);

// 404 Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;