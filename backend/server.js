import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
/* ENV VARIABLES */
import { APP_PORT, MONGO_DB_URI } from "./config/index.js";
/* IMPORT ALL ROUTES */
import {
  almirahRouter,
  authRouter,
  batchRouter,
  bookRouter,
  categoryRouter,
  clearanceRouter,
  departementRouter,
  eBookRouter,
  genralRouter,
  studentRouter,
  teacherRouter,
  transactionRouter,
} from "./routes/index.js";
import { errorHandlerMiddleware } from "./middlewares/index.js";
/* CONFIGURATION */
const app = express();
app.use(express.json({ limit: "5mb" }));

const corsOptions = {
  credentials: true,  // Allow credentials such as cookies, authorization headers, etc.
  origin: [
    'http://localhost:5173',
    'https://eceresourcehub.vercel.app',
    'https://resourcehubece.vercel.app/'
  ],
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* ABSOLUTE PATH OF BACKEND FOLDER */
const __filename = fileURLToPath(import.meta.url);
export const ROOT_PATH = path.dirname(__filename);

/* STATIC FOLDER */
app.use("/public", express.static("./public"));
app.use("/uploads", express.static("./uploads"));
app.use("/documents", express.static("./documents"));

/* MONGOOSE SETUP */
const connectToDatabase = async () => {
  try {
    // If MONGO_DB_URI is not defined, fallback to a local MongoDB URI
    const dbURI = MONGO_DB_URI || "mongodb://localhost:27017/yourdbname";

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MONGO DB CONNECTED SUCCESSFULLY 😍😍");

    // CREATE SERVER
    app.listen(APP_PORT, () => {
      console.log(`SERVER IS LISTENING ON PORT ${APP_PORT}`);
    });
  } catch (err) {
    console.log("SOMETHING WENT WRONG WHILE CONNECTING TO MONGO DB 😢😢");
    console.log("====================================");
    console.log(err);
    console.log("====================================");
  }
};

// Call the function to connect to the database
connectToDatabase();

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

/* ROUTES */
app.use("/api/auth", authRouter);
app.use("/api/batches", batchRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/departements", departementRouter);
app.use("/api/students", studentRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/almirahs", almirahRouter);
app.use("/api/books", bookRouter);
app.use("/api/ebooks", eBookRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/genral", genralRouter);
app.use("/api/clearance", clearanceRouter);

/* ERROR HANDLER MIDDLEWARE */
app.use(errorHandlerMiddleware);
