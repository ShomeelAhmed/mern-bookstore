import express, {response} from 'express';
import {PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routers/bookRouter.js";
import cors from "cors"

const app = express();

// Routes
app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET','PUT','POST','DELETE'],
        allowedHeaders: ['Content-Type']
    })
);



app.get('/', (req, res)=>{
    console.log(req)
    return res.status(234).send('Welcome to the team')
});

app.use('/books',bookRouter)




mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log('App is connected to the DB')
        app.listen(PORT, () =>{
            console.log(`App is listening to port: ${PORT}`)
        });
    })
    .catch((error)=>{
        console.log(error)
    })