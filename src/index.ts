import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import dotenv from 'dotenv';
import { signup } from "./controller/signUp";

dotenv.config();

const app = express();
app.use(express.json());


//endepoints
app.post('/signup', signup)


app.get("/teste", async (req: Request, res: Response) => {

    try {
        res.status(200).send("Oi, seu server está funcionando!");
    } catch (error) {

        res.status(400).send("ERRO");

    }
});


const server = app.listen(3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
