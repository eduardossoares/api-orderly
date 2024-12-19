import express, { json, Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors";

import path from "path";

const app = express();
const port = 3333;

app.use(json());
app.use(cors());
app.use(router);

app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp"))
)

app.use((error: Error, req: Request, res: Response, nextFunction: NextFunction) => {
    if(error instanceof Error) {
        res.status(400).json({
            error: error.message,
        });
        return;
    }

    res.status(500).json({
        status: "error",
        message: "internal server error",
    });
    return;
});

app.listen(port, () => {
    console.log("api is running on http://localhost:3333");
})